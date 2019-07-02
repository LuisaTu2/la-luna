import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactApexChart from 'react-apexcharts';
// import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory';
// import PieChart from 'react-minimal-pie-chart';


class ChartViewsLikes extends Component {
    constructor(props) {
        super(props);       
    }
    
    render() {

        let views = this.props.vlData[0]; 
        let likes = this.props.vlData[1]; 
        let taxonomy = this.props.vlData[2];
   
        const colors = [ "#EFBCD5", "#4B4644", "#38B3A2", "#0795C7", "#F8E963", 
                         "#FF8B4C", "#FF4255", "#2E294E","#E63DCF","#131200",
                         "#78BC61", "#79D507", "#FFEDE1"
                        ];
        
        let optViews = { chart:{ width: 300, height:300, animations: { enabled: true, easing: 'easeinout', speed: 800} },
                    labels: taxonomy, dataLabels: {enabled: false}, fill:{ colors: colors },
                    title: { text: "views per category", align:"center", margin: 10, style:{ fontSize: "22px", color:"#0c616e"} },
                    colors: colors,
                    responsive: [{  
                                    breakpoint: 300, 
                                    options: {  chart: { width: 400}, legend:{ show: false} }
                                }]
        };

        let optLikes = {
                        chart:{ width: 300, height:300, animations: { enabled: true, easing: 'easeinout', speed: 800} },
                        labels: taxonomy, dataLabels: {enabled: false}, fill:{ colors: colors },
                        title: { text: "likes per category", align:"center", margin: 10, style:{ fontSize: "22px", color:"#0c616e"} },
                        colors: colors,
                        responsive: [{  
                                        breakpoint: 300, 
                                        options: {  chart: { width: 400}, 
                                        legend: {fontSize:"16px", position: 'bottom', onItemClick: {toggleDataSeries: true},  horizontalAlign: 'left', itemMargin:{horizontal:5, vertical:10}} }
                                    }]
        };

        
        
        // let legendViews = { show: false};
        // let legendLikes = { show:true,  fontSize:"16px", position: 'bottom', onItemClick: {toggleDataSeries: true},  horizontalAlign: 'left', itemMargin:{horizontal:5, vertical:10}};
        
        // let optViews = JSON.parse(JSON.stringify(opt));
        // let optLikes = JSON.parse(JSON.stringify(opt));

        // optViews.title.text = "views per category";     
        // optViews.responsive[0].options.legend = legendViews; 
        // optLikes.title.text = "likes per category";
        // optLikes.responsive[0].options.legend = legendLikes;


        return (
            <div className="chartViewsLikesContainer"> 
                <ReactApexChart options={ optViews } series={ views } type="pie" width="360" />
                <ReactApexChart options={ optLikes } series={ likes } type="pie" width="360" />
  
                {/* <PieChart   data={views} label={"hello"} labelStyle={{ fontSize: "5px", fontFamily:"sans-serif", fill:"#121212" }} 
                            radius={42} labelPosition={112}
                            style={{width:"90%"}}
                            className="pieChart"
                            />;
                <PieChart data={likes}/>;
                <VictoryPie data={views} colorScale={colors} style={{ labels:{fontSize:20}} }/>
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

