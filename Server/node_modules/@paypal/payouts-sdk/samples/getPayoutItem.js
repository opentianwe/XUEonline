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
 * This dependency is used to retrieve a Payout.
 */
const getPayout = require('./getPayout').getPayout;

/**
 * Retrieves a Payout Item details(GET - /v1/payments/payouts-items/<item-id>)
 * @param {string} itemId - the item id to retrieve 
 * @param {boolean} debug - prints debug logs with details on response
 */
async function getPayoutItem(itemId, debug = false) {
    try {
        const request = new payoutsSdk.payouts.PayoutsItemGetRequest(itemId);

        const response = await payPalClient.client().execute(request);
        if (debug) {
            console.log("Status Code: " + response.statusCode);
            console.log("Status: " + response.result.status);
            console.log("Payout Item ID: " + response.result.payout_item_id);
            console.log("Payout Item Status: " + response.result.transaction_status);
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
 * This is the driver function which invokes the getPayoutItem function to retrieve
 * a Payout Item.
 */
if (require.main === module) {
    (async () => {
        let createResponse = await createPayout();
        let getResponse = await getPayout(createResponse.result.batch_header.payout_batch_id, true);
        await getPayoutItem(getResponse.result.items[0].payout_item_id);
    })();
}

/**
 * Exports the Get Payout Item function. If needed this can be invoked from the
 * order modules to execute the end to flow like create payout, retrieve payout, retrieve payout item
 * and cancel payout item(Optional)
 */
module.exports = { getPayoutItem: getPayoutItem };