import React, {Component} from 'react';
import Loader from "../components/Pages/Loader";

const LoaderHOC = (WrappedComponent) => {

    return class LoaderHOC extends Component{

        constructor(props) {
            super(props)
            this.state = {
                isActive: false
            }
        };
    
        // componentDidMount(){
        //     let isActiveFlag = true;
        //     this.setState({
        //         isActive: isActiveFlag
        //     })
        // };
    
        // componentDidUpdate(){
        //     let isActiveFlag = true;
        //     this.setState({
        //         isActive: isActiveFlag
        //     })
        // };

        render(){
            console.log("THE PROPS ARE: ", this.props);    
            return ( (this.props.imagesURLArr && this.props.imagesURLArr.length === 0) 
                        // || (this.props.isActiveComponent ) 
                        ? <Loader /> :  <WrappedComponent {...this.props} />
            )
        }
   }
}

export default LoaderHOC;
