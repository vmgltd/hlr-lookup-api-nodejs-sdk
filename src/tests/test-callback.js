#!/usr/bin/env node

var http = require('http');
var url = require("url");
var port = 8181;
var HlrLookupClient = require("../lib/node-hlr-client");
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