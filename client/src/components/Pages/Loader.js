import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Loader.css";

class Loader extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        return (
                <div className="loader"> 
                    <img src="../../../images/spinner.gif" />
                </div>
        )
    }
}


export default Loader;
