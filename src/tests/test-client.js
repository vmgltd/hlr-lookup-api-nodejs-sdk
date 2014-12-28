#!/usr/bin/env node

var HlrLookupClient = require("../lib/node-hlr-client");

var client = new HlrLookupClient(
    'username',
    'password'
);

/**
 * Submits a synchronous HLR Lookup request. The HLR is queried in real time and results presented in the response body.
 *
 * @param callback - callback function(response)
 * @param msisdn - An MSISDN in international format, e.g. +491788735000
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Callback example: {"success":true,"results":[{"id":"e1fdf26531e4","msisdncountrycode":"DE","msisdn":"+491788735000","statuscode":"HLRSTATUS_DELIVERED","hlrerrorcodeid":null,"subscriberstatus":"SUBSCRIBERSTATUS_CONNECTED","imsi":"262031300000000","mccmnc":"26203","mcc":"262","mnc":"03","msin":"1300000000","servingmsc":"140445","servinghlr":null,"originalnetworkname":"E-Plus","originalcountryname":"Germany","originalcountrycode":"DE","originalcountryprefix":"+49","originalnetworkprefix":"178","roamingnetworkname":"Fixed Line Operators and Other Networks","roamingcountryname":"United States","roamingcountrycode":"US","roamingcountryprefix":"+1","roamingnetworkprefix":"404455","portednetworkname":null,"portedcountryname":null,"portedcountrycode":null,"portedcountryprefix":null,"portednetworkprefix":null,"isvalid":"Yes","isroaming":"Yes","isported":"No","usercharge":"0.0100","inserttime":"2014-12-28 06:22:00.328844+08","storage":"SDK-TEST-SYNC-API","route":"IP1"}]}
 */
client.submitSyncLookupRequest(function(response) {
    console.log(response);
}, '+491788735000');

/**
 * Submits asynchronous HLR Lookups containing up to 1,000 MSISDNs per request. Results are sent back asynchronously to a callback URL on your server. Use \VmgLtd\HlrCallbackHandler to capture them.
 *
 * @param callback - callback function(response)
 * @param msisdns - A list of MSISDNs in international format, e.g. +491788735000
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Callback example: {"success":true,"messages":[],"results":{"acceptedMsisdns":[{"id":"e489a092eba7","msisdn":"+491788735000"},{"id":"23ad48bf0c26","msisdn":"+491788735001"}],"rejectedMsisdns":[],"acceptedMsisdnCount":2,"rejectedMsisdnCount":0,"totalCount":2,"charge":0.02,"storage":"SDK-TEST-ASYNC-API","route":"IP4"}}
 */
client.submitAsyncLookupRequest(function(response) {
    console.log(response);
}, ['+491788735000', '+491788735001']);

/**
 * Sets the callback URL for asynchronous lookups. Read more about the concept of asynchronous HLR lookups @ http://www.hlr-lookups.com/en/asynchronous-hlr-lookup-api
 *
 * @param callback - callback function(response)
 * @param url - callback url on your server
 * @returns {*}
 *
 * Callback example: {"success":true,"messages":[],"results":{"url":"http:\/\/user:pass@www.your-server.com\/path\/file"}}
 */
client.setAsyncCallbackUrl(function(response) {
   console.log(response);
}, 'http://user:pass@www.your-server.com/path/file');

/**
 * Returns the remaining balance (EUR) in your account.
 *
 * @param callback - callback function(response)
 * @returns {*}
 *
 * Callback example: {"success":true,"messages":[],"results":{"balance":"5878.24600"}}
 */
client.getBalance(function(response) {
    console.log(response);
});
