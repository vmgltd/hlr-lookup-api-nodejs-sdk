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
 * Return example: {"success":true,"results":[{"id":"e1fdf26531e4","msisdncountrycode":"DE","msisdn":"+491788735000","statuscode":"HLRSTATUS_DELIVERED","hlrerrorcodeid":null,"subscriberstatus":"SUBSCRIBERSTATUS_CONNECTED","imsi":"262031300000000","mccmnc":"26203","mcc":"262","mnc":"03","msin":"1300000000","servingmsc":"140445","servinghlr":null,"originalnetworkname":"E-Plus","originalcountryname":"Germany","originalcountrycode":"DE","originalcountryprefix":"+49","originalnetworkprefix":"178","roamingnetworkname":"Fixed Line Operators and Other Networks","roamingcountryname":"United States","roamingcountrycode":"US","roamingcountryprefix":"+1","roamingnetworkprefix":"404455","portednetworkname":null,"portedcountryname":null,"portedcountrycode":null,"portedcountryprefix":null,"portednetworkprefix":null,"isvalid":"Yes","isroaming":"Yes","isported":"No","usercharge":"0.0100","inserttime":"2014-12-28 06:22:00.328844+08","storage":"SDK-TEST-SYNC-API","route":"IP1"}]}
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

