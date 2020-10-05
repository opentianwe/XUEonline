# PayPal Payouts API SDK for NodeJS

![PayPal Developer](homepage.jpg)

__Welcome to PayPal NodeJS SDK__. This repository contains PayPal's NodeJS SDK and samples for [v1/payments/payouts](https://developer.paypal.com/docs/api/payments.payouts-batch/v1/) APIs.

This is a part of the next major PayPal SDK. It includes a simplified interface to only provide simple model objects and blueprints for HTTP calls. This repo currently contains functionality for PayPal Payouts APIs which includes [Payouts](https://developer.paypal.com/docs/api/payments.payouts-batch/v1/).

Please refer to the [PayPal Payouts Integration Guide](https://developer.paypal.com/docs/payouts/) for more information. Also refer to [Setup your SDK](https://developer.paypal.com/docs/payouts/reference/setup-sdk) for additional information about setting up the SDK's.

## Usage
### Binaries

It is not mandatory to fork this repository for using the PayPal SDK. You can refer [PayPal Payouts SDK](https://developer.paypal.com/docs/payouts/reference/setup-sdk/#install-the-sdk) for configuring and working with SDK without forking this code.

For contributing or referring the samples, You can fork/refer this repository. 

## Examples
### Creating a Payouts
This will create a Payout and print the batch_id for the Payout.
#### Code to Execute:
```javascript
const paypal = require('@paypal/payouts-sdk');
  
// Creating an environment
let clientId = "<<PAYPAL-CLIENT-ID>>";
let clientSecret = "<<PAYPAL-CLIENT-SECRET>>";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

let requestBody = {
    "sender_batch_header": {
      "recipient_type": "EMAIL",
      "email_message": "SDK payouts test txn",
      "note": "Enjoy your Payout!!",
      "sender_batch_id": "Test_sdk_1",
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

// Construct a request object and set desired parameters
// Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
let request = new paypal.payouts.PayoutsPostRequest();
request.requestBody(requestBody);

// Call API with your client and get a response for your call
let createPayouts  = async function(){
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
       console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
}
createPayouts();
```

## Retrieve a Payout Batch
Pass the batchId from the previous sample to retrieve Payouts batch details
### Code to Execute:
```javascript
let getPayouts =  async function(batchId) {
    request = new paypal.payouts.PayoutsGetRequest(batch);
    request.page(1);
    request.pageSize(10);
    request.totalRequired(true);
    // Call API with your client and get a response for your call
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Payouts Batch: ${JSON.stringify(response.result)}`);
}

getPayouts('REPLACE-WITH-BATCH-ID'); 
```

## Running tests

To run integration tests using your client id and secret, clone this repository and run the following command:
```sh
$ npm install
$ PAYPAL_CLIENT_ID=YOUR_SANDBOX_CLIENT_ID PAYPAL_CLIENT_SECRET=YOUR_SANDBOX_CLIENT_SECRET npm test
```

## Samples

You can start off by trying out [Payouts Samples](samples/runAll.js)

To run samples run the following command:
```sh
$ npm install
$ PAYPAL_CLIENT_ID=YOUR_SANDBOX_CLIENT_ID PAYPAL_CLIENT_SECRET=YOUR_SANDBOX_CLIENT_SECRET npm test
```

To try out different samples head to [this link](samples)

Note: Update the `payPalClient.js` with your sandbox  credentials or pass your client credentials as environment variable while executing the samples.

## Note

PayPalHttpClient used as part of this project returns Promises

You can read more about Promises here: https://www.promisejs.org/


## License
Code released under [SDK LICENSE](LICENSE)  