import React, { Component } from "react";
import ReactDOM from "react-dom";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let prevClick = this.props.pagHandler.bind(this, "previous");
        let nextClick = this.props.pagHandler.bind(this, "next");
        console.log("hide and disablebtns", this.props.hideBtns, this.props.disableBtns);
        let disableStylePrevious = this.props.disableBtns[0] ? " disablePaginationBtn" : "";
        let disableStyleNext = this.props.disableBtns[1] ? " disablePaginationBtn" : "";

        return (
            <div id="footer">

                    {   this.props.hideBtns ? 
                        "" : 
                        <div className="paginationContainer"> 
                            <a href="#" className={"paginationBtn previous round" + disableStylePrevious} onClick={prevClick} >&#8249;</a>
                            <a href="#" className={"paginationBtn next round" + disableStyleNext} onClick={nextClick}>&#8250;</a>
                        </div>
                    }
                   
                    {/* <a href="#" className="paginationBtn previous round" onClick={this.props.pagHandler} dir={this.props.direction} >&#8249;</a>
                    <a href="#" className="paginationBtn next round" onClick={this.props.pagHandler} dir={this.props.direction}>&#8250;</a> */}
                <div className="footerText"> Crafted by LuisaTu2 </div>
            </div>  
        )
    }
}


export default Footer;