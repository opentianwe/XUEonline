'use strict';

/**
 * PayPal Node JS SDK dependency
 */
const payoutsNodeJssdk = require('@paypal/payouts-sdk');

/**
 * Returns PayPal HTTP client instance with environment which has access
 * credentials context. This can be used invoke PayPal API's provided the
 * credentials have the access to do so.
 */
function client() {
    return new payoutsNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 * Setting up and Returns PayPal SDK environment with PayPal Access credentials.
 * For demo purpose, we are using SandboxEnvironment. In production this will be
 * LiveEnvironment.
 */
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID || '<<CLIENT-ID>>';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || '<<CLIENT-SECRET>>';

    if (process.env.NODE_ENV === 'production') {
        return new payoutsNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
    }

    return new payoutsNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

module.exports = { client: client};