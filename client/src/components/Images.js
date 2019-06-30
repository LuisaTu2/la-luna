import React, { Component } from "react";
import ReactDOM from "react-dom";
import Image from "./Image"

class Images extends Component {
    constructor(props) {
        super(props);
        // this.state = {
         
        // }
    }
    
    render() {
        return (
            <div> 
                { this.props.imagesURL.map( (imgURL, ix) => {
                    console.log(imgURL, ix);
                    return <Image imageURL={imgURL} />
                })}
            </div>
        )
    }
}


export default Images;

