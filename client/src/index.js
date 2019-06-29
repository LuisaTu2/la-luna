window.onload = function(){
    console.log("La gatta nera");

    // class LikeButton extends Component {
    //   constructor() {
    //     super();
    //     this.state = {
    //       title: ""
    //     };
    //   }
    //   render() {
    //     return (
    //         <button> Like Button</button>
    //     );
    //   }
    // }


    $("a").click(submitData);

    function submitData(){
        let taxonomy = this.getAttribute("value");
        let userData = {"taxonomy": taxonomy};
        console.log(userData);
        $.ajax({
            type: "POST",
            url: "/data",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, status, jqXHR){
                console.log("RETRIEVED DATA: ", data, status, jqXHR);
                // processData(data);
                document.getElementById("content").innerHTML = "HELLO";
            }           
        }) // End of $.ajax call  
    } // end of submitData function


    function processData(dataJSON){
        let listings = JSON.parse(dataJSON);
        let imagesURL = [];
        listings.forEach( listing => {
            let imgArr = listing.Images;
            imagesURL.push(imgArr[0]);
        });

        let contentHTML = document.getElementById("content").innerHTML;
        contentHTML = dataJSON;

    }; // end of processData function



}






// const namejs = require("./components/name.js");
// import React, { Component } from "react";
// import ReactDOM from "react-dom";



// console.log("WHATSUP!" + " " + namejs.name + ". I miss you <3. A lot a lot a lot. ");


