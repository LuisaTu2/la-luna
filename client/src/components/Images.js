import React, { Component } from "react";
import ReactDOM from "react-dom";

class Images extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div id="contentImages"> 
                <div className="contentImageContainer"> 
                    <img src={this.props.imagesURL} alt="lavender" className="contentImage" /> 
                    <div className="contentImageMiddle">
                        <div className="contentImageMiddleText"> La Bicicleta </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Images;

