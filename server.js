// *********************************************************************** //
// Importing required modules
// *********************************************************************** //
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 8080;
const request = require('request');
const totPages = 5;
let isFirstRender = true;
let limitPages = 100;
let apiKey = "dvb11s3or2x3v911bdfef9vg";
let categories = [];
let taxonomyMapping = { "craft_supplies":'Craft Supplies & Tools',
                        "jewelry":'Jewelry',
                        "clothing": "Clothing",
                        "home_living": "Home & Living",
                        "art_collectibles": "Art & Collectibles",
                        "accessories": "Accessories"     
                    };
let taxonomyIdMap = {}; 
let taxonomyIdMap1 = {};
let users = new Set();

// *********************************************************************** //
// Creating the server
// *********************************************************************** //
const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());


// *********************************************************************** //
// Setting up connection to MongoDB Atlas Database
// *********************************************************************** //
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://LuisaMongoDBUser:shoppingMDBU@shopping-luisatu-eczui.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri || "mongodb://localhost:27017/test", { useNewUrlParser: true });


// *********************************************************************** //
// Building Database
// *********************************************************************** //
// if(isFirstRender){
//     isFirstRender = false;
//     for(let page=1; page < 100; page++){
//         // let urlFR = "https://openapi.etsy.com/v2/listings/active?includes=Images(url_fullxfull)&limit="+limitPages+"&page="+page+"&api_key="+apiKey;
//         // let urlFR = "https://openapi.etsy.com/v2/listings/active?fields=category_path&includes=Images(url_fullxfull)&page="+page+"&api_key=dvb11s3or2x3v911bdfef9vg";
//         let urlFR = "https://openapi.etsy.com/v2/listings/active?fields=category_path,title,user_id,price,currency_code&limit=100&includes=Images(url_fullxfull)&"+page+"&api_key=dvb11s3or2x3v911bdfef9vg"
//         console.log(page, urlFR);
//         let batch = Math.floor(page/10);
//         setTimeout( () => { makeRequestDB(urlFR)}, batch*2000 );
//     }
//     // FYI last was page 89
// }

// *********************************************************************** //
// Routing
// *********************************************************************** //
app.get('/home', (req, res) => {
        console.log("Hello there!");   
        res.sendFile(path.join(__dirname, 'client/index.html'));
        // filter URI criteria
        //&fields=tags,category_id,category_path&includes=Images(url_fullxfull,hex_code)&api_key=dvb11s3or2x3v911bdfef9vg
    }
);


app.post("/data", (req, res) =>{
    // console.log(req.body);
    let taxonomyJSON = req.body;
    let taxonomyLookup = taxonomyMapping[taxonomyJSON.taxonomy];
    console.log("Selection received in 'POST' ajax call: ", taxonomyJSON, taxonomyLookup);
    client.connect((err, db) => {
        if(err){
            console.log(err);
            exit;
        }
        const dbs = client.db("shopping");
        const collection = dbs.collection("listings");
       
        collection.find({"taxonomy_path": taxonomyLookup}).toArray(function(err, taxonomy) {
                if(err){
                    console.log(err);
                }
                res.json(JSON.stringify(taxonomy));
        });
    }); // end of client connect
}); // end of app.post

app.post("/data_analytics", (req, res) => {
    let query = req.body;
    console.log(query);
    client.connect((err, db) => {
        if(err){
            console.log(err);
            exit;
        }
        const dbs = client.db("shopping");
        const collection = dbs.collection("listings_users");
       
        collection.find().toArray(function(err, listings_users_All) {
                if(err){
                    console.log(err);
                }
                res.json(JSON.stringify(listings_users_All));
        });
    }); // end of client connect

})
// *********************************************************************** //
//                             Functions
// *********************************************************************** //

function insertDB(uri, listings){
    console.log("INSERTING data IN DB!");
    client.connect((err, db) => {
        if(err){
            console.log(err);
            // client.close();
            exit;
        }
        const dbs = client.db("shopping");
        const collection = dbs.collection("listings");
        // Adding listings with unique taxonomy_id
        listings.forEach( listing => {
            let uniqueKey = String(listing.taxonomy_id) + listing.title;
            if(!taxonomyIdMap[uniqueKey]){
                taxonomyIdMap[uniqueKey] = 1;
                collection.insertOne(listing, (err, res) => {
                    if(err){
                        console.log(err);
                    }
                });
            } 
        }); 
    }); // end of client.connect
} // end of function insertDB

app.get("/analytics111", (req, res) => {
    console.log("You requested Analytics!");
    for(let page=1; page < 100; page++){
        let urlFR = "https://openapi.etsy.com/v2/listings/active?fields=category_path,title,price,currency_code,user_id,views,num_favorers,images&limit=100&includes=Images&"+page+"&api_key=dvb11s3or2x3v911bdfef9vg";
        // console.log(page, urlFR);
        let batch = Math.floor(page/10);
        setTimeout( () => {
            request(urlFR, function (error, response, body) {
                    let listings = JSON.parse(body).results;  
                    insertDB_ListingsUsers(urlFR, listings);
                    })
            }, batch*10000 );
    }
});

function insertDB_ListingsUsers(url, data){
    console.log("DATA REQUESTED ", data.length);
    client.connect((err, db) => {
        if(err){
            console.log(err);
            exit;
        }
        const dbs = client.db("shopping"); const collection = dbs.collection("listings_users");

        data.forEach( d => {
            let uniqueKey = String(d.taxonomy_id) + d.title;
            if(!taxonomyIdMap1[uniqueKey]){
                taxonomyIdMap1[uniqueKey] = 1;
                users.add(d.user_id);
                collection.insertOne(d, (err, res) => {
                    if(err){
                        console.log(err);
                    }
                });
            } 
        }); 
        // collection.insertMany(data, (err, res) => {
        //     err ? console.log(err) : null;
        // })
        console.log("USERS", users);     
    }) // end of client connect
}

function makeRequestDB(u){
    console.log("MAKING A REQUEST", u);
    request(u, function (error, response, body) {
        let listings = JSON.parse(body).results;  
        insertDB(u, listings);
    });
}

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


// *********************************************************************** //
// Server Listening
// *********************************************************************** //

app.listen(port, () => {
    console.log("Server is up on port " + port + ".");
});

// *********************************************************************** //
// End of File
// *********************************************************************** //



// _id: 0, 
// category_path: 1, 
// taxonomy_id: 0,
// taxonomy_path: 0, 
// used_manufacturer:0, 
// sku: 0,                
// Images: 0