import React, { Component } from 'react';

import M from 'materialize-css';
//import { Autocomplete } from "react-materialize";

import FPHeader from './local-components/FPHeader';
import Collapsible from './Collapsible';


import axios from 'axios';

import testBays1am from './testers/am/testBays1'
import testBays2am from './testers/am/testBays2'
import testBays3am from './testers/am/testBays3'

import testBays1pm from './testers/pm/testBays1'
import testBays2pm from './testers/pm/testBays2'
import testBays3pm from './testers/pm/testBays3'

import './style.css';

class Floorplan extends Component {
    constructor(props) {
        super(props);

        // Bind the this context to the handler function
        //this.updateOnNewItem = this.updateOnNewItem.bind(this);

        // Set some state
        this.state = {
            sortedStaff: {
                am: {
                    first: testBays1am,
                    second: testBays2am,
                    third: testBays3am
                    // MB: "testBaysMB",
                    // TR: "testBaysTR",
                    // LL: "testBaysLL"
                },
                pm: {
                    first: testBays1pm,
                    second: testBays2pm,
                    third: testBays3pm
                    // MB: "testBaysMB",
                    // TR: "testBaysTR",
                    // LL: "testBaysLL"
                }
            },
            view: {
                floor: "2",
                shift: "am"
            }
        };
    }

    componentDidMount() {
        // this.getItems();
        console.log(this.state.sortedStaff.am.first)
        M.AutoInit();

        //Set Tabs to swipeable (mobile responsive)
        let el = document.querySelectorAll('.tabs');
        let options = {
            swipeable: true
        }
        var instance = M.Tabs.init(el, options);

        // Fix Tab content height to fit contents
        console.log(document.querySelectorAll('.tabs-content'))
        let tabContent = document.querySelectorAll('.tabs-content')
        tabContent[0].style.height = "1000px"
        //tabContent[0].style.height = window.innerHeight + "px"

    }
    componentDidUpdate() {
        M.AutoInit();

    }

    render() {
        console.log(this.state.sortedStaff.am.first)
        return (
            <div>
                <FPHeader />

                <ul id="tabs-swipe" className="tabs">
                    {Object.keys(this.state.sortedStaff.am).map(
                        (keyName, keyIndex) => (
                            <li className="tab col s3" key={'tab-' + keyIndex}>
                                <a href={"#" + keyName + "-floor"}>
                                    {keyName}
                                </a>
                            </li>
                        )
                    )}
                </ul>
                {Object.keys(this.state.sortedStaff.am).map(
                    (keyName, keyIndex) => (
                        < Collapsible
                            sortedStaff={this.state.sortedStaff.am[keyName]}
                            viewID={keyName + "-floor"}
                        />
                    )
                )}

            </div>
        );
    }
}

export default Floorplan;