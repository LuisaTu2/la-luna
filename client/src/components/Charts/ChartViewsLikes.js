import React, { Component } from "react";
import ReactDOM from "react-dom";
// import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
import PieChart from 'react-minimal-pie-chart';


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
                <PieChart data={[ { title: 'One', value: 10, color: '#E38627' },
                                { title: 'Two', value: 15, color: '#C13C37' },
                                { title: 'Three', value: 20, color: '#6A2135' },
                                ]}
                            label
                            labelStyle={{
                                fontSize: '5px',
                                fontFamily: 'sans-serif',
                                fill: '#121212'
                            }}      
                                />;
                {/* <PieChart data={views}/>; */}
                {/* <VictoryPie data={views} colorScale={colors} style={{ labels:{fontSize:20}} }/>
                <VictoryPie data={likes} colorScale={colors} style={{ labels:{fontSize:20}} }/>
                <VictoryLegend title="Views and Likes" 
                               centerTitle x={10} y={10} 
                               itemsPerRow={2} orientation={"horizontal"} 
                               style={{ title: {fontSize:32 }, labels:{fontSize:18} }} 
                               data={legendData} /> */}
            </div>
        )
    }
}


export default ChartViewsLikes;

