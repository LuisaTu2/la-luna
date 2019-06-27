const namejs = require("./components/name.js");
// const React = require('react');
// const ReactDOM = require('react-dom');

import React, { Component } from "react";
import ReactDOM from "react-dom";

class LikeButton extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
        <button> Like Button</button>
    );
  }
}

// export default FormContainer;
const likeBtn = document.getElementById("likeBtn");
ReactDOM.render( <LikeButton />, likeBtn);

console.log("WHATSUP!" + " " + namejs.name + ". I miss you <3");
