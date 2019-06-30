import React, { Component } from "react";
import ReactDOM from "react-dom";
import Images from "./components/Images";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            imagesURL: ["../images/lavender.jpg", "../images/lavender.jpg", "../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg"],
            itemsPerPage:10,
            selection:"craft_supplies",
            firstPageIx: 1,
            checkbox: false,
            values:[["craft_supplies","Craft Supplies and Tools"], 
                    ["jewelry","Jewelry"],
                    ["clothing","Clothing"],
                    ["home_living","Home and Living"],
                    ["art_collectibles","Art and Collectibles"], 
                    ["accessories","Accessories"]]
        };

        this.submitData = this.submitData.bind(this);
        this.processData = this.processData.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
    };

    checkboxHandler(){
        console.log("FIRED CHECKBOX HANDLER", this.state.checkbox);
        let isChecked = !this.state.checkbox;
        this.setState({
            checkbox: isChecked
        })
    }

    paginationHandler(v){
        alert("Hello! ", v);
    }

    submitData(d){
        this.checkboxHandler();
        let taxonomy = d;
        let userData = {"taxonomy": taxonomy};
        let self = this;
        console.log(userData);
        $.ajax({
            type: "POST",
            url: "/data",
            data: JSON.stringify(userData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, status, jqXHR){
                // console.log("RETRIEVED DATA: ", data, status, jqXHR);
                self.processData(data);
            }           
        }); // End of $.ajax call  
    }; // end of submitData function


    processData(dataJSON){
        let listings = JSON.parse(dataJSON);
        let images = [];
        listings.forEach( listing => {
            let imgArr = listing.Images;
            images.push(imgArr[0].url_fullxfull);
        });
        let lastPageIx = this.state.firstPageIx + 11;
        let imagesURLUpdated =  images.slice(this.state.firstPageIx, lastPageIx);
        this.setState({
            imagesURL: imagesURLUpdated
        })
    }; // end of processData function

    render() {

        return (
            <div id="app">
                <div id="header">            
                    <nav role="navigation">
                        <div id="menuToggle">
                            <input type="checkbox" checked={this.state.checkbox} onChange={this.checkboxHandler}/>       
                            <span></span>
                            <span></span>
                            <span></span>
                            <ul id="menu">
                                {
                                    this.state.values.map( v => {
                                        let val = v[0]; let menuItemHTML = v[1];
                                        return  <a href="#" onClick={this.submitData.bind(this, val)} className="menuItem"><li>{menuItemHTML}</li></a>
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                    <div id="pageTitle">La Luna</div>
                </div>

                <div id="content">
                    <Images imagesURL={this.state.imagesURL} firstPageIx={this.state.firstPageIx}/>
                    <div id="footer">
                        <div className="paginationContainer">
                            <a href="#" className="paginationBtn previous round" onClick={this.paginationHandler.bind(this, -1)} >&#8249;</a>
                            <a href="#" className="paginationBtn next round" onClick={this.paginationHandler.bind(this, 1)}>&#8250;</a>
                            <p className="footerText"> Crafted by LuisaTu2 </p>
                        </div>
                    </div> 
                </div>

            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



