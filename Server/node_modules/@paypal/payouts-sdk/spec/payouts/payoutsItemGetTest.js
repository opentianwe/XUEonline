'use strict';

require('../spec_helper');
const chai = require('chai');
const client = require('../testHarness').client();
const PayoutsItemGetRequest = paypal.payouts.PayoutsItemGetRequest
const getPayout = require('./payoutsGetTest.js').GetPayouts;


describe('PayoutsItemGetRequest', function () {
  it('retrieve a single payment/payout-item from a Payouts Batch', function () {
    return getPayout()
      .then((getResponse) => {
        chai.assert.equal(getResponse.statusCode, 200);
        chai.assert.isNotNull(getResponse.result);

        let payoutItemId = getResponse.result.items[0].payout_item_id;
        let getItemRequest = new PayoutsItemGetRequest(payoutItemId);

        client.execute(getItemRequest)
          .then((getItemResponse) => {
            chai.assert.equal(getItemResponse.statusCode, 200);
            chai.assert.isNotNull(getItemResponse.result);

            let responseBody = getItemResponse.result;
            chai.assert.isNotNull(responseBody.payout_item_id);
            chai.assert.isNotNull(responseBody.transaction_status);
            chai.assert.equal("1.00", responseBody.payout_item.amount.value);
            chai.assert.equal("USD", responseBody.payout_item.amount.currency);
            chai.assert.equal("Test_txn_1", responseBody.payout_item.sender_item_id);
            chai.assert.equal("payout-sdk-1@paypal.com", responseBody.payout_item.receiver);

            console.log(JSON.stringify(responseBody, null, 4));
          })
      });
  });
});
