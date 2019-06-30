import React, { Component } from "react";
import ReactDOM from "react-dom";

class Image extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let conditional = !this.props.isWelcomePageImage && !this.props.isLastPageImage;
        return (
                <div className="contentImageContainer"> 
                    <img src={this.props.imageURL} alt="lavender" className={"contentImage" + (conditional ? " shadow" : "" ) }/> 
                    { conditional ? 
                        <div className="contentImageMiddle">
                            <div className="contentImageMiddleText"> {this.props.title} </div>
                        </div> :
                         ""}
  
                </div>
        )
    }
}


export default Image;

