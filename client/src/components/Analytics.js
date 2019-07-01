import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from "./Chart";

class Analytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plotData: {}
        }
        
        this.query = this.query.bind(this);
        this.taxonomyColorMapping = this.taxonomyColorMapping.bind(this);
    }

    query(){
        let queryData = {"selection":event.target.value};
        console.log(queryData);
        let self = this;
        $.ajax({
            type: "POST",
            url: "/data_analytics",
            data: JSON.stringify(queryData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, status, jqXHR){
                console.log("RETRIEVED DATA: ", status, jqXHR);
                self.taxonomyColorMapping(data);
            }           
        }); // End of $.ajax call  
    }

    taxonomyColorMapping(data){
        let tcmap = {};
        let tcData = JSON.parse(data);
        tcData.forEach( t => {
            let taxonomy = t.taxonomy_path[0];
            let hexcode = "#" + t.Images[0].hex_code;
            if(tcmap[taxonomy]){
                tcmap[taxonomy].push(hexcode);
            } else {
                tcmap[taxonomy] = [hexcode];
            }
        });
        this.setState({
            plotData: tcmap
        })

    }
    
    render() {
       
        return (
                <div className="analyticsContainer"> 
                    Here go the analytics!
                    <button onClick={this.query} value="taxonomy_color"> Taxonomy vs Color </button>
                    <Chart plottingData={this.state.plotData}/>
                </div>
        )
    }
}


export default Analytics;
