node-hlr-client
===============
Official HLR Lookup API Node JS SDK by www.hlr-lookups.com

This SDK implements the REST API documented at https://www.hlr-lookups.com/en/api-docs

For SDKs in other programming languages, see https://www.hlr-lookups.com/en/sdks

Requirements
------------
* node-rest-client

Installation with npm
---------------------
```bash
npm install node-hlr-client
```

**Usage Client**
```node
#!/usr/bin/env node

var HlrLookupClient = require("node-hlr-client");
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
 * Callback example: {"success":true,"results":[{"id":"e1fdf26531e4","msisdncountrycode":"DE","msisdn":"+491788735000","statuscode":"HLRSTATUS_DELIVERED","hlrerrorcodeid":null,"subscriberstatus":"SUBSCRIBERSTATUS_CONNECTED","imsi":"262031300000000","mccmnc":"26203","mcc":"262","mnc":"03","msin":"1300000000","servingmsc":"140445","servinghlr":null,"originalnetworkname":"E-Plus","originalcountryname":"Germany","originalcountrycode":"DE","originalcountryprefix":"+49","originalnetworkprefix":"178","roamingnetworkname":"Fixed Line Operators and Other Networks","roamingcountryname":"United States","roamingcountrycode":"US","roamingcountryprefix":"+1","roamingnetworkprefix":"404455","portednetworkname":null,"portedcountryname":null,"portedcountrycode":null,"portedcountryprefix":null,"portednetworkprefix":null,"isvalid":"Yes","isroaming":"Yes","isported":"No","usercharge":"0.0100","inserttime":"2014-12-28 06:22:00.328844+08","storage":"SDK-TEST-SYNC-API","route":"IP1","interface":"Sync API"}]}
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
 * Callback example: {"success":true,"results":[{"id":"2ed0788379c6","number":"+4989702626","numbertype":"LANDLINE","state":"COMPLETED","isvalid":"Yes","invalidreason":null,"ispossiblyported":"No","isvanitynumber":"No","qualifiesforhlrlookup":"No","originalcarrier":null,"mccmnc":null,"mcc":null,"mnc":null,"countrycode":"DE","regions":["Munich"],"timezones":["Europe\/Berlin"],"infotext":"This is a landline number.","usercharge":"0.0050","inserttime":"2015-12-04 10:36:41.866283+00","storage":"SYNC-API-NT-2015-12","route":"LC1","interface":"Sync API"}]}
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
 * Callback example: {"success":true,"messages":[],"results":{"acceptedNumbers":[{"id":"4f0820c76fb7","number":"+4989702626"},{"id":"9b9a7dab11a4","number":"+491788735000"}],"rejectedNumbers":[],"acceptedNumberCount":2,"rejectedNumberCount":0,"totalCount":2,"charge":0.01,"storage":"ASYNC-API-NT-2015-12","route":"LC1"}}
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
 * Callback example: {"success":true,"messages":[],"results":{"url":"http:\/\/user:pass@www.your-server.com\/path\/file"}}
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

```

**Usage Callback Handler**
```node
#!/usr/bin/env node

var http = require('http');
var url = require("url");
var port = 8181;
var HlrLookupClient = require("node-hlr-client");
var client = new HlrLookupClient();

http.createServer(function(request, response) {

    if (request.url == '/favicon.ico') return;
    var params = url.parse(request.url, true).query;

    /**
     * Parses an asynchronous HLR Lookup callback and returns a JSON string with the results.
     *
     * @param params
     * @returns {*}
     *
     * Return example: {"success":true,"results":[{"id":"40ebb8d9e7cc","msisdncountrycode":"DE","msisdn":"+491788735001","statuscode":"HLRSTATUS_DELIVERED","hlrerrorcodeid":null,"subscriberstatus":"SUBSCRIBERSTATUS_CONNECTED","imsi":"262032000000000","mccmnc":"26203","mcc":"262","mnc":"03","msin":"2000000000","servingmsc":"491770","servinghlr":null,"originalnetworkname":"178","originalcountryname":"Germany","originalcountrycode":"DE","originalcountryprefix":"+49","originalnetworkprefix":"178","roamingnetworkname":null,"roamingcountryname":null,"roamingcountrycode":null,"roamingcountryprefix":null,"roamingnetworkprefix":null,"portednetworkname":null,"portedcountryname":null,"portedcountrycode":null,"portedcountryprefix":null,"portednetworkprefix":null,"isvalid":"Yes","isroaming":"No","isported":"No","usercharge":"0.0100","inserttime":"2014-12-28 05:53:03.765798+08","storage":"ASYNC-API","route":"IP4"}]}
     */
    console.log(client.parseCallback(params));

    response.writeHead(200);
    response.write('OK');
    response.end();

}).listen(port);

console.log("Callback Handler is listening on port " + port);
```

With that you should be ready to go!

Tests
-----

The code contains annotations and you can find usage examples as tests in `tests/`:
* `tests/test-client.js`
* `tests/test-callback.js`

Please refer to https://www.hlr-lookups.com/en/sdks/nodejs for further documentation or send us an email to service@hlr-lookups.com.

Support and Feedback
--------------------
Your feedback is appreciated! If you have specific problems or bugs with this SDK, please file an issue on Github. For general feedback and support requests, send an email to service@hlr-lookups.com.

Contributing
------------

1. Fork it ( https://github.com/vmgltd/hlr-lookup-api-nodejs-sdk/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
