// *********************************************************************** //
// Importing required modules
// *********************************************************************** //
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 8080;
const request = require('request');
const totPages = 5;


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
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, db) => {
//   const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  const dbs = client.db("sample_weatherdata");
  const collection = dbs.collection("data");
  const docsWind9 = collection.find({"wind.type":"9"}).toArray(function(err, docs) {
    // console.log(JSON.stringify(docs));
    console.log(docs.length);
  });

  console.log("Retrieved data:\n");
//   client.close();
});


// *********************************************************************** //
// Routing
// *********************************************************************** //
app.get('/home', (req, res) => {
        console.log("Hello there!");
       
        let categories = {};
        let categoriesList = []

        for(let page=1; page < (totPages+1); page++){
            processingRequest(page, categoriesList);           
            // request(url, function (error, response, body) {
            //     let listings = JSON.parse(body).results;
            //     // console.log(response);
            //     // console.log('error:', error); // Print the error if one occurred
            //     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //     // // console.log('body:', body); 
            //     listings.forEach( listing => {
            //         let listingCategories = listing.category_path;
            //         listingCategories.forEach( lc => {
            //             // console.log(lc, categories);
            //             catDictionary(categories, lc);
            //         });                    
            //     });
            // }) 
        }
        
        console.log()
        res.sendFile(path.join(__dirname, 'client/index.html'));

        // filter URI criteria
        //&fields=tags,category_id,category_path&includes=Images(url_fullxfull,hex_code)&api_key=dvb11s3or2x3v911bdfef9vg
    }
);

// *********************************************************************** //
// Defining Functions
// *********************************************************************** //

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
