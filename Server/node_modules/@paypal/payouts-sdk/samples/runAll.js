const createPayout = require('./createPayout').createPayout;
const getPayout = require('./getPayout').getPayout;
const getPayoutItem = require('./getPayoutItem').getPayoutItem;
const cancelPayoutItem = require('./cancelPayoutItem').cancelPayoutItem;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    //Create Payout
    console.log("Creating Payout...");
    let createResponse = await createPayout(true);
    if (createResponse.statusCode === 201) {
        //Retrieve Payout Batch details
        let payoutId = createResponse.result.batch_header.payout_batch_id;
        console.log("Retrieving Payout details for id - " + payoutId);
        let getResponse = await getPayout(payoutId, true);
        if (getResponse.statusCode === 200) {
            //Retrieve Payout Item details
            let payoutItemId = getResponse.result.items[0].payout_item_id;
            console.log("Retrieving Payout Item details for id - " + payoutItemId);
            let getItemResponse = await getPayoutItem(payoutItemId, true);
            if (getItemResponse.statusCode === 200) {
                let i = 0;
                //Wail till Payout Batch status becomes SUCCESS to cancel an UNCLAIMED payout.
                //This is just for demonstration, defer using this while integration
                //Note: While integrating use Webhooks to get realtime Payouts Batch and Item status updates
                do {
                    let checkPayoutComplete = await getPayout(payoutId);
                    await sleep(2000);
                    if (checkPayoutComplete.result.batch_header.batch_status === "SUCCESS") {
                        //Cancel UNCLAIMED payout item
                        console.log("Cancelling unclaimed payout item for id - " + payoutItemId);
                        let cancelResponse = await cancelPayoutItem(payoutItemId);
                        if (getItemResponse.statusCode === 200) {
                            console.log("Unclaimed payout item cancelled successfully for id - " + payoutItemId);
                        } else {
                            console.error("Failed to cancel unclaimed payout item for id - " + payoutItemId);
                        }
                        break;
                    }
                    i++;
                } while (i < 5);
                if (i === 5) {
                    console.error("Batch hasn't processed successfully yet!!");
                }
            } else {
                console.error("Failed to retrieve payout item details for id - " + payoutItemId);
            }
        } else {
            console.error("Failed to retrieve payout details for id - " + payoutId);
        }

    } else {
        console.error("Failed to create payout");
    }

    process.exit();

})();