import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from "./Chart";
import ChartTaxonomyViewsLikes from "./ChartTaxonomyViewsLikes"
import ChartUsersGeo from "./ChartUsersGeo"

class Analytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plotData: {},
            showTaxonomyViewsLikes: false,
            ViewsLikes:[]
        }
        
        this.query = this.query.bind(this);
        this.taxonomyColorMapping = this.taxonomyColorMapping.bind(this);
        this.queryViewsLikes = this.queryViewsLikes.bind(this);
        this.plotTaxonomyViewsLikes = this.plotTaxonomyViewsLikes.bind(this);
    }

    query(){
        let queryData = {"selection":event.target.value};
        console.log(queryData);
        let self = this;
        $.ajax({
            type: "POST",
            url: "/data_analytics",
            data: JSON.stringify(queryData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, status, jqXHR){
                console.log("RETRIEVED DATA: ", status, jqXHR);
                self.taxonomyColorMapping(data);
            }           
        }); // End of $.ajax call  
    }

    taxonomyColorMapping(data){
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
            plotData: tcmap
        })

    }

    queryViewsLikes(){
        let queryData = {"selection":event.target.value};
        console.log(queryData);
        let self = this;
        $.ajax({
            type: "POST",
            url: "/data_analytics_views",
            data: JSON.stringify(queryData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, status, jqXHR){
                console.log("RETRIEVED DATA: ", data, status, jqXHR);
                self.plotTaxonomyViewsLikes(data);
            }           
        }); // End of $.ajax call 
    }

    plotTaxonomyViewsLikes(d){
        let plotData = JSON.parse(d);
        let taxonomy = Object.keys(plotData.data[0]).sort();
        let viewsDataArr = [];
        let likesDataArr = [];
        taxonomy.forEach( (t, ix) => {
            viewsDataArr.push({x: String(ix+1), y: plotData.data[0][t]});
            likesDataArr.push({x: String(ix+1), y: plotData.data[1][t]});
        });
        let views = viewsDataArr; 
        let likes = likesDataArr;
        let vl = [views, likes, taxonomy];
        this.setState({
            showTaxonomyViewsLikes: true,
            ViewsLikes: vl
        })
    }

    
    render() {
       
        return (
                <div className="analyticsContainer"> 
                    <button onClick={this.query} value="taxonomy_color"> Taxonomy vs Color </button>
                    <button onClick={this.queryViewsLikes} value="views_likes_taxonomy"> Views and Likes per Category </button>
                    <button value="usersGeo"> Users Geographical distribution </button>
                    <Chart plottingData={this.state.plotData}/>
                    { this.state.showTaxonomyViewsLikes ?  <ChartTaxonomyViewsLikes vlData={this.state.ViewsLikes}/> : null }
                    <ChartUsersGeo />
                </div>
        )
    }
}


export default Analytics;
