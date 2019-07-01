import React, { Component } from "react";
import ReactDOM from "react-dom";
import {VictoryPie, VictoryLegend} from 'victory';


class ChartTaxonomyViewsLikes extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const views = this.props.vlData[0];
        const likes = this.props.vlData[1];
        const taxonomy = this.props.vlData[2];
        const legendData = [];
        const colors = [ "#EFBCD5", "#FF8B4C", "#38B3A2", "#0795C7", "#F8E963", 
                         "#4B4644", "#FF4255", "#2E294E","#E63DCF","#131200",
                         "#78BC61", "#79D507", "#FFEDE1"
                        ];

        taxonomy.forEach( (t, ix) => {
            let legendDatumName = String(ix) + " - " + t;
            let legendDatum = {name: legendDatumName, symbol: {fill: colors[ix] }};
            legendData.push(legendDatum);
        });        

        return (
            <div className="chartTaxonomyViewsLikesContainer"> 
                <VictoryPie data={views} colorScale={colors} />
                <VictoryPie data={likes} colorScale={colors}/>
                <VictoryLegend title="Views and Likes" x={20} y={10} centerTitle itemsPerRow={2} orientation={"horizontal"} gutter={20} style={{ title: {fontSize: 20 } }} data={legendData} />
            </div>
        )
    }
}


export default ChartTaxonomyViewsLikes;

