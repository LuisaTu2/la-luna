import React, { Component } from "react";
import ReactDOM from "react-dom";
import LoaderHOC from "../../HOC/LoaderHOC";


class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }


    
    render() {
        // let conditional = !this.props.isWelcomePageImage && !this.props.isLastPageImage;
        
        return (
                <div className="welcomePageContainer"> 
                    <div className="welcomePageText"> SUMMER IS HERE! </div> 
                    <img src={"../../../images/lavender.jpg"} alt="lavender" className={"contentImage shadow" }/> 
 
                </div>
        )
    }
}

export default LoaderHOC(WelcomePage);
// export default WelcomePage;

