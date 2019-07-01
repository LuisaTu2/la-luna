import React, { Component } from "react";
import ReactDOM from "react-dom";

class Chart extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let data = this.props.plottingData;
        let keys = Object.keys(data);
        let sortedData = {};
        keys.forEach(k => {
            let colors = data[k] ;
            colors.sort().reverse();
            sortedData[k] = colors;
        })
        console.log(data);
        return (
                <div className="taxonomyColorContainer"> 
                    { keys.map( k => {
                        return <div className="taxonomyColorLabel"> {k} {
                            sortedData[k].map( d => {
                                let bc = d;
                                return <div className="colorDot" style={{backgroundColor: bc }}>  </div>
                            })
                            } </div>
                    }) }

                </div>
        )
    }
}


export default Chart;
