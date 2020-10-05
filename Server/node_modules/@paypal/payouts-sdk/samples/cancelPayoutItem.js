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
 * Cancels a Payout Item details(POST - /v1/payments/payouts-items/<item-id>/cancel)
 * Only items in status UNCLAIMED can be cancelled to return the funds back to the sender
 * Note: Batch should be in status SUCCESS indicating all payouts items are processed. Use Webhooks to get realtime status updates
 * @param {string} itemId - the item id to retrieve 
 * @param {boolean} debug - prints debug logs with details on response
 */
async function cancelPayoutItem(itemId, debug = false) {
    try {
        const request = new payoutsSdk.payouts.PayoutsItemCancelRequest(itemId);

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
 * Exports the Cancel Payout Item function. If needed this can be invoked from the
 * order modules to execute the end to flow like create payout, retrieve payout, retrieve payout item
 * and cancel payout item(Optional)
 */
module.exports = { cancelPayoutItem: cancelPayoutItem };