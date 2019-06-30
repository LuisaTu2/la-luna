import React, { Component } from "react";
import ReactDOM from "react-dom";
import Image from "./Image"

class Images extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let imagesURL = this.props.imagesURL;
        let firstPage = this.props.firstPageIx;
        let lastPage = firstPage + 10;
        let images = [];
    
        for(let i = firstPage; i <= lastPage; i++){
            if(i < images.length){
                images.push(imagesURL[i]);
            }
        }

        console.log("RENDER THESE IMAGES: ", images );

        return (
            <div> 
                {   imagesURL.map( (imgURL, ix) => {
                    return <Image imageURL={imgURL} />
                })}
            </div>
        )
    }
}


export default Images;

