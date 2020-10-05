'use strict';

require('../spec_helper');
const chai = require('chai');
const client = require('../testHarness').client();
const PayoutsItemCancelRequest = paypal.payouts.PayoutsItemCancelRequest;
const getPayout = require('./payoutsGetTest.js').GetPayouts;

async function cancelPayout(payoutItemId) {
  let cancelItemRequest = new PayoutsItemCancelRequest(payoutItemId);
  //Wait till the payout batch processes all payments
  await sleep(20000);
  return client.execute(cancelItemRequest);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('PayoutsItemCancelRequest', function () {
  it('Cancels an indivdual payout-item', function (done) {
    getPayout()
      .then((getPayoutsResponse) => {
        chai.assert.equal(getPayoutsResponse.statusCode, 200);
        chai.assert.isNotNull(getPayoutsResponse.result);

        let responseBody = getPayoutsResponse.result;
        let payoutItemId = responseBody.items[0].payout_item_id;
        cancelPayout(payoutItemId)
          .then((cancelResponse) => {
            chai.assert.equal(cancelResponse.statusCode, 200);
            chai.assert.isNotNull(cancelResponse.result);

            let responseBody = cancelResponse.result;
            chai.assert.isNotNull(responseBody.payout_item_id);
            chai.assert.isNotNull(responseBody.transaction_id);
            chai.assert.isNotNull(responseBody.transaction_status);
            chai.assert.equal("RETURNED", responseBody.transaction_status);
            chai.assert.equal("1.00", responseBody.payout_item.amount.value);
            chai.assert.equal("USD", responseBody.payout_item.amount.currency);
            chai.assert.equal("Test_txn_1", responseBody.payout_item.sender_item_id);
            chai.assert.equal("payout-sdk-1@paypal.com", responseBody.payout_item.receiver);

            console.log(JSON.stringify(responseBody, null, 4));
            done();
          });
      });
  });
});
