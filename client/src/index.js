import React, { Component } from "react";
import ReactDOM from "react-dom";
import WelcomePage from "./components/Pagination/WelcomePage"
import LastPage from "./components/Pagination/LastPage"
import Images from "./components/Images/Images";
import Analytics from "./components/Analytics";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            imagesURL: [], 
            images:[],
            showComponents: [1, 0, 0, 0], //[isWelcomePage, isLastPage, isContentActive, isAnalytics]
            // isWelcomePage: true,
            // isContentActive: false, 
            // isLastPage: false,
            // isAnalytics: false, 
            firstPageIx: 1,
            checkbox: false,
            values:[["craft_supplies","Craft Supplies and Tools"], 
                    ["jewelry","Jewelry"],
                    ["clothing","Clothing"],
                    ["home_living","Home and Living"],
                    ["art_collectibles","Art and Collectibles"], 
                    ["accessories","Accessories"],
                    ["analytics", "Analytics"]],
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
        if(this.state.isAnalytics){
            return
        } else {
            if( v === "previous" && this.state.images.length === 0 ) {
                this.setState({
                    showComponents: [1, 0, 0, 0]
                    // isLastPage: false,
                    // isWelcomePage: true                
                })
            } else {
                let newPageIx = v === "next" ? Math.min(this.state.firstPageIx + 10, this.state.images.length) : Math.max(this.state.firstPageIx - 10, 1);
                this.setState({
                    firstPageIx: newPageIx
                }, this.updateImages)
            };
        }
    }

    updateImages(){
        let isLastPageFlag = false; 
        let firstPage = this.state.firstPageIx;
        let lastPage = Math.min(firstPage + 10, this.state.images.length);
        let imagesURLUpdated = this.state.images.slice(firstPage, lastPage);
        if(imagesURLUpdated.length === 0){
            imagesURLUpdated = [["../images/cat_yarn.jpg", "yarn cat"]];
            isLastPageFlag = true;
            this.setState({
                firstPageIx: firstPage,
                imagesURL: imagesURLUpdated,
                showComponents: [0, 1, 0, 0]
                // isLastPage : true,
                // isContentActive:false,
                // isWelcomePage:false, 
                // isAnalytics: false
            })
        } else {
            this.setState({
                firstPageIx: firstPage,
                imagesURL: imagesURLUpdated,
                showComponents: [0, 0, 1, 0]
                // isLastPage : false,
                // isContentActive: true,
                // isWelcomePage: false, 
                // isAnalytics: false
            })    
        } 
    }

    submitData(selection){
        this.checkboxHandler();
        this.setState({
            firstPageIx: 1,
            isWelcomePage: false
        });
        if(selection === "analytics"){
            this.setState({
                showComponents: [0, 0, 0, 1]
            })
        } else {
            this.setState({
                showComponents: [0, 0, 1, 0]
            })
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
        }
    }; // end of submitData function


    processData(dataJSON){
        let listings = JSON.parse(dataJSON);
        let imagesAll = [];
        listings.forEach( listing => {
            let imgArr = listing.Images;
            let imgTitle = listing.title.toLowerCase().split(" ").slice(0, 1).join(" ");
            let img = [imgArr[0].url_75x75, imgTitle];
            imagesAll.push(img);
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
                                        let analyticsStyle = v[0] === "analytics" ? ".menuItemAnalytics" : "";
                                        return  <a href="#" onClick={this.submitData.bind(this, val)} className={"menuItem " + analyticsStyle }><li>{menuItemHTML}</li></a>
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                    <div id="pageTitle">La Luna</div>
                </div>

                <div id="content">
                    { this.state.showComponents[0] ? <WelcomePage />  : null}
                    { this.state.showComponents[1] ? <LastPage/> : null }
                    { this.state.showComponents[2] ? <Images imagesURLArr={this.state.imagesURL} isWelcomePageImages={this.state.isWelcomePage} isLastPageImages={this.state.isLastPage}/>  : null}
                    { this.state.showComponents[3] ? <Analytics /> : null }
                   
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



