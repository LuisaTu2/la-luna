import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChartColors from "../Charts/ChartColors";
import ChartViewsLikes from "../Charts/ChartViewsLikes";
import ChartGeo from "../Charts/ChartGeo";

class AnalyticsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showComponents : [0, 0, 0],
            viewsLikes: [],
            plotData: {},
            colors: [ "#EFBCD5", "#4B4644", "#38B3A2", "#0795C7", "#F8E963", "#FF8B4C",
                      "#FF4255", "#2E294E", "#E63DCF", "#131200", "#78BC61", "#79D507", "#FFEDE1"]
        }
        
        this.ajaxRequest = this.ajaxRequest.bind(this);
        this.setTaxonomyData = this.setTaxonomyData.bind(this);
        this.setViewsLikesData = this.setViewsLikesData.bind(this);
        this.queryGeo = this.queryGeo.bind(this);
    }


    ajaxRequest(){
        let queryData = {"selection": event.target.value};
        let callback; let s = queryData.selection;
        if(s === "taxonomy_color"){
            callback = this.setTaxonomyData;
        } else if ( s === "views_likes_taxonomy" ){
            callback = this.setViewsLikesData;
        }
        $.ajax({
            type: "POST",
            url: "/data_analytics",
            data: JSON.stringify(queryData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, status, jqXHR){
                console.log("Data received from Ajax Request: ", status);//, jqXHR);
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
            showComponents: [1, 0, 0]
        })
    } // end of setTaxonomyData


    setViewsLikesData(d){
        let plotData = JSON.parse(d);
        let taxonomy = Object.keys(plotData.data[0]).sort();
        let views = []; let likes = []; let indexColor = {};
        taxonomy.forEach( (t, ix) => {
            let index = ix + 1; let c = this.state.colors[ix];
            views.push(plotData.data[0][t]);
            likes.push(plotData.data[1][t]);
            indexColor[index] = [c, t];
        });
        let vl = [views, likes, taxonomy];
        // console.log(vl);
        this.setState({
            showComponents: [0, 1, 0],
            viewsLikes: vl
        })
    }

    queryGeo(){
        console.log(event.target.value);
        this.setState({
            showComponents: [0, 0, 1]
        })
    }

    
    render() {
       
        return (
                <div className="analyticsContainer"> 
                    <div className="analyticsButtonsContainer" >
                        <button onClick={this.ajaxRequest} value="taxonomy_color" className="analyticsButton"> category by color </button>
                        <button onClick={this.ajaxRequest} value="views_likes_taxonomy" className="analyticsButton"> views and likes </button>
                        <button onClick={this.queryGeo} value="usersGeo" className="analyticsButton"> users geographical distribution </button>
                    </div>
                    { this.state.showComponents[0] ? <ChartColors plottingData={this.state.plotData}/> : null }
                    { this.state.showComponents[1] ? <ChartViewsLikes vlData={this.state.viewsLikes}/> : null }
                    { this.state.showComponents[2] ? <ChartGeo /> : null }
                </div>
        )
    }
}


export default AnalyticsPage;
