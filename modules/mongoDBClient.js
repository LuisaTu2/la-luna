// *********************************************************************** //
// Defining variables
// *********************************************************************** //
let taxonomyIdMap = {}; 

// *********************************************************************** //
// Connecting to MongoDB 
// *********************************************************************** //
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://LuisaMongoDBUser:shoppingMDBU@shopping-luisatu-eczui.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri || "mongodb://localhost:27017/test", { useNewUrlParser: true });
const mongoDB = "shopping";

// *********************************************************************** //
// Builidng tables in database
// *********************************************************************** //
function buildCollection(url, listings, mongoCollection){
    console.log("Populating ", mongoCollection, " table.");
    client.connect((err, db) => {
        if(err){
            console.log(err);
            return ;
        }
        const collection = client.db(mongoDB).collection(mongoCollection);
        // Adding listings with unique taxonomy_id
        listings.forEach( listing => {
            let uniqueKey = String(listing.taxonomy_id) + listing.title;
            let adult = ["sexy","nipple","cock", "erotic", "orgasm", "mature", "flogger", "chastity", "BDSM", "penis", "lingerie", "kinky", "labia", "butt", "butt plug", "bondage", "fetish", "pussy", "labia", "torture"];
            let hasAdult = false;
            adult.forEach(w => {
                let wCap = w.charAt(0).toUpperCase() + w.slice(1);
                let wUpper = w.toUpperCase();
                if( listing.description.includes(w) || listing.title.includes(w) || 
                    listing.description.includes(wCap) || listing.title.includes(wCap) ||
                    listing.description.includes(wUpper) || listing.title.includes(wUpper) 
                ){
                    hasAdult = true;
                }
            });
            if(!taxonomyIdMap[uniqueKey] && !hasAdult){
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


// *********************************************************************** //
// Querying database
// *********************************************************************** //

function MongoDBClientConnect(querySelection, mongoCollection, res, taxonomyPath){
    let callback;
    if ( querySelection.selection === "views_likes_taxonomy" ){
        callback = getViewsLikesData;
    } else {
        callback = getListings;
    }
    client.connect((err, db) => {
        if(err){
            console.log(err);
            exit;
        }
        const collection = client.db(mongoDB).collection(mongoCollection);       
        collection.find(taxonomyPath).toArray((err, listingsUsers) => {
            callback(err, listingsUsers, res);
        });
    }); // end of client connect
}

function getListings(err, listings, res){
    err ? console.log(err) : null ;
    res.json(JSON.stringify(listings));
}

function getViewsLikesData(err, listings, res){
    err ? console.log(err) : null; 
    let taxonomyViewsMap = {};
    let taxonomyLikesMap = {};
    let taxonomyViewsLikes = [];
    listings.forEach( listing => {
        let t = listing.taxonomy_path[0]; let v = listing.views; let l = listing.num_favorers;
        taxonomyViewsMap[t] ? taxonomyViewsMap[t] += v : taxonomyViewsMap[t] = v;
        taxonomyLikesMap[t] ? taxonomyLikesMap[t] += l : taxonomyLikesMap[t] = l;
    });
    taxonomyViewsLikes = {"data":[taxonomyViewsMap, taxonomyLikesMap]};
    res.json(JSON.stringify(taxonomyViewsLikes));
}



// *********************************************************************** //
//  Exporting Functions
// *********************************************************************** //

module.exports = {
    MongoDBClientConnect, 
    buildCollection
}
