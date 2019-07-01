import React, { Component } from "react";
import ReactDOM from "react-dom";
import {VictoryPie} from 'victory';


class ChartTaxonomyViewsLikes extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const data = [ {angle: 1, radius: 10}, {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20}, {angle: 5, radius: 5, label: 'Alt Label'}, {angle: 3, radius: 14}, {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'} ];

        return (
                
                <div className="chartTaxonomyViewsLikesContainer"> 
                        this is where the plot should go :)
                            <VictoryPie
                                data={[
                                    { x: "Cats", y: 35 },
                                    { x: "Dogs", y: 40 },
                                    { x: "Birds", y: 55 }
                                ]}
                            />
                </div>
        )
    }
}


export default ChartTaxonomyViewsLikes;

