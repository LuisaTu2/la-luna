import React, { Component } from "react";
import ReactDOM from "react-dom";
import WelcomePage from "./components/Pages/WelcomePage"
import LastPage from "./components/Pages/LastPage"
import Images from "./components/Images/Images";
import AnalyticsPage from "./components/Pages/AnalyticsPage";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            imagesURL: [], 
            images:[],
            showComponents: [1, 0, 0, 0], //[isWelcomePage, isLastPage, isContentActive, isAnalytics]
            firstPageIx: 1,
            isChecked: false,
            values:[["craft_supplies","Craft Supplies and Tools"], 
                    ["jewelry","Jewelry"],
                    ["clothing","Clothing"],
                    ["home_living","Home and Living"],
                    ["art_collectibles","Art and Collectibles"], 
                    ["accessories","Accessories"],
                    ["analytics", "Analytics"]],
        };

        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.paginationHandler = this.paginationHandler.bind(this);
        this.updateImages = this.updateImages.bind(this);
        this.getTaxonomyData = this.getTaxonomyData.bind(this);
        this.setTaxonomyData = this.setTaxonomyData.bind(this);
        this.getAnalyticsData = this.getAnalyticsData.bind(this);
    };

    checkboxHandler(){     
        let isCheckedFlag = !this.state.isChecked;
        this.setState({
            isChecked: isCheckedFlag    
        })
    }

    paginationHandler(v){
        if(this.state.isAnalytics){
            return
        } else {
            if( v === "previous" && this.state.images.length === 0 ) {
                this.setState({
                    showComponents: [1, 0, 0, 0]               
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
            })
        } else {
            this.setState({
                firstPageIx: firstPage,
                imagesURL: imagesURLUpdated,
                showComponents: [0, 0, 1, 0]
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
                // console.log("RETRIEVED DATA: ", data, status, jqXHR);
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
            let img = [imgArr[0].url_75x75, imgTitle];
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


    render() {
        let callbackFunctions = [this.getTaxonomyData, this.getAnalyticsData];

        return (
            <div id="app">
                <div id="header">  
                    <Menu   isMenuChecked={this.state.isChecked} onChangeHandler={this.checkboxHandler} 
                            menuItems={this.state.values}  callbacks={callbackFunctions} />          
                    <div id="pageTitle">La Luna</div>
                </div>

                <div id="content">
                    { this.state.showComponents[0] ? <WelcomePage />  : null}
                    { this.state.showComponents[1] ? <LastPage /> : null }
                    { this.state.showComponents[2] ? <Images imagesURLArr={this.state.imagesURL} /> : null}
                    { this.state.showComponents[3] ? <AnalyticsPage /> : null }
                   
                    <Footer pagHandler={this.paginationHandler}/>
                </div>

            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



