// *********************************************************************** //
// Defining variables & importing modules
// *********************************************************************** //
const request = require('request');
const mongoDBClientFunctions = require("./mongoDBClient");
const apiKeys = require("../apiKeys");
const timeInterval = 1e4;

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
            }, batch*timeInterval );
    }
}


module.exports = { 
    etsyClientRequests
};