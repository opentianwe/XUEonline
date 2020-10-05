'use strict';

/**
 * PayPal SDK dependency
 */
const payoutsSdk = require('@paypal/payouts-sdk');

/**
 * PayPal HTTP client dependency
 */
const payPalClient = require('./Common/payPalClient');

/**
 * This dependency is used to create a Payout.
 */
const createPayout = require('./createPayout').createPayout;

/**
 * Retrieves the details for a Payout Batch(GET - /v1/payments/payouts/<batch-id>)
 * This endpoint supports pagination and retrieves only 1000 items in a call. Use pagination links to retrieve all items.
 * Use totalRequired to get the total number of pates
 * @param {string} batchId - the batch id to retrieve
 * @param {boolean} debug - prints debug logs with details on response
 */
async function getPayout(batchId, debug = false) {
    try {
        const request = new payoutsSdk.payouts.PayoutsGetRequest(batchId);
        //Optional, By default pageSize is set to 1000, page is set to 1
        request.page(1);
        request.pageSize(10);
        request.totalRequired(true);

        const response = await payPalClient.client().execute(request);
        if (debug) {
            console.log("Status Code: " + response.statusCode);
            console.log("Status: " + response.result.status);
            console.log("Payout Batch ID: " + response.result.batch_header.payout_batch_id);
            console.log("Payout Batch Status: " + response.result.batch_header.batch_status);
            console.log("Items count: " + response.result.items.length);
            console.log("First item id: " + response.result.items[0].payout_item_id);
            console.log("Links: ");
            response.result.links.forEach((item, index) => {
                let rel = item.rel;
                let href = item.href;
                let method = item.method;
                let message = `\t${rel}: ${href}\tCall Type: ${method}`;
                console.log(message);
            });
            // To toggle print the whole body comment/uncomment the below line
            console.log(JSON.stringify(response.result, null, 4));
        }
        return response;
    }
    catch (e) {
        console.log(e)
    }
}

/**
 * This is the driver function which invokes the getPayout function to retrieve
 * an Payout Batch.
 */
if (require.main === module) {
    (async () => {
        let response = await createPayout();
        await getPayout(response.result.batch_header.payout_batch_id, true);
    })();
}

/**
 * Exports the Get Payout function. If needed this can be invoked from the
 * order modules to execute the end to flow like create payout, retrieve payout, retrieve payout item
 * and cancel payout item(Optional)
 */
module.exports = { getPayout: getPayout };