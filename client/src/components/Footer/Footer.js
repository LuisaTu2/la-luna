import React, { Component } from "react";
import ReactDOM from "react-dom";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {

        return (
            <div id="footer">
                <div className="paginationContainer">
                    <a href="#" className="paginationBtn previous round" onClick={this.props.pagHandler.bind(this, "previous")} >&#8249;</a>
                    <a href="#" className="paginationBtn next round" onClick={this.props.pagHandler.bind(this, "next")}>&#8250;</a>
                </div>
                <div className="footerText"> Crafted by LuisaTu2 </div>
            </div>  
        )
    }
}


export default Footer;