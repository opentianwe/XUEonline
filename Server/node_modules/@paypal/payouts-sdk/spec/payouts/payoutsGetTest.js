'use strict';

require('../spec_helper');
const chai = require('chai');
const client = require('../testHarness').client();
const PayoutsGetRequest = paypal.payouts.PayoutsGetRequest;
const createPayout = require('./payoutsPostTest.js').CreatePayouts;


function getPayouts() {
  return createPayout()
    .then((createPayoutResponse) => {
      chai.assert.equal(createPayoutResponse.statusCode, 201);
      let payoutBatchId = createPayoutResponse.result.batch_header.payout_batch_id;
      let getRequest = new PayoutsGetRequest(payoutBatchId);
      getRequest.page(1);
      getRequest.pageSize(10);
      getRequest.totalRequired(true);
      return client.execute(getRequest);
    });
}


describe('PayoutsGetRequest', function () {
  it('retrieve a payouts batch', function () {
    return getPayouts()
      .then((getResponse => {
        chai.assert.equal(getResponse.statusCode, 200);
        chai.assert.isNotNull(getResponse.result);

        let responseBody = getResponse.result;

        chai.assert.equal(5, responseBody.total_items);
        chai.assert.equal(1, responseBody.total_pages);
        chai.assert.isNotNull(responseBody.batch_header.payout_batch_id);
        chai.assert.isNotNull(responseBody.batch_header.batch_status);
        chai.assert.isNotNull(responseBody.batch_header.sender_batch_header.email_subject);
        chai.assert.equal("This is a test transaction from SDK", responseBody.batch_header.sender_batch_header.email_subject);
        chai.assert.equal("SDK payouts test txn", responseBody.batch_header.sender_batch_header.email_message);
        chai.assert.isNotNull(responseBody.items);
        chai.assert.equal(5, responseBody.items.length);
        let firstPayout = responseBody.items[0];
        chai.assert.isNotNull(firstPayout.payout_item_id);
        chai.assert.isNotNull(firstPayout.transaction_status);
        chai.assert.equal("1.00", firstPayout.payout_item.amount.value);
        chai.assert.equal("USD", firstPayout.payout_item.amount.currency);
        chai.assert.equal("Test_txn_1", firstPayout.payout_item.sender_item_id);
        chai.assert.equal("payout-sdk-1@paypal.com", firstPayout.payout_item.receiver);

        console.log(JSON.stringify(responseBody, null, 4));
      }));
  });
});


module.exports = {
  GetPayouts: getPayouts
};
