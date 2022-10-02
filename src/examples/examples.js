#!/usr/bin/env node
const HlrLookupClient = require('../lib/index');
// use require('node-hlr-client') in your production environment

/**
 * This file contains examples on how to interact with the HLR Lookup API.
 * All endpoints of the API are documented here: https://www.hlr-lookups.com/en/api-docs
 */

/**
 * Create an HLR Lookups API client
 * The constructor takes your API Key, API Secret and an optional log file location as parameters
 * Your API Key and Secret can be obtained here: https://www.hlr-lookups.com.com/en/api-settings
 */
const client = new HlrLookupClient(
    'YOUR-API-KEY',
    'YOUR-API-SECRET'
);

async function main() {

    /**
     Invoke a request to GET /auth-test (https://www.hlr-lookups.com/en/api-docs#get-auth-test) to see if everything worked
     */
    let response = await client.get('/auth-test');

    // The API returns an HTTP status code of 200 if the request was successfully processed. Let's have a look.
    console.log(response.status);
    console.log(response.data);

    /**
     * Submit an HLR Lookup via POST /hlr-lookup (https://www.hlr-lookups.com/en/api-docs#post-hlr-lookup)
     */
    response = await client.post('/hlr-lookup', {msisdn: '+905536939460'});

    // The API returns an HTTP status code of 200 if the request was successfully processed. Let's have a look.
    console.log('HLR Lookup Status Code', response.status);
    console.log('HLR Lookup Response Body', response.data);

    if (response.status !== 200) {
        console.log('Received non-OK status code from server.');
        return;
    }

    let data = response.data;
    // do something with the data

    /**
     * Submit an NT Lookup via POST /nt-lookup (https://www.hlr-lookups.com/en/api-docs#post-nt-lookup)
     */
    response = await client.post('/nt-lookup', {number: '+4989702626'});

    // The API returns an HTTP status code of 200 if the request was successfully processed. Let's have a look.
    console.log('NT Lookup Status Code', response.status);
    console.log('NT Lookup Response Body', response.data);

    if (response.status !== 200) {
        console.log('Received non-OK status code from server.');
        return;
    }

    data = response.data;
    // do something with the data

    /**
     * Submit an MNP Lookup via POST /mnp-lookup (https://www.hlr-lookups.com/en/api-docs#post-mnp-lookup)
     */
    response = await client.post('/mnp-lookup', {msisdn: '+14156226819'});

    // The API returns an HTTP status code of 200 if the request was successfully processed. Let's have a look.
    console.log('MNP Lookup Status Code', response.status);
    console.log('MNP Lookup Response Body', response.data);

    if (response.status !== 200) {
        console.log('Received non-OK status code from server.');
        return;
    }

    data = response.data;
    // do something with the data

}

main();











