import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChartColors from "../Charts/ChartColors";
import ChartViewsLikes from "../Charts/ChartViewsLikes";
import ChartGeo from "../Charts/ChartGeo";


class AnalyticsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponents : [1, 0, 0, 0],
            viewsLikes: [],
            plotData: {},
            getData: [],
            fetchingData: false, 
            colors: [ "#EFBCD5", "#4B4644", "#38B3A2", "#0795C7", "#F8E963", "#FF8B4C",
                      "#FF4255", "#2E294E", "#E63DCF", "#131200", "#78BC61", "#79D507", "#FFEDE1"]
        }
        
        this.showFirstAnalytics = this.showFirstAnalytics.bind(this);
        this.ajaxRequest = this.ajaxRequest.bind(this);
        this.setTaxonomyData = this.setTaxonomyData.bind(this);
        this.setViewsLikesData = this.setViewsLikesData.bind(this);
        this.queryGeo = this.queryGeo.bind(this);
    }

    showFirstAnalytics(){
        this.setState({
            showComponents: [1, 0, 0, 0]
        })
    }

    ajaxRequest(){
        this.setState({
            fetchingData : true,
            showComponents: [0, 0, 0, 0]
        })
        console.log("Before Ajax Request: ", "\n", this.state.plotData,"\n", this.state.viewsLikes, "\n", this.state.showComponents)
        let queryData = {"selection": event.target.value};
        let callback; let s = queryData.selection;
        if(s === "taxonomy_color"){
            callback = this.setTaxonomyData;
        } else if ( s === "views_likes_taxonomy" ){
            callback = this.setViewsLikesData;
        }
        let self = this;
        $.ajax({
            type: "POST",
            url: "/data_analytics",
            data: JSON.stringify(queryData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, status, jqXHR){
                console.log("Data received from Ajax Request: ", status,"\n", self.state.plotData,"\n", self.state.viewsLikes, "\n", self.state.showComponents);//, jqXHR);
                callback(data);
            }           
        }); // End of $.ajax call 
    } // end of ajaxRequest function


    setTaxonomyData(data){
        let tcmap = {};
        let tcData = JSON.parse(data);
        tcData.forEach( t => {
            let taxonomy = t.taxonomy_path[0];
            let hexcode = "#" + t.Images[0].hex_code;
            if(tcmap[taxonomy]){
                tcmap[taxonomy].push(hexcode);
            } else {
                tcmap[taxonomy] = [hexcode];
            }
        });
        
        this.setState({
            plotData: tcmap,
            // viewsLikes: [],
            // getData: [],
            showComponents: [0, 1, 0, 0],
            fetchingData: false
        })
    } // end of setTaxonomyData


    setViewsLikesData(d){
        console.log("DATA FROM setVIEWS LIKES" , d);
        let viewsLikesData = JSON.parse(d);
        let taxonomy = Object.keys(viewsLikesData.data[0]).sort();
        let views = []; let likes = []; let indexColor = {};
        taxonomy.forEach( (t, ix) => {
            let index = ix + 1; let c = this.state.colors[ix];
            views.push(viewsLikesData.data[0][t]);
            likes.push(viewsLikesData.data[1][t]);
            indexColor[index] = [c, t];
        });
        let vl = [views, likes, taxonomy];
        this.setState({
            viewsLikes: vl,
            // plotData: {},
            // getData: [],
            showComponents: [0, 0, 1, 0],
            fetchingData: false
        })
    }

    queryGeo(){
        console.log(event.target.value);    
        this.setState({
            showComponents: [0, 0, 0, 1]
            // viewsLikes: [],
            // plotData: {},
            // getData: [1],
        })
    }


    
    render() {
        let chartsLoader =  <div className="chartsLoader"> <img src="../../../images/spinner.gif" /> </div>;
     
        return (
                <div className="analyticsContainer"> 
                    <button onClick={this.showFirstAnalytics} className="analyticsButtonFirst"> Analytics </button>
                    <div className="analyticsButtonsContainer" >    
                        <button onClick={this.ajaxRequest} value="taxonomy_color" className="analyticsButton"> category by color </button>
                        <button onClick={this.ajaxRequest} value="views_likes_taxonomy" className="analyticsButton"> views and likes </button>
                        <button onClick={this.queryGeo} value="usersGeo" className="analyticsButton"> users geo distribution </button>
                    </div>
                    <div className="analyticsChartsContainer">
                        { this.state.fetchingData ? chartsLoader : null }
                        { this.state.showComponents[0] ? <span><div className="analyicsFirstPageText"> Explore Etsy data analysis! </div></span> : null }
                        { this.state.showComponents[1] ? <ChartColors plottingData={this.state.plotData}/> : null }
                        { this.state.showComponents[2] ? <ChartViewsLikes vlData={this.state.viewsLikes}/> : null }
                        { this.state.showComponents[3] ? <ChartGeo /> : null }
                    </div>
                </div>
        )
    }
}


export default AnalyticsPage;
