import React, { Component } from "react";
import ReactDOM from "react-dom";

class Image extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div id="contentImages"> 
                <div className="contentImageContainer"> 
                    <img src={this.props.imageURL} alt="lavender" className="contentImage" /> 
                    <div className="contentImageMiddle">
                        <div className="contentImageMiddleText"> La Bicicleta </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Image;

