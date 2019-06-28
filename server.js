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
//         let urlFR = "https://openapi.etsy.com/v2/listings/active?fields=category_path&includes=Images(url_fullxfull)&page="+page+"&api_key=dvb11s3or2x3v911bdfef9vg";
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

        client.connect((err, db) => {
            if(err){
                console.log(err);
                exit;
            }
            const dbs = client.db("shopping");
            const collection = dbs.collection("listings");
          
            let categories = [];
            let categoriesUnique = {};

            collection.find().project({  
                _id: 0, 
                taxonomy_path: 1
            }).toArray(function(err, cat) {
                    //console.log(JSON.stringify(cat));
                    if(err){
                        console.log(err);
                    }
                    categories = cat;
                    // console.log(categories);
                    categories.forEach( categoryArr => {
                        // let categoryList = categoryArr.category_path;
                        let categoryList = categoryArr.taxonomy_path;
                        categoryList.forEach( category => {
                            if(categoriesUnique[category]){
                                categoriesUnique[category] += 1;
                            } else {
                                categoriesUnique[category] = 1;
                            }
                        })
                    })
                    console.log(categoriesUnique);
            });
            
        });
        
        res.sendFile(path.join(__dirname, 'client/index.html'));

        // filter URI criteria
        //&fields=tags,category_id,category_path&includes=Images(url_fullxfull,hex_code)&api_key=dvb11s3or2x3v911bdfef9vg
    }
);

// *********************************************************************** //
// Defining Functions
// *********************************************************************** //

function insertDB(uri, cli, data){
    console.log("INSERTING INTO DB!");
    // console.log(data);
    client.connect((err, db) => {
        if(err){
            console.log(err);
            // client.close();
            exit;
        }
        const dbs = client.db("shopping");
        const collection = dbs.collection("listings");

        collection.insertMany(data, (err, res) =>{
            if(err){
                console.log(err);
            } else {
                console.log("SUCCESSFULLY UPDATED DATABASE COLLECTION!");
            }
        });
        //   client.close();

    });
}

function makeRequestDB(u){
    console.log("MAKING A REQUEST!", u);
    request(u, function (error, response, body) {
        let listings = JSON.parse(body).results;  
        insertDB(u, client, listings);
    });
}

function processingRequest(ix, arr){
    let url = "https://openapi.etsy.com/v2/listings/active?page="+ix+"&api_key=dvb11s3or2x3v911bdfef9vg";  
    request(url, function (error, response, body) {
        let listings = JSON.parse(body).results;  
        listings.forEach( listing => {
            arr.push(listing.category_path);
            // console.log("**************************");          
        });
    });
}

function printAsync(v){
    console.log(v);
}

function catDictionary(d, cat){
    // console.log(d, cat);
    if(d[cat]){
        d[cat]+=1
    } else {
        d[cat] = 1;
    }
    
}

// *********************************************************************** //
// Server Listening
// *********************************************************************** //

app.listen(port, () => {
    console.log("Server is up on port " + port + ".");
});

// *********************************************************************** //
// End of File
// *********************************************************************** //



        // for(let page=1; page < (totPages+1); page++){
        //     // processingRequest(page, categoriesList);           
        //     // request(url, function (error, response, body) {
        //     //     let listings = JSON.parse(body).results;
        //     //     listings.forEach( listing => {
        //     //         let listingCategories = listing.category_path;
        //     //         listingCategories.forEach( lc => {
        //     //             // console.log(lc, categories);
        //     //             catDictionary(categories, lc);
        //     //         });                    
        //     //     });
        //     // }) 
        // }

        // _id: 0, 
        // category_path: 1, 
        // taxonomy_id: 0,
        // taxonomy_path: 0, 
        // used_manufacturer:0, 
        // sku: 0,                
        // Images: 0