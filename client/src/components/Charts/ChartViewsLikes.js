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
        let pieLegend =  {fontSize:"12px",color:"#0c616e", position: 'bottom', onItemClick: {toggleDataSeries: true},  horizontalAlign: 'left', itemMargin:{horizontal:5, vertical:5}};
   
        const colors = [ "#EFBCD5", "#4B4644", "#38B3A2", "#0795C7", "#F8E963", 
                         "#FF8B4C", "#FF4255", "#2E294E","#E63DCF","#131200",
                         "#78BC61", "#79D507", "#FFEDE1"
                        ];
        
        let optViews = { 
                        chart:{ width: 100, height:100, animations: { enabled: true, easing: 'easeinout', speed: 100, animateGradually:{enabled:true, delay:5000} }},
                        legend: {show:false}, colors: colors,
                        labels: taxonomy, dataLabels: {enabled: false}, fill:{ colors: colors },
                        title: { text: "views per category", align:"center", margin: 10, style:{ fontSize: "22px", color:"#0c616e"} },
                        responsive: [{
                            breakpoint: 200, 
                            options: {chart: { width: 200 }},
                        }]                        
        };

        let optLikes = { 
                        chart:{ width: 100, height:100, animations: { enabled: true, easing: 'easeinout', speed: 100, animateGradually:{enabled:true, delay:5000} }},
                        legend: {show: false}, colors: colors,
                        labels: taxonomy,
                        dataLabels: {enabled: false}, fill:{ colors: colors },
                        title: { text: "likes per category", align:"center", margin: 10, style:{ fontSize: "22px", color:"#0c616e"} },
                        responsive: [{
                            breakpoint: 200, 
                            options: {chart: { width: 200 }},
                        }]   
        };


        return (
            <div className="chartViewsLikesContainer"> 

                <ReactApexChart options={ optViews } series={ views } type="pie" />
                <ReactApexChart options={ optLikes } series={ likes } type="pie" />

                <div className="pieChartLegend" >

                    { taxonomy.map( (t, ix) => {
                            return (<div className="pieChartLegendElt"> 
                                        <span className="pieDot"  style={{backgroundColor: colors[ix]}}></span>
                                        {t.toLowerCase()} 
                                    </div>)
                        }) 
                    }
                </div>
            </div>
        )
    }
}


export default ChartViewsLikes;

