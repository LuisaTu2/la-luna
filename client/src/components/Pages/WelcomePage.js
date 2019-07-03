import React, { Component } from "react";
import ReactDOM from "react-dom";

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let conditional = !this.props.isWelcomePageImage && !this.props.isLastPageImage;
        return (
                <div className="welcomePageContainer"> 
                    <div className="welcomePageText"> SUMMER IS HERE! </div> 
                    <img src={"../../../images/lavender.jpg"} alt="lavender" className={"contentImage" + (conditional ? " shadow" : "" ) }/> 
 
                </div>
        )
    }
}


export default WelcomePage;

