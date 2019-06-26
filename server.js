// *********************************************************************** //
// Importing required modules
// *********************************************************************** //
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 8080;
const request = require('request');

// *********************************************************************** //
// Creating the server
// *********************************************************************** //
const app = express();
app.use( express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// *********************************************************************** //
// Routing
// *********************************************************************** //
app.get('/', (req, res) => {
        console.log("Hello there! ");
        let url = "https://openapi.etsy.com/v2/listings/active?api_key=dvb11s3or2x3v911bdfef9vg";

        request(url, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', //body
            ); 
        });
        res.sendFile(path.join(__dirname, 'public/html/index.html'));
    }
);

app.post("/data", function(req, res){
    console.log("You requested: " + req.url);
    var data = req.body;
    console.log(data);
    
   
});               

// *********************************************************************** //
// Defining Functions
// *********************************************************************** //

// *********************************************************************** //
// Server Listening
// *********************************************************************** //

    app.listen(port, () => {
        console.log("Server is up on port 8080.");
    });

// *********************************************************************** //
// End of File
// *********************************************************************** //
