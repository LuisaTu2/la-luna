import React, { Component } from "react";
import ReactDOM from "react-dom";
import LoaderHocImage from "../../HOC/LoaderHocImage";
import "./Image.css";

class Image extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
                <div className="contentImageContainer"> 
                    <img src={this.props.noImage || this.props.imageURL} alt={this.props.title} className={"contentImage shadow" }/> 
                        <div className="contentImageMiddle">
                            <div className="contentImageMiddleText"> {this.props.title} </div>
                        </div> 
                </div>
        )
    }
}


export default LoaderHocImage(Image);

