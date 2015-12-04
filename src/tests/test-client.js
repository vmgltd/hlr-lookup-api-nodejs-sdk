#!/usr/bin/env node

var HlrLookupClient = require("../lib/node-hlr-client");
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

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
    console.log(decoder.write(response));
}, '+491788735000');

/**
 * Submits a synchronous number type lookup request. The HLR is queried in real time and results presented in the response body.
 *
 * @param callback - callback function(response)
 * @param number - An number in international format, e.g. +4989702626
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":[{"id":"3cdb4e4d0ec1","number":"+4989702626","numbertype":"LANDLINE","state":"COMPLETED","isvalid":"Yes","ispossiblyported":"No","isvalidshortnumber":"No","isvanitynumber":"No","qualifiesforhlrlookup":"No","originalcarrier":null,"countrycode":"DE","mcc":null,"mnc":null,"mccmnc":null,"region":"Munich","timezones":["Europe\/Berlin"],"infotext":"This is a landline number.","usercharge":"0.0050","inserttime":"2015-12-04 13:02:48.415133+00","storage":"SYNC-API-NT-2015-12","route":"LC1"}]}
 */
client.submitSyncNumberTypeLookupRequest(function(response) {
    console.log(decoder.write(response));
}, '+4989702626');

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
    console.log(decoder.write(response));
}, ['+491788735000', '+491788735001']);

/**
 * Submits asynchronous number type lookups containing up to 1,000 numbers per request. Results are sent back asynchronously to a callback URL on your server.
 *
 * @param callback - callback function(response)
 * @param numbers - A list of numbers in international format, e.g. +4989702626,+491788735000
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":{"acceptedNumbers":[{"id":"4f0820c76fb7","number":"+4989702626"},{"id":"9b9a7dab11a4","number":"+491788735000"}],"rejectedNumbers":[],"acceptedNumberCount":2,"rejectedNumberCount":0,"totalCount":2,"charge":0.01,"storage":"ASYNC-API-NT-2015-12","route":"LC1"}}
 */
client.submitAsyncNumberTypeLookupRequest(function(response) {
    console.log(decoder.write(response));
}, ['+4989702626', '+491788735000']);

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
    console.log(decoder.write(response));
}, 'http://user:pass@www.your-server.com/path/file');

/**
 * Sets the callback URL for asynchronous number type lookups.
 *
 * @param callback - callback function(response)
 * @param url - callback url on your server
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":{"url":"http:\/\/user:pass@www.your-server.com\/path\/file"}}
 */
client.setNtAsyncCallbackUrl(function(response) {
    console.log(decoder.write(response));
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
    console.log(decoder.write(response));
});

/**
 * Performs a system health check and returns a sanity report.
 *
 * @param callback - callback function(response)
 * @returns {*}
 *
 * Return example: { "success":true, "results":{ "system":{ "state":"up" }, "routes":{ "states":{ "IP1":"up", "ST2":"up", "SV3":"up", "IP4":"up", "XT5":"up", "XT6":"up", "NT7":"up", "LC1":"up" } }, "account":{ "lookupsPermitted":true, "balance":"295.23000" } } }
 */
client.doHealthCheck(function(response) {
    console.log(decoder.write(response));
});
