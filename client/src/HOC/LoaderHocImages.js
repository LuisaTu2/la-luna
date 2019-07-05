import React, {Component} from 'react';
import Loader from "../components/Pages/Loader";

const LoaderHocImages = (WrappedComponent) => {

    return class LoaderHOC extends Component{
                constructor(props) {
                    super(props);
                }
            
                render(){
                    // console.log("THE PROPS ARE: ", this.props);  
                    let rendering =  this.props.imagesURLArr.length === 0 ? <Loader /> : <WrappedComponent {...this.props} />;
                    return rendering
                }
   }
}

export default LoaderHocImages;
