import React, { Component } from "react";
import ReactDOM from "react-dom";


class WelcomePage extends Component {
    constructor(props){
        super(props);
    }
   
    render() {

            return <div className="welcomePageContainer"> 
                        <div className="welcomePageText"> SUMMER IS HERE! </div> 
                        <img src={"../../../images/lavender.jpg"} alt="lavender" className={"contentImage shadow" }/>  
                    </div>       
    }
}

export default WelcomePage;

