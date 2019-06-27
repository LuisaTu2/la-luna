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
const client = new MongoClient(uri || "mongodb://localhost:27017/test", { useNewUrlParser: true });

// function connectDB(uri, cli, data){
    let data = [];
    client.connect((err, db) => {
        if(err){
            console.log(err);
            return 
        }
        const dbs = client.db("shopping");
        const collection = dbs.collection("listings");
        // const document = collection.find().toArray(function(err, docs) {
        //     console.log(JSON.stringify(docs));
        //     console.log("Retrieved data:\n");
        //     // console.log("listings: ", docs);
        // });
        collection.insertMany(data, (err, res) =>{
            if(err){
                console.log(err);
            } else {
                console.log("SUCCESSFULLY UPDATED DATABASE COLLECTION!");
                console.log(res);
            }
        });
        //   client.close();

    });
// }



// *********************************************************************** //
// Routing
// *********************************************************************** //
app.get('/home', (req, res) => {
        console.log("Hello there!");

        let url = "https://openapi.etsy.com/v2/listings/active?page="+1+"&api_key=dvb11s3or2x3v911bdfef9vg";  
        request(url, function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            let listings = JSON.parse(body).results;  
            // console.log('listings:', listings);
            // connectDB(uri, client, listings);

        });

        for(let page=1; page < (totPages+1); page++){
            // processingRequest(page, categoriesList);           
            // request(url, function (error, response, body) {
            //     let listings = JSON.parse(body).results;
            //     listings.forEach( listing => {
            //         let listingCategories = listing.category_path;
            //         listingCategories.forEach( lc => {
            //             // console.log(lc, categories);
            //             catDictionary(categories, lc);
            //         });                    
            //     });
            // }) 
        }
        
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
