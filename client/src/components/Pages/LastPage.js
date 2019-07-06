import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./LastPage.css";

class LastPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return  <div className="lastPageContainer"> 
                    <div className="lastPageText"> You have reached the last page! </div> 
                    <img src={"../../../images/cat_yarn.jpg"} alt="cat_yarn" className={"contentImage shadow"}/> 
                </div>
    }
}

export default LastPage;

