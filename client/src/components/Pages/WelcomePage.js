import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./WelcomePage.css";

class WelcomePage extends Component {
    constructor(props){
        super(props);
    }
   
    render() {

            return <div className="welcomePageContainer"> 
                        <div className="welcomePageText1"> SUMMER IS HERE! </div> 
                        <div className="welcomePageText2"> Browse Esty listings by category! </div>
                        <img src={"../../../images/lavender.jpg"} alt="lavender" className={"contentImage shadow welcomePageImageHide" }/>  
                    </div>       
    }
}

export default WelcomePage;

