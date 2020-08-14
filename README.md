# HLR Lookups SDK (NodeJS)

Official HLR Lookup API SDK for NodeJS by www.hlr-lookups.com. Obtain live mobile phone connectivity and portability data from network operators directly.

This SDK implements the REST API documented at https://www.hlr-lookups.com/en/api-docs and includes an [HLR API](https://www.hlr-lookups.com/en/api-docs#post-hlr-lookup) (live connectivity), [NT API](https://www.hlr-lookups.com/en/api-docs#post-nt-lookup) (number types), as well as an [MNP API](https://www.hlr-lookups.com/en/api-docs#post-mnp-lookup) (mobile number portability).

For SDKs in different programming languages, see https://www.hlr-lookups.com/en/api-docs#sdks

Requirements
------------
* NodeJS >= 10.14.0
* axios >= 0.19.2

Installation with npm
---------------------
`npm install node-hlr-client`

**Usage Client**
```javascript
require('node-hlr-client');

const client = new HlrLookupClient(
    'YOUR-API-KEY',
    'YOUR-API-SECRET'
);
```
Get your API key and secret [here](https://www.hlr-lookups.com/en/api-settings).

## Examples

**Test Authentication** (https://www.hlr-lookups.com/en/api-docs#get-auth-test)

Performs an authenticated request against the `GET /auth-test` endpoint. A status code of 200 indicates that you were able to authenticate using you [API credentials](https://www.hlr-lookups.com/en/api-settings#authSettings).

```javascript
client.get('/auth-test', 
    null,
    function (response) {

        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
            // authentication was successful
        }

    }
);
```

Get your API key and secret [here](https://www.hlr-lookups.com/en/api-settings).

**Submitting an HLR Lookup** ([HLR API Docs](https://www.hlr-lookups.com/en/api-docs#post-hlr-lookup))

```javascript
client.post('/hlr-lookup',
    {
        msisdn: '+905536939460'
    },
    function(response) {

        // The API returns an HTTP status code of 200 if the request was successfully processed. Let's have a look.
        console.log('HLR Lookup Status Code', response.status);
        console.log('HLR Lookup Response Body', response.data);

        if (response.status !== 200) {
            console.log('Received non-OK status code from server.');
            return;
        }

        let data = response.data;
        // do something with the data

    }
);
```

The HLR API Response Object:

```json
{
   "id":"f94ef092cb53",
   "msisdn":"+14156226819",
   "connectivity_status":"CONNECTED",
   "mccmnc":"310260",
   "mcc":"310",
   "mnc":"260",
   "imsi":"***************",
   "msin":"**********",
   "msc":"************",
   "original_network_name":"Verizon Wireless",
   "original_country_name":"United States",
   "original_country_code":"US",
   "original_country_prefix":"+1",
   "is_ported":true,
   "ported_network_name":"T-Mobile US",
   "ported_country_name":"United States",
   "ported_country_code":"US",
   "ported_country_prefix":"+1",
   "is_roaming":false,
   "roaming_network_name":null,
   "roaming_country_name":null,
   "roaming_country_code":null,
   "roaming_country_prefix":null,
   "cost":"0.0100",
   "timestamp":"2020-08-07 19:16:17.676+0300",
   "storage":"SYNC-API-2020-08",
   "route":"IP1",
   "processing_status":"COMPLETED",
   "error_code":null,
   "data_source":"LIVE_HLR"
}
```

A detailed documentation of the attributes and connectivity statuses in the HLR API response is [here](https://www.hlr-lookups.com/en/api-docs#post-hlr-lookup).

**Submitting a Number Type (NT) Lookup** ([NT API Docs](https://www.hlr-lookups.com/en/api-docs#post-nt-lookup))

```javascript
client.post('/nt-lookup',
    {
        number: '+4989702626'
    },
    function(response) {

        // The API returns an HTTP status code of 200 if the request was successfully processed. Let's have a look.
        console.log('NT Lookup Status Code', response.status);
        console.log('NT Lookup Response Body', response.data);

        if (response.status !== 200) {
            console.log('Received non-OK status code from server.');
            return;
        }

        let data = response.data;
        // do something with the data

    }
);
```

The NT API Response Object:

```json
{
     "id":"2ed0788379c6",
     "number":"+4989702626",
     "number_type":"LANDLINE",
     "query_status":"OK",
     "is_valid":true,
     "invalid_reason":null,
     "is_possibly_ported":false,
     "is_vanity_number":false,
     "qualifies_for_hlr_lookup":false,
     "mccmnc":null,
     "mcc":null,
     "mnc":null,
     "original_network_name":null,
     "original_country_name":"Germany",
     "original_country_code":"DE",
     "regions":[
        "Munich"
     ],
     "timezones":[
        "Europe/Berlin"
     ],
     "info_text":"This is a landline number.",
     "cost":"0.0050",
     "timestamp":"2015-12-04 10:36:41.866283+00",
     "storage":"SYNC-API-NT-2015-12",
     "route":"LC1"
}
```

A detailed documentation of the attributes and connectivity statuses in the NT API response is [here](https://www.hlr-lookups.com/en/api-docs#post-nt-lookup).

**Submitting an MNP Lookup (Mobile Number Portability)** ([MNP API Docs](https://www.hlr-lookups.com/en/api-docs#post-mnp-lookup))

```javascript
client.post('/mnp-lookup',
    {
        msisdn: '+14156226819'
    },
    function(response) {

        // The API returns an HTTP status code of 200 if the request was successfully processed. Let's have a look.
        console.log('MNP Lookup Status Code', response.status);
        console.log('MNP Lookup Response Body', response.data);

        if (response.status !== 200) {
            console.log('Received non-OK status code from server.');
            return;
        }

        let data = response.data;
        // do something with the data

    }
);
```

The MNP API Response Object:

```json
{
   "id":"e428acb1c0ae",
   "msisdn":"+14156226819",
   "query_status":"OK",
   "mccmnc":"310260",
   "mcc":"310",
   "mnc":"260",
   "is_ported":true,
   "original_network_name":"Verizon Wireless:6006 - SVR/2",
   "original_country_name":"United States",
   "original_country_code":"US",
   "original_country_prefix":"+1415",
   "ported_network_name":"T-Mobile US:6529 - SVR/2",
   "ported_country_name":"United States",
   "ported_country_code":"US",
   "ported_country_prefix":"+1",
   "extra":"LRN:4154250000",
   "cost":"0.0050",
   "timestamp":"2020-08-05 21:21:33.490+0300",
   "storage":"WEB-CLIENT-SOLO-MNP-2020-08",
   "route":"PTX",
   "error_code":null
}
```

A detailed documentation of the attributes and connectivity statuses in the MNP API response is [here](https://www.hlr-lookups.com/en/api-docs#post-mnp-lookup).

API Documentation
-----------------
Please inspect https://www.hlr-lookups.com/en/api-docs for detailed API documentation or email us at service@hlr-lookups.com.

Support and Feedback
--------------------
We appreciate your feedback! If you have specific problems or bugs with this SDK, please file an issue on Github. For general feedback and support requests, email us at service@hlr-lookups.com.

Contributing
------------

1. Fork it ( https://github.com/vmgltd/hlr-lookup-api-nodejs-sdk/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

