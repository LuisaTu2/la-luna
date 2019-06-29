window.onload = function(){
    console.log("La gatta nera");

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
            }           
        }) // End of $.ajax call  
    }



}






// const namejs = require("./components/name.js");
// import React, { Component } from "react";
// import ReactDOM from "react-dom";

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


// console.log("WHATSUP!" + " " + namejs.name + ". I miss you <3. A lot a lot a lot. ");


