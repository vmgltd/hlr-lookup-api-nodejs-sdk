#!/usr/bin/env node

var Client = require('node-rest-client').Client;
client = new Client();

/**
 * Initializes the HLR Lookup Client
 * @param username - www.hlr-lookups.com username
 * @param password - www.hlr-lookups.com password
 * @param noSsl - set to true to disable SSL
 * @constructor
 */
function HlrLookupClient(username, password, noSsl) {

    this.username = username;
    this.password = password;
    this.url = (noSsl ? 'http' : 'https') + '://www.hlr-lookups.com/api';

}

/**
 * Submits a synchronous HLR Lookup request. The HLR is queried in real time and results presented in the response body.
 *
 * @param callback - callback function(response)
 * @param msisdn - An MSISDN in international format, e.g. +491788735000
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Return example: {"success":true,"results":[{"id":"e1fdf26531e4","msisdncountrycode":"DE","msisdn":"+491788735000","statuscode":"HLRSTATUS_DELIVERED","hlrerrorcodeid":null,"subscriberstatus":"SUBSCRIBERSTATUS_CONNECTED","imsi":"262031300000000","mccmnc":"26203","mcc":"262","mnc":"03","msin":"1300000000","servingmsc":"140445","servinghlr":null,"originalnetworkname":"E-Plus","originalcountryname":"Germany","originalcountrycode":"DE","originalcountryprefix":"+49","originalnetworkprefix":"178","roamingnetworkname":"Fixed Line Operators and Other Networks","roamingcountryname":"United States","roamingcountrycode":"US","roamingcountryprefix":"+1","roamingnetworkprefix":"404455","portednetworkname":null,"portedcountryname":null,"portedcountrycode":null,"portedcountryprefix":null,"portednetworkprefix":null,"isvalid":"Yes","isroaming":"Yes","isported":"No","usercharge":"0.0100","inserttime":"2014-12-28 06:22:00.328844+08","storage":"SDK-TEST-SYNC-API","route":"IP1","interface":"Sync API"}]}
 */
HlrLookupClient.prototype.submitSyncLookupRequest = function submitSyncLookupRequest(callback, msisdn, route, storage) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    if (!msisdn) {
        return callback(generateErrorResponse('Missing Argument: msisdn'));
    }

    if (typeof msisdn != 'string') {
        return callback(generateErrorResponse('Invalid Argument: msisdn must be of type string'));
    }

    if (route) {
        if (typeof route != 'string') {
            return callback(generateErrorResponse('Invalid Argument: route must be of type string'));
        }
    }

    if (storage) {
        if (typeof storage != 'string') {
            return callback(generateErrorResponse('Invalid Argument: storage must be of type string'));
        }
    }

    client.post(this.url, {
        data: {
            action: "submitSyncLookupRequest",
            msisdn: msisdn,
            username: this.username,
            password: this.password,
            route: route ? route : null,
            storage: storage ? storage : null
        },
        headers: {
            "Content-Type": "application/json"
        }
    },
    callback);

};

/**
 * Submits a synchronous number type lookup request. The HLR is queried in real time and results presented in the response body.
 *
 * @param callback - callback function(response)
 * @param number - An number in international format, e.g. +4989702626
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Return example: {"success":true,"results":[{"id":"2ed0788379c6","number":"+4989702626","numbertype":"LANDLINE","state":"COMPLETED","isvalid":"Yes","invalidreason":null,"ispossiblyported":"No","isvanitynumber":"No","qualifiesforhlrlookup":"No","originalcarrier":null,"mccmnc":null,"mcc":null,"mnc":null,"countrycode":"DE","regions":["Munich"],"timezones":["Europe\/Berlin"],"infotext":"This is a landline number.","usercharge":"0.0050","inserttime":"2015-12-04 10:36:41.866283+00","storage":"SYNC-API-NT-2015-12","route":"LC1","interface":"Sync API"}]}
 */
HlrLookupClient.prototype.submitSyncNumberTypeLookupRequest = function submitSyncNumberTypeLookupRequest(callback, number, route, storage) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    if (!number) {
        return callback(generateErrorResponse('Missing Argument: number'));
    }

    if (typeof number != 'string') {
        return callback(generateErrorResponse('Invalid Argument: number must be of type string'));
    }

    if (route) {
        if (typeof route != 'string') {
            return callback(generateErrorResponse('Invalid Argument: route must be of type string'));
        }
    }

    if (storage) {
        if (typeof storage != 'string') {
            return callback(generateErrorResponse('Invalid Argument: storage must be of type string'));
        }
    }

    client.post(this.url, {
            data: {
                action: "submitSyncNumberTypeLookupRequest",
                number: number,
                username: this.username,
                password: this.password,
                route: route ? route : null,
                storage: storage ? storage : null
            },
            headers: {
                "Content-Type": "application/json"
            }
        },
        callback);

};

/**
 * Submits asynchronous HLR Lookups containing up to 1,000 MSISDNs per request. Results are sent back asynchronously to a callback URL on your server. Use \VmgLtd\HlrCallbackHandler to capture them.
 *
 * @param callback - callback function(response)
 * @param msisdns - A list of MSISDNs in international format, e.g. +491788735000
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":{"acceptedMsisdns":[{"id":"e489a092eba7","msisdn":"+491788735000"},{"id":"23ad48bf0c26","msisdn":"+491788735001"}],"rejectedMsisdns":[],"acceptedMsisdnCount":2,"rejectedMsisdnCount":0,"totalCount":2,"charge":0.02,"storage":"SDK-TEST-ASYNC-API","route":"IP4"}}
 */
HlrLookupClient.prototype.submitAsyncLookupRequest = function submitAsyncLookupRequest(callback, msisdns, route, storage) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    if (!msisdns) {
        return callback(generateErrorResponse('Missing Argument: msisdns'));
    }

    if (typeof msisdns != 'object') {
        return callback(generateErrorResponse('Invalid Argument: msisdns must be of type array'));
    }

    if (route) {
        if (typeof route != 'string') {
            return callback(generateErrorResponse('Invalid Argument: route must be of type string'));
        }
    }

    if (storage) {
        if (typeof storage != 'string') {
            return callback(generateErrorResponse('Invalid Argument: storage must be of type string'));
        }
    }

    client.post(this.url, {
        data: {
            action: "submitAsyncLookupRequest",
            msisdns: convertMsisdnsArrayToString(msisdns),
            username: this.username,
            password: this.password,
            route: route ? route : null,
            storage: storage ? storage : null
        },
        headers: {
            "Content-Type": "application/json"
        }
    },
    callback);

};

/**
 * Submits asynchronous number type lookups containing up to 1,000 MSISDNs per request. Results are sent back asynchronously to a callback URL on your server.
 *
 * @param callback - callback function(response)
 * @param numbers - A list of numbers in international format, e.g. +4989702626,+491788735000
 * @param route - An optional route assignment, see: http://www.hlr-lookups.com/en/routing-options
 * @param storage - An optional storage assignment, see: http://www.hlr-lookups.com/en/storages
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":{"acceptedNumbers":[{"id":"4f0820c76fb7","number":"+4989702626"},{"id":"9b9a7dab11a4","number":"+491788735000"}],"rejectedNumbers":[],"acceptedNumberCount":2,"rejectedNumberCount":0,"totalCount":2,"charge":0.01,"storage":"ASYNC-API-NT-2015-12","route":"LC1"}}
 */
HlrLookupClient.prototype.submitAsyncNumberTypeLookupRequest = function submitAsyncNumberTypeLookupRequest(callback, numbers, route, storage) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    if (!numbers) {
        return callback(generateErrorResponse('Missing Argument: numbers'));
    }

    if (typeof numbers != 'object') {
        return callback(generateErrorResponse('Invalid Argument: msisdns must be of type array'));
    }

    if (route) {
        if (typeof route != 'string') {
            return callback(generateErrorResponse('Invalid Argument: route must be of type string'));
        }
    }

    if (storage) {
        if (typeof storage != 'string') {
            return callback(generateErrorResponse('Invalid Argument: storage must be of type string'));
        }
    }

    client.post(this.url, {
            data: {
                action: "submitAsyncNumberTypeLookupRequest",
                numbers: convertMsisdnsArrayToString(numbers),
                username: this.username,
                password: this.password,
                route: route ? route : null,
                storage: storage ? storage : null
            },
            headers: {
                "Content-Type": "application/json"
            }
        },
        callback);

};

/**
 * Sets the callback URL for asynchronous lookups. Read more about the concept of asynchronous HLR lookups @ http://www.hlr-lookups.com/en/asynchronous-hlr-lookup-api
 *
 * @param callback - callback function(response)
 * @param url - callback url on your server
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":{"url":"http:\/\/user:pass@www.your-server.com\/path\/file"}}
 */
HlrLookupClient.prototype.setAsyncCallbackUrl = function setAsyncCallbackUrl(callback, url) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    if (!url) {
        return callback(generateErrorResponse('Missing Argument: url'));
    }

    if (typeof url != 'string') {
        return callback(generateErrorResponse('Invalid Argument: url must be of type string'));
    }

    client.post(this.url, {
        data: {
            action: "setAsyncCallbackUrl",
            url: url,
            username: this.username,
            password: this.password
        },
        headers: {
            "Content-Type": "application/json"
        }
    },
    callback);

};

/**
 * Sets the callback URL for asynchronous number type lookups.
 *
 * @param callback - callback function(response)
 * @param url - callback url on your server
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":{"url":"http:\/\/user:pass@www.your-server.com\/path\/file"}}
 */
HlrLookupClient.prototype.setNtAsyncCallbackUrl = function setNtAsyncCallbackUrl(callback, url) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    if (!url) {
        return callback(generateErrorResponse('Missing Argument: url'));
    }

    if (typeof url != 'string') {
        return callback(generateErrorResponse('Invalid Argument: url must be of type string'));
    }

    client.post(this.url, {
            data: {
                action: "setNtAsyncCallbackUrl",
                url: url,
                username: this.username,
                password: this.password
            },
            headers: {
                "Content-Type": "application/json"
            }
        },
        callback);

};

/**
 * Returns the remaining balance (EUR) in your account.
 *
 * @param callback - callback function(response)
 * @returns {*}
 *
 * Return example: {"success":true,"messages":[],"results":{"balance":"5878.24600"}}
 */
HlrLookupClient.prototype.getBalance = function getBalance(callback) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    client.post(this.url, {
        data: {
            action: "getBalance",
            username: this.username,
            password: this.password
        },
        headers: {
            "Content-Type": "application/json"
        }
    },
    callback);

};

/**
 * Performs a system health check and returns a sanity report.
 *
 * @param callback - callback function(response)
 * @returns {*}
 *
 * Return example: { "success":true, "results":{ "system":{ "state":"up" }, "routes":{ "states":{ "IP1":"up", "ST2":"up", "SV3":"up", "IP4":"up", "XT5":"up", "XT6":"up", "NT7":"up", "LC1":"up" } }, "account":{ "lookupsPermitted":true, "balance":"295.23000" } } }
 */
HlrLookupClient.prototype.doHealthCheck = function doHealthCheck(callback) {

    if (!callback || typeof callback != 'function') {
        return console.error('Invalid Argument: callback');
    }

    if (!this.validateUsage()) {
        return callback(generateErrorResponse('Missing client arguments (username or password)'));
    }

    client.post(this.url, {
            data: {
                action: "doHealthCheck",
                username: this.username,
                password: this.password
            },
            headers: {
                "Content-Type": "application/json"
            }
        },
        callback);

};

/**
 * Parses an asynchronous HLR Lookup callback and returns a JSON string with the results.
 *
 * @param params
 * @returns {*}
 *
 * Return example: {"success":true,"results":[{"id":"40ebb8d9e7cc","msisdncountrycode":"DE","msisdn":"+491788735001","statuscode":"HLRSTATUS_DELIVERED","hlrerrorcodeid":null,"subscriberstatus":"SUBSCRIBERSTATUS_CONNECTED","imsi":"262032000000000","mccmnc":"26203","mcc":"262","mnc":"03","msin":"2000000000","servingmsc":"491770","servinghlr":null,"originalnetworkname":"178","originalcountryname":"Germany","originalcountrycode":"DE","originalcountryprefix":"+49","originalnetworkprefix":"178","roamingnetworkname":null,"roamingcountryname":null,"roamingcountrycode":null,"roamingcountryprefix":null,"roamingnetworkprefix":null,"portednetworkname":null,"portedcountryname":null,"portedcountrycode":null,"portedcountryprefix":null,"portednetworkprefix":null,"isvalid":"Yes","isroaming":"No","isported":"No","usercharge":"0.0100","inserttime":"2014-12-28 05:53:03.765798+08","storage":"ASYNC-API","route":"IP4"}]}
 */
HlrLookupClient.prototype.parseCallback = function parseCallback(params) {

    if (!params || !params.json) {
        return generateErrorResponse('Invalid callback parameters. Missing json payload.');
    }

    return params.json;

};

HlrLookupClient.prototype.validateUsage = function validateUsage() {

    return this.username && this.password;

};

function convertMsisdnsArrayToString(msisdns) {

    var string = '';

    var c = 0;
    msisdns.forEach(function(msisdn) {

        if (typeof msisdn != 'string') {
            return;
        }

        if (c > 0) {
            string += ',';
        }

        string += msisdn;

        c++;

    });

    return string;

}

function generateErrorResponse(message) {

    return JSON.stringify({
        success: false,
        fieldErrors: [],
        globalErrors: [message]
    });

}

module.exports = HlrLookupClient;

