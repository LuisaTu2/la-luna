import React, { Component } from "react";
import ReactDOM from "react-dom";
import WelcomePage from "./Pages/WelcomePage"
import LastPage from "./Pages/LastPage"
import Images from "./Images/Images";
import AnalyticsPage from "./Pages/AnalyticsPage";
import Menu from "./Menu/Menu";
import Footer from "./Footer/Footer";
import ClickOutsideAlerter from "../ClickOutsideAlerter/ClickOutsideAlerter";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            imagesURL: [],  // set of images to be displayed
            images: [],     // all images retrieved
            showComponents: [1, 0, 0, 0],   // [isWelcomePage, isLastPage, isContentActive, isAnalytics]
            hidePaginationButtons: true,
            disablePaginationButtons: [1, 0],
            firstPageIx: 1,
            isChecked: false,
            values:[["craft_supplies","Craft Supplies and Tools"], 
                    ["jewelry","Jewelry"],
                    ["clothing","Clothing"],
                    ["home_living","Home and Living"],
                    ["art_collectibles","Art and Collectibles"], 
                    ["weddings","Weddings"],
                    ["analytics", "Analytics"]],
        };

        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.updateImages = this.updateImages.bind(this);
        this.getTaxonomyData = this.getTaxonomyData.bind(this);
        this.setTaxonomyData = this.setTaxonomyData.bind(this);
        this.getAnalyticsData = this.getAnalyticsData.bind(this);
        this.getHomePage = this.getHomePage.bind(this);
    };

    checkboxHandler(){  
        // console.log("FIRING CHECKBOX HANDLER");
        let isCheckedFlag = !this.state.isChecked;
        this.setState({
            isChecked: isCheckedFlag    
        })
    }


    paginationHandler(v){            
        if( this.state.showComponents[2] ){
            let newNextPage = (this.state.firstPageIx + 9 ) > this.state.images.length ? this.state.firstPageIx : (this.state.firstPageIx + 10);
            let newPageIx = v === "next" ? newNextPage : Math.max(this.state.firstPageIx - 10, 1);
            // old  logic: let newPageIx = v === "next" ? Math.min(this.state.firstPageIx + 10, this.state.images.length ) : Math.max(this.state.firstPageIx - 10, 1);
            this.setState({
                firstPageIx: newPageIx,
                hidePaginationButtons: false
            }, this.updateImages)
        } else if (this.state.showComponents[0] || this.state.showComponents[1] || this.state.showComponents[3]){
            this.setState({
                hidePaginationButtons: true
            })
        }    
    } //end of paginationHandler function


    updateImages(){
        let firstPage = this.state.firstPageIx;
        let disablePaginationButtonsFlag;
        // let lastPage = Math.min(firstPage + 10, this.state.images.length);  
        let lastPage = firstPage + 10;
        let imagesURLUpdated = this.state.images.slice(firstPage - 1, lastPage - 1);

        if ( lastPage >= this.state.images.length && firstPage !== 1){
            disablePaginationButtonsFlag = [0, 1];
        } else if ( firstPage === 1 ){
            disablePaginationButtonsFlag = [1, 0];
        } else if ( lastPage < this.state.images.length && firstPage > 1 ){
            disablePaginationButtonsFlag = [0, 0];
        } else {
            disablePaginationButtonsFlag = [0, 0];
        }

        this.setState({
            firstPageIx: firstPage,
            imagesURL: imagesURLUpdated,
            // showComponents: [0, 0, 1, 0],
            hidePaginationButtons: false,
            disablePaginationButtons: disablePaginationButtonsFlag
        })
    }

    getTaxonomyData(selection){
        this.checkboxHandler();
        this.setState({
            firstPageIx: 1,
            showComponents: [0, 0, 1, 0]
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
                // console.log("Data retrieved from Ajax POST call: ", data, status, jqXHR);
                self.setTaxonomyData(data);
            }           
        }); // End of $.ajax call  
    }; // end of getTaxonomyData function


    setTaxonomyData(dataJSON){
        let listings = JSON.parse(dataJSON);
        let imagesAll = [];
        listings.forEach( listing => {
            let imgArr = listing.Images;
            let imgTitle = listing.title.toLowerCase().split(" ").slice(0, 1).join(" ");
            let img = [imgArr[0].url_170x135, imgTitle];
            imagesAll.push(img);
        });
        console.log(imagesAll.length);
        this.setState({
                images:imagesAll
            }, this.updateImages)
    }; // end of setTaxonomyData function

    getAnalyticsData(selection){
        this.checkboxHandler();
        this.setState({
            showComponents: [0, 0, 0, 1], 
            hidePaginationButtons: true
        })
    }

    getHomePage(){
        this.setState({
            showComponents: [1, 0, 0, 0],
            imagesURL: [],
            hidePaginationButtons: true
        })
    }
     

    render() {
        let callbackFunctions = [this.getTaxonomyData, this.getAnalyticsData];
        let contentAnalyticsStyle = this.state.showComponents[3] ? "contentAnalyticsStyle" : "";

        return (
            <div id="app" >           
                <div id="header">  
                    { 
                        this.state.isChecked ? 
                        <ClickOutsideAlerter clickAlert={this.checkboxHandler}>
                            <Menu   isMenuChecked={this.state.isChecked} 
                                    onChangeHandler={this.checkboxHandler} 
                                    menuItems={this.state.values}  
                                    callbacks={callbackFunctions} /> 
                        </ClickOutsideAlerter>
                        : 
                        <Menu   isMenuChecked={this.state.isChecked} 
                                onChangeHandler={this.checkboxHandler} 
                                menuItems={this.state.values}  
                                callbacks={callbackFunctions} /> 
                    }
                    <div id="pageTitle" onClick={this.getHomePage}>La Luna</div>
                </div>

                <div className={"content " + contentAnalyticsStyle}>
                    { this.state.showComponents[0] ? <WelcomePage />  : null}
                    { this.state.showComponents[1] ? <LastPage /> : null }
                    { this.state.showComponents[2] ? <Images imagesURLArr={this.state.imagesURL} /> : null}
                    { this.state.showComponents[3] ? <AnalyticsPage /> : null }
                    <Footer pagHandler={ this.paginationHandler } 
                            hideBtns={ this.state.hidePaginationButtons }
                            disableBtns={ this.state.disablePaginationButtons } 
                            />
                </div>

            </div>
        )
    }
}


export default App;