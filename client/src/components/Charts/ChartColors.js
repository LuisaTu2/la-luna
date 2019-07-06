import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./ChartColors.css";

class ChartColors extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let data = this.props.plottingData;
        let keys = Object.keys(data);
        let sortedData = {};
        keys.forEach(k => {
            let colors = data[k] ;
            colors.sort();
            sortedData[k] = colors;
        })

        // Create items array
        let items = Object.keys(data).map( k => {
            return [k, data[k].length, data[k]];
        });
        
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
  

        return (
                <div className="taxonomyColorBox"> 
                    { items.map( item => {
                        return (<div className="taxonomyColorContainer"> 
                                    <div className="taxonomyColorLabel"> {item[0]} </div>
                                    <div className="taxonomyColorPalette">
                                        { item[2].map( c => {
                                                return <div className="taxonomyColorDot" style={{backgroundColor: c}}> </div>
                                            })                
                                        } 
                                    </div>  
                                </div>)
                        }) 
                    }
                </div>
        )
    }
}


export default ChartColors;
