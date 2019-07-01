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
        const ixs = this.props.vlData[3];
        const legendData = [];
        taxonomy.forEach( t => {
            let legendDatum = {name: t, symbol: {fill: "tomato"}};
            legendData.push(legendDatum);
        });
        console.log(taxonomy.length);
        const colors = ["#d5f4e6"];

        return (
            <div className="chartTaxonomyViewsLikesContainer"> 
                <VictoryPie data={views} colorScale={["#d5f4e6"]} />
                <VictoryPie data={likes} colorScale="blue"/>
                <VictoryLegend title="Views and Likes" colorScale="blue" centerTitle itemsPerRow={3} orientation={"vertical"} style={{ title: {fontSize: 20 } }} data={legendData} />
            </div>
        )
    }
}


export default ChartTaxonomyViewsLikes;

