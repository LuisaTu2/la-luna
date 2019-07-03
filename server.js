// *********************************************************************** //
// Importing required modules
// *********************************************************************** //
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 8080;
const request = require('request');
let apiKey = "dvb11s3or2x3v911bdfef9vg";
let users = new Set();
const mongoDBClientFunctions = require("./modules/mongoDBClient");
const etsyClientFunctions = require("./modules/etsyClient");
const maxListingsPerPage = 100; 
const maxRequestsPerSecond = 10;
let taxonomyMapping = { "craft_supplies":'Craft Supplies & Tools',
                        "jewelry":'Jewelry',
                        "clothing": "Clothing",
                        "home_living": "Home & Living",
                        "art_collectibles": "Art & Collectibles",
                        "accessories": "Accessories"     
                    };

// *********************************************************************** //
// Creating the server
// *********************************************************************** //
const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());


// *********************************************************************** //
// Building tables in database
// *********************************************************************** //
// BUILDING LISTINGS TABLE
app.get("/buildListingsTable", (req, res) => {
    console.log("Building Listings Table...");
    let url = "https://openapi.etsy.com/v2/listings/active?fields=category_path,title,user_id&limit=100&includes=Images(url_170x135)&"
    etsyClientFunctions.etsyClientRequests(url, maxListingsPerPage, maxRequestsPerSecond, "listings");  
});

// BUILDING LISTINGS_USERS TABLE
app.get("/buildListingsUsersTable", (req, res) => {
    console.log("Building Listings_Users Table");
    let url = "https://openapi.etsy.com/v2/listings/active?fields=category_path,title,price,currency_code,user_id,views,num_favorers,images&limit=100&includes=Images&"
    etsyClientFunctions.etsyClientRequests(url, maxListingsPerPage, maxRequestsPerSecond, "listings_users");
    
});

// *********************************************************************** //
// Routing
// *********************************************************************** //
app.get('/home', (req, res) => {
        console.log("Hello there!");   
        res.sendFile(path.join(__dirname, 'client/index.html'));
    }
);

app.post("/data", (req, res) =>{
    // console.log(req.body);
    let taxonomyJSON = req.body;
    let taxonomyLookup = taxonomyMapping[taxonomyJSON.taxonomy];
    let taxonomyPath = {"taxonomy_path": taxonomyLookup};
    console.log("Taxonomy selection and mapping: ", taxonomyJSON, taxonomyLookup);
    mongoDBClientFunctions.MongoDBClientConnect({"selection":"taxonomy"}, "listings", res, taxonomyPath)
}); // end of app.post


app.post("/data_analytics", (req, res) => {
    let querySelection = req.body;
    mongoDBClientFunctions.MongoDBClientConnect(querySelection, "listings_users", res, "");
});


// *********************************************************************** //
// App listening
// *********************************************************************** //

app.listen(port, () => {
    console.log("Server is up on port " + port + ".");
});

// *********************************************************************** //
// End of file
// *********************************************************************** //



// 
// let categories = [];
// function uniqueTaxonomy(){
//             client.connect((err, db) => {
//             if(err){
//                 console.log(err);
//                 exit;
//             }
//             const dbs = client.db("shopping");
//             const collection = dbs.collection("listings");     
//             let categories = [];
//             let categoriesUnique = {};

//             collection.find().project({  
//                 _id: 0, 
//                 taxonomy_path: 1
//             }).toArray(function(err, cat) {
//                     if(err){
//                         console.log(err);
//                     }
//                     categories = cat;
//                     categories.forEach( categoryArr => {
//                         let categoryList = categoryArr.taxonomy_path;
//                         categoryList.forEach( category => {
//                             if(categoriesUnique[category]){
//                                 categoriesUnique[category] += 1;
//                             } else {
//                                 categoriesUnique[category] = 1;
//                             }
//                         })
//                     })
//                     // console.log(categoriesUnique);
//             });
//         });
// }
