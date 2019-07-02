import React, { Component } from "react";
import ReactDOM from "react-dom";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

class ChartGeo extends Component {

    constructor() {
        super()
        this.state = {
            worldData: [],
        }
    }
    
    projection() {
        console.log("PROJECTION!");
        return geoMercator()
               .scale(100)
               .translate([300, 150])
        //translate([ 800 / 2, 450 / 2 ])
    }

    componentDidMount() {
        fetch("src/components/world-110m.json")
        .then(response => {
            if (response.status !== 200) {
                console.log(`There was a problem: ${response.status}`)
                return
            }

            response.json().then(worldData => {
                let feat =  feature(worldData, worldData.objects.countries);
                this.setState({
                    worldData: feat.features,
                })
            })
        }); // end of then
    }

    render() {
        return (
            <div className="chartGeo" >
                <svg width={ 600 } height={ 300 } viewBox="0 0 400 300">
                    <g className="countries">
                    {
                        this.state.worldData.map((d,i) => (
                        <path
                            key={ `path-${ i }` }
                            d={ geoPath().projection(this.projection())(d) }
                            className="country"
                            // fill={ `rgba(38,50,56,${1 / this.state.worldData.length * i})` }
                            fill={"rgb(16, 98, 230)"}
                            stroke="#CB5E54"
                            strokeWidth={ 0.6 }
                        />
                        ))
                    }
                    </g>
                </svg>
            </div>
        )
    }
}

export default ChartGeo;