import React, { Component } from "react";
import ReactDOM from "react-dom";
import Image from "./Image";
import LoaderHocImages from "../../HOC/LoaderHocImages";

class Images extends Component {
    constructor(props) {
        super(props);       
    }
        
    render() {
        let imagesURL = this.props.imagesURLArr;
        return  <div className="contentImages"> 
                    { imagesURL.map( (imgURL, ix) => { return <Image imageURL={imgURL[0]} title={imgURL[1]}/> })}
                </div> 
    }
}


export default LoaderHocImages(Images);
// export default Images;