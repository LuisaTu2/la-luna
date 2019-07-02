import React, { Component } from "react";
import ReactDOM from "react-dom";

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
        console.log(data);
        return (
                <div className="taxonomyColorBox"> 
                    { keys.map( k => {
                        return (<div className="taxonomyColorContainer"> 
                                    <div className="taxonomyColorLabel"> {k} </div>
                                    <div className="taxonomyColorPalette">
                                        { sortedData[k].map( c => {
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
