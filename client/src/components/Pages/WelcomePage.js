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
                        <div className="welcomePageText2"> Browse Esty listings by category </div>
                        <span className="welcomePageImages">
                            <img src={"../../../images/lavender.jpg"} alt="lavender" className={"contentImage shadow welcomePageWeb" }/>  
                            <img src={"../../../images/yellow_flowers.jpg"} alt="yellow_flowers" className={"welcomePageImageHide welcomePageWeb" }/>  
                            <img src={"../../../images/poppy_flowers.jpg"} alt="poppy_flowers" className={"welcomePageImageHide welcomePageWeb" }/>  
                        </span>
                    </div>       
    }
}

export default WelcomePage;

