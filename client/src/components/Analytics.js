import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChartColors from "./Charts/ChartColors";
import ChartViewsLikes from "./Charts/ChartViewsLikes";
import ChartGeo from "./ChartGeo";

class Analytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTaxonomyColor: false, 
            showTaxonomyViewsLikes: false,
            showGeo :false, 
            ViewsLikes:[],
            plotData: {}
        }
        
        this.queryColors = this.queryColors.bind(this);
        this.taxonomyColorMapping = this.taxonomyColorMapping.bind(this);
        this.queryViewsLikes = this.queryViewsLikes.bind(this);
        this.plotTaxonomyViewsLikes = this.plotTaxonomyViewsLikes.bind(this);
        this.queryGeo = this.queryGeo.bind(this);
    }

    queryColors(){
        let queryData = {"selection":event.target.value};
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
            plotData: tcmap, 
            showTaxonomyColor: true, 
            showTaxonomyViewsLikes: false,
            showGeo: false, 
        })

    }

    queryViewsLikes(){
        let queryData = {"selection": event.target.value};
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
            showTaxonomyColor: false, 
            showTaxonomyViewsLikes: true,
            showGeo: false, 
            ViewsLikes: vl
        })
    }

    queryGeo(){
        console.log(event.target.value);
        this.setState({
            showTaxonomyColor: false, 
            showTaxonomyViewsLikes: false,
            showGeo: true, 
        })
    }

    
    render() {
       
        return (
                <div className="analyticsContainer"> 
                    <div className="analyticsButtonsContainer" >
                        <button onClick={this.queryColors} value="taxonomy_color" className="analyticsButton"> category by color </button>
                        <button onClick={this.queryViewsLikes} value="views_likes_taxonomy" className="analyticsButton"> views {String.fromCharCode( "f00f" )} likes </button>
                        <button onClick={this.queryGeo} value="usersGeo" className="analyticsButton"> users geographical distribution </button>
                    </div>
                    { this.state.showTaxonomyColor ? <ChartColors plottingData={this.state.plotData}/> : null }
                    { this.state.showTaxonomyViewsLikes ?  <ChartViewsLikes vlData={this.state.ViewsLikes}/> : null }
                    { this.state.showGeo ? <ChartGeo /> : null }
                </div>
        )
    }
}


export default Analytics;
