// *********************************************************************** //
// Defining variables & importing modules
// *********************************************************************** //
const request = require('request');
const mongoDBClientFunctions = require("./mongoDBClient");
// const apiKeys = require("../apiKeys");
const apiKeys = { "etsyApiKey" : "dvb11s3or2x3v911bdfef9vg" }


// *********************************************************************** //
// Requests and Rendering for building Collections
// *********************************************************************** //
function etsyClientRequests( uri, maxListingsPerPage, maxRequestsPerSecond, mongoCollection){
    let url;
    for(let page = 1; page < maxListingsPerPage; page++){       
         url = uri + page + "&api_key=" + apiKeys.etsyApiKey;
        // console.log(page, urlFR);
        let batch = Math.floor(page/maxRequestsPerSecond);
        setTimeout( () => {
            request(url, (error, response, body) => {
                        let listings = JSON.parse(body).results;  
                        mongoDBClientFunctions.buildCollection( url, listings, mongoCollection );
                    })
            }, batch*1e4 );
    }
}


module.exports = { 
    etsyClientRequests
};