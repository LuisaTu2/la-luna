import React, {Component} from 'react';
import Loader from "../components/Pages/Loader";

const LoaderHocImage = (WrappedComponent) => {

    return class LoaderHOC extends Component{

        constructor(props) {
            super(props);
        }
    
        render(){
            // let noImagePath = "../../images/yellow_flowers.jpg";
            let noImagePath = "../../images/no_image.png";
            let noImageFlag = "BLANK blank Blank".includes(this.props.title) || !this.props.imageURL ;
            let rendering =  (noImageFlag ) ? <WrappedComponent noImage={noImagePath} {...this.props} /> : <WrappedComponent {...this.props} />;
            return rendering
        }
   }
}

export default LoaderHocImage;
