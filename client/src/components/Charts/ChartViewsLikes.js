import React, { Component } from "react";
import ReactDOM from "react-dom";
import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';


class ChartViewsLikes extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const views = this.props.vlData[0];
        const likes = this.props.vlData[1];
        const taxonomy = this.props.vlData[2];
        const legendData = [];
        const colors = [ "#EFBCD5", "#4B4644", "#38B3A2", "#0795C7", "#F8E963", 
                         "#FF8B4C", "#FF4255", "#2E294E","#E63DCF","#131200",
                         "#78BC61", "#79D507", "#FFEDE1"
                        ];

        taxonomy.forEach( (t, ix) => {
            let legendDatumName = ix + 1 + " - " + t;
            let legendDatum = {name: legendDatumName, symbol: {fill: colors[ix]}};
            legendData.push(legendDatum);
        });        

        return (
            <div className="chartTaxonomyViewsLikesContainer"> 
                <VictoryPie data={views} colorScale={colors} style={{ labels:{fontSize:20}} }/>
                <VictoryPie data={likes} colorScale={colors} style={{ labels:{fontSize:20}} }/>
                <VictoryLegend title="Views and Likes" 
                               centerTitle x={10} y={10} 
                               itemsPerRow={2} orientation={"horizontal"} 
                               style={{ title: {fontSize:32 }, labels:{fontSize:18} }} 
                               data={legendData} />
            </div>
        )
    }
}


export default ChartViewsLikes;

