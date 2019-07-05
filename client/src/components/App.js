import React, { Component } from "react";
import ReactDOM from "react-dom";
import WelcomePage from "./Pages/WelcomePage"
import LastPage from "./Pages/LastPage"
import Images from "./Images/Images";
import AnalyticsPage from "./Pages/AnalyticsPage";
import Menu from "./Menu/Menu";
import Footer from "./Footer/Footer";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            imagesURL: [], // set of images to be displae
            images:[], // all images retrieved
            showComponents: [1, 0, 0, 0], //[isWelcomePage, isLastPage, isContentActive, isAnalytics]
            firstPageIx: 1,
            isChecked: false,
            isPaginationButtonFrozen: [false, false],
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
        this.showNewComponents = this.showNewComponents.bind(this);
    };

    checkboxHandler(){     
        let isCheckedFlag = !this.state.isChecked;
        this.setState({
            isChecked: isCheckedFlag    
        })
    }

    paginationHandler(v){
        
        let newShowComponents = [];
        let prevBtnFrozenFlag;
        let nextBtnFrozenFlag;
        console.log(v, this.state.showComponents, this.state.images.length, this.state.imagesURL.length, this.state.firstPageIx);       

        if(this.state.showComponents[0] && v === "next"){
            this.showNewComponents([0, 1, 0, 0]);
        } else if( this.state.showComponents[1] && v === "previous"){
            this.showNewComponents([1, 0, 0, 0]);
        } else if( this.state.showComponents[2] ){
            let newNextPage = (this.state.firstPageIx + 10 ) >= this.state.images.length ? this.state.firstPageIx : (this.state.firstPageIx + 10);
            let newPageIx = v === "next" ? newNextPage : Math.max(this.state.firstPageIx - 10, 1);
            // let newPageIx = v === "next" ? Math.min(this.state.firstPageIx + 10, this.state.images.length ) : Math.max(this.state.firstPageIx - 10, 1);
            this.setState({
                firstPageIx: newPageIx
            }, this.updateImages)

        } else {
            console.log("FREEZE!");
            this.setState({
                isPaginationButtonFrozen: true,
            })
        }       
    } //end of paginationHandler function

    showNewComponents(c){
        this.setState({
            showComponents: c
        })
    }

    updateImages(){
        let firstPage = this.state.firstPageIx;
        // let lastPage = Math.min(firstPage + 10, this.state.images.length);
        
        let lastPage = firstPage + 10;
        let imagesURLUpdated = this.state.images.slice(firstPage - 1, lastPage - 1);
        if(imagesURLUpdated.length === 0){
            this.setState({
                firstPageIx: firstPage,
                imagesURL: imagesURLUpdated,
                showComponents: [0, 1, 0, 0]
            })
        } else {
            this.setState({
                firstPageIx: firstPage,
                imagesURL: imagesURLUpdated,
                showComponents: [0, 0, 1, 0]
            }, () => {
                console.log(this.state.imagesURL);
            })    
        } 
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
            // console.log(listing);
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
            showComponents: [0, 0, 0, 1]
        })
    }

    getHomePage(){
        // console.log("Getting home page!", this.state.showComponents);
        this.setState({
            showComponents: [1, 0, 0, 0],
            imagesURL: []
        })
    }
     

    render() {
        let callbackFunctions = [this.getTaxonomyData, this.getAnalyticsData];

        return (
            <div id="app">           
                <div id="header">  
                    <Menu   isMenuChecked={this.state.isChecked} onChangeHandler={this.checkboxHandler} 
                            menuItems={this.state.values}  callbacks={callbackFunctions} />          
                    <div id="pageTitle" onClick={this.getHomePage}>La Luna</div>
                </div>

                <div className="content">
                    { this.state.showComponents[0] ? <WelcomePage />  : null}
                    { this.state.showComponents[1] ? <LastPage /> : null }
                    { this.state.showComponents[2] ? <Images imagesURLArr={this.state.imagesURL} /> : null}
                    { this.state.showComponents[3] ? <AnalyticsPage /> : null }
                    <Footer ispagBtnFrozen={this.state.isPaginationButtonFrozen} pagHandler={this.paginationHandler} />
                </div>

            </div>
        )
    }
}

// ReactDOM.render(<App />, document.getElementById('root'));
export default App;




