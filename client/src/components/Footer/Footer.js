import React, { Component } from "react";
import ReactDOM from "react-dom";
import"./Footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        let prevClick = this.props.pagHandler.bind(this, "previous");
        let nextClick = this.props.pagHandler.bind(this, "next");
        let disableStylePrevious = this.props.disableBtns[0] ? " disablePaginationButton" : "";
        let disableStyleNext = this.props.disableBtns[1] ? " disablePaginationButton" : "";
        // console.log("Hide buttons", this.props.hideBtns, "\nDisable buttons props",  this.props.disableBtns, "\nPrev", disableStylePrevious, "\nNext", disableStyleNext);

        return (
            <div id="footer">
                {   this.props.hideBtns ? "" : 
                    <div className="paginationContainer"> 
                                <a href="#" className={"paginationBtn previous round" + disableStylePrevious} onClick={prevClick} >&#8249;</a>
                                <a href="#" className={"paginationBtn next round" + disableStyleNext} onClick={nextClick}>&#8250;</a>                    
                    </div>
                }   
                <div className="footerText"> Crafted by LuisaTu2 </div>
            </div>  
        )
    }
}


export default Footer;