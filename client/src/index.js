import React, { Component } from "react";
import ReactDOM from "react-dom";
import Images from "./components/Images"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            imagesURL: ["../images/lavender.jpg", "../images/lavender.jpg", "../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg"],
            itemsPerPage:10,
            menuItem:"craft_supplies",
            firstPageIx: 1
        };

        this.submitData = this.submitData.bind(this);
        this.processData = this.processData.bind(this);
    };

    submitData(){
        let taxonomy = this.state.menuItem;
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
                console.log("RETRIEVED DATA: ", data, status, jqXHR);
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
        console.log("PROCESSED DATA: ", images);
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
                            <input type="checkbox" />
                            <span></span>
                            <span></span>
                            <span></span>
                            
                            <ul id="menu">
                                <a href="#" onClick={this.submitData} value={this.state.menuItem} className="menuItem"><li>Craft Supplies and Tools</li></a>
                                <a href="#" onClick={this.submitData} value="jewelry" className="menuItem"><li>Jewelry</li></a>
                                <a href="#" onClick={this.submitData} value="clothing" className="menuItem"><li>Clothing</li></a>
                                <a href="#" onClick={this.submitData} value="home_living" className="menuItem"><li>Home and Living</li></a>
                                <a href="#" onClick={this.submitData} value="art_collectibles" className="menuItem"><li>Art and Collectibles</li></a>
                                <a href="#" onClick={this.submitData} value="accessories" className="menuItem"><li>Accessories</li></a>
                            </ul>
                        </div>
                    </nav>
                    <div id="pageTitle">La Luna</div>
                </div>

                <div id="content">
                    <Images imagesURL={this.state.imagesURL} firstPageIx={this.state.firstPageIx}/>
                    <div id="footer">
                        Crafted by LuisaTu2
                    </div> 
                </div>

            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



