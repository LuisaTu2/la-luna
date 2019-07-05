import React, { Component } from "react";
import ReactDOM from "react-dom";


class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" checked={this.props.isMenuChecked} onChange={this.props.onChangeHandler}/>       
                    <span></span>
                    <span></span>
                    <span></span>
                        <ul id="menu">                   
                            {   
                                this.props.menuItems.map( v => {
                                    let val = v[0]; let menuItemHTML = v[1]; 
                                    // let analyticsStyle = (val === "analytics") ? "analyticsStyle" : ""; 
                                    let analyticsStyle = "";
                                    // let callback = (val === "analytics") ? this.getAnalyticsData.bind(this, val) : this.getTaxonomyData.bind(this, val);
                                    let callback = (val === "analytics") ? this.props.callbacks[1].bind(this, val) : this.props.callbacks[0].bind(this, val);
                                    return (    <a href="#" onClick={ callback } className={"menuItem"}>
                                                    <li className={analyticsStyle}>{menuItemHTML}
                                                    </li>
                                                </a>
                                    )
                                })
                            }
                            
                        </ul>

                </div>
            </nav>
        )
    }
}


export default Menu;