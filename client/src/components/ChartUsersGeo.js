import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
  } from "react-simple-maps";
import { scaleLinear } from "d3-scale"
// import { ResponsiveChoropleth, ResponsiveChoroplethCanvas, ResponsiveGeoMap} from '@nivo/geo';

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
}

const popScale = scaleLinear()
    .domain([0,100000000,1400000000])
    .range(["#044C51", "#E4572E", "#F3A712", "#A8C686", "#CE1455" ]);

// .range(["#CFD8DC","#607D8B","#37474F"])

class ChartUsersGeo extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {     
        return (
                <div className="chartUsersGeo"> 
                   <div style={wrapperStyles}>
                        <ComposableMap
                            projectionConfig={{
                                scale: 205,
                                rotation: [-11,0,0],
                            }}
                            width={980}
                            height={551}
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        >
                            <ZoomableGroup center={[0,20]}>
                                <Geographies 
                                    geography={ "src/components/population.json" }
                                    >
                                {(geographies, projection) => geographies.map((geography, i) => (
                                    <Geography
                                        key={ i }
                                        geography={ geography }
                                        projection={ projection }
                                        onClick={ this.handleClick }
                                        style={{
                                            default: {
                                            fill: popScale(geography.properties.pop_est),
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                            },
                                            hover: {
                                            fill: "#28BDFC",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                            },
                                            pressed: {
                                            fill: "#59C3C3",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                            }
                                        }}
                                    />
                                ))}
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>
                   
                </div>
        )
    } // end of render
}


export default ChartUsersGeo;
