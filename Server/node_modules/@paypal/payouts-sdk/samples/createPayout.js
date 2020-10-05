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
 * Builds the request body for creating Payouts Batch with 5 Payout Items
 */
function buildRequestBody() {
  let senderBatchId = "Test_sdk_" + Math.random().toString(36).substring(7);
  return {
    "sender_batch_header": {
      "recipient_type": "EMAIL",
      "email_message": "SDK payouts test txn",
      "note": "Enjoy your Payout!!",
      "sender_batch_id": senderBatchId,
      "email_subject": "This is a test transaction from SDK"
    },
    "items": [{
      "note": "Your 5$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-1@paypal.com",
      "sender_item_id": "Test_txn_1"
    }, {
      "note": "Your 5$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-2@paypal.com",
      "sender_item_id": "Test_txn_2"
    }, {
      "note": "Your 5$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-3@paypal.com",
      "sender_item_id": "Test_txn_3"
    }, {
      "note": "Your 5$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-4@paypal.com",
      "sender_item_id": "Test_txn_4"
    }, {
      "note": "Your 5$ Payout!",
      "amount": {
        "currency": "USD",
        "value": "1.00"
      },
      "receiver": "payout-sdk-5@paypal.com",
      "sender_item_id": "Test_txn_5"
    }]
  }
}

/**
 * This function is used to create a Payouts Batch(POST - /v1/payments/payouts)
 * A maximum of 15000 payout items are supported in a single batch request
 * @param {boolean} debug - prints debug logs with details on response 
 */
async function createPayout(debug = false) {
  try {
    const request = new payoutsSdk.payouts.PayoutsPostRequest();
    request.requestBody(buildRequestBody());

    const response = await payPalClient.client().execute(request);
    if (debug) {
      console.log("Status Code: " + response.statusCode);
      console.log("Status: " + response.result.status);
      console.log("Payout Batch ID: " + response.result.batch_header.payout_batch_id);
      console.log("Payout Batch Status: " + response.result.batch_header.batch_status);
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
 * This is the driver function which invokes the createPayout function to create
 * a Payout Batch.
 */
if (require.main === module) {
  (async () => await createPayout(true))();
}

/**
 * Exports the Create Payout function. If needed this can be invoked from the
 * order modules to execute the end to flow like create payout, retrieve payout, retrieve payout item
 * and cancel payout item(Optional)
 */
module.exports = { createPayout: createPayout };