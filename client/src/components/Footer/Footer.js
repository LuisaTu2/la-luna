import React, { Component } from "react";
import ReactDOM from "react-dom";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let isbtnFrozen = this.props.isBtnFrozen;
        console.log(isBtnFrozen);
        let prevClick = isbtnFrozen ? null : this.props.pagHandler.bind(this, "previous");
        let nextClick = isbtnFrozen ? null : this.props.pagHandler.bind(this, "next");

        return (
            <div id="footer">
                <div className="paginationContainer">
                    <a href="#" className="paginationBtn previous round" onClick={prevClick} >&#8249;</a>
                    <a href="#" className="paginationBtn next round" onClick={nextClick}>&#8250;</a>
                    {/* <a href="#" className="paginationBtn previous round" onClick={this.props.pagHandler} dir={this.props.direction} >&#8249;</a>
                    <a href="#" className="paginationBtn next round" onClick={this.props.pagHandler} dir={this.props.direction}>&#8250;</a> */}
                </div>
                <div className="footerText"> Crafted by LuisaTu2 </div>
            </div>  
        )
    }
}


export default Footer;