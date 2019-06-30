import React, { Component } from "react";
import ReactDOM from "react-dom";
import Image from "./Image"

class Images extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let imagesURL = this.props.imagesURLArr;

        return (
            <div className="contentImages"> 
                {   imagesURL.map( (imgURL, ix) => {
                    return <Image imageURL={imgURL} isWelcomePageImage={this.props.isWelcomePageImages} isLastPageImage={this.props.isLastPageImages} />
                })}
            </div>
        )
    }
}


export default Images;

