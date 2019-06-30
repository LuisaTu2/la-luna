import React, { Component } from "react";
import ReactDOM from "react-dom";
import Images from "./components/Images";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            imagesURL: ["../images/lavender.jpg", "../images/lavender.jpg"], // "../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg","../images/lavender.jpg"],
            images:[],
            isWelcomePage: true,
            isLastPage: false,
            firstPageIx: 1,
            checkbox: false,
            values:[["craft_supplies","Craft Supplies and Tools"], 
                    ["jewelry","Jewelry"],
                    ["clothing","Clothing"],
                    ["home_living","Home and Living"],
                    ["art_collectibles","Art and Collectibles"], 
                    ["accessories","Accessories"]],
        };

        this.submitData = this.submitData.bind(this);
        this.processData = this.processData.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.updateImages = this.updateImages.bind(this);
    };

    checkboxHandler(){
        let isChecked = !this.state.checkbox;
        this.setState({
            checkbox: isChecked
        })
    }

    paginationHandler(v){
        let newPageIx = v === "next" ? Math.min(this.state.firstPageIx + 10, this.state.images.length) : Math.max(this.state.firstPageIx - 10, 1);
        // if(v === "next"){
        //     newPageIx = Math.min(this.state.firstPageIx + 10, this.state.images.length);
        // } else if(v === "previous"){
        //     newPageIx = Math.max(this.state.firstPageIx - 10, 1);
        // }  
        this.setState({
            firstPageIx: newPageIx
        }, this.updateImages);
    }

    updateImages(){
        let isLastPageFlag = false; 
        let firstPage = this.state.firstPageIx;
        let lastPage = Math.min(firstPage + 10, this.state.images.length);
        let imagesURLUpdated = this.state.images.slice(firstPage, lastPage);
        if(imagesURLUpdated.length === 0){
            imagesURLUpdated = ["../images/cat_yarn.jpg"];
            isLastPageFlag = true;
        }
        this.setState({
            firstPageIx: firstPage,
            imagesURL: imagesURLUpdated,
            isLastPage : isLastPageFlag
        })    
    }

    submitData(selection){
        this.checkboxHandler();
        this.setState({
            firstPageIx: 1,
            isWelcomePage: false
        });
        let userData = {"taxonomy": selection};
        let self = this;
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
        let imagesAll = [];
        listings.forEach( listing => {
            let imgArr = listing.Images;
            imagesAll.push(imgArr[0].url_fullxfull);
        });
        console.log(imagesAll.length);
        this.setState({
                images:imagesAll
            }, this.updateImages)
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
                                {   this.state.values.map( v => {
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
                    { this.state.isLastPage ? <div className="lastPageText"> You have reached the last page! </div> : null }
                    <Images imagesURLArr={this.state.imagesURL} isWelcomePageImages={this.state.isWelcomePage} isLastPageImages={this.state.isLastPage}/>
                    <div id="footer">
                        <div className="paginationContainer">
                            <a href="#" className="paginationBtn previous round" onClick={this.paginationHandler.bind(this, "previous")} >&#8249;</a>
                            <a href="#" className="paginationBtn next round" onClick={this.paginationHandler.bind(this, "next")}>&#8250;</a>
                        </div>
                        <div className="footerText"> Crafted by LuisaTu2 </div>
                    </div> 
                </div>

            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



