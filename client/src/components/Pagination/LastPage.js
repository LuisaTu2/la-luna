import React, { Component } from "react";
import ReactDOM from "react-dom";

class LastPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let conditional = !this.props.isWelcomePageImage && !this.props.isLastPageImage;
        return (
                <div className="lastPageContainer"> 
                    <div className="lastPageText"> You have reached the last page! </div> 
                    <img src={"../../../images/cat_yarn.jpg"} alt="cat_yarn" className={"contentImage" + (conditional ? " shadow" : "" ) }/> 
 
                </div>
        )
    }
}


export default LastPage;

