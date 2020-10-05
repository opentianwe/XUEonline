'use strict';

require('../spec_helper');
const chai = require('chai');
const client = require('../testHarness').client();
const CreatePayoutsRequest = paypal.payouts.PayoutsPostRequest;

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

function createPayouts() {
  let request = new CreatePayoutsRequest();
  request.requestBody(buildRequestBody());
  return client.execute(request);
}

describe('CreatePayoutsReqeust', function () {
  it('creates a Payouts Batch', function () {
    return createPayouts()
      .then((createResponse) => {
        chai.assert.equal(createResponse.statusCode, 201);
        chai.assert.isNotNull(createResponse.result);

        let responseBody = createResponse.result;
        chai.assert.isNotNull(responseBody.batch_header.payout_batch_id);
        chai.assert.isNotNull(responseBody.batch_header.batch_status);
        chai.assert.equal("This is a test transaction from SDK", responseBody.batch_header.sender_batch_header.email_subject);
        chai.assert.equal("SDK payouts test txn", responseBody.batch_header.sender_batch_header.email_message);

        console.log(JSON.stringify(responseBody, null, 4));
      });
  });
});

module.exports = {
  CreatePayouts: createPayouts
};
