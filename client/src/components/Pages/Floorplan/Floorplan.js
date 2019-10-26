import React, { Component } from 'react';

import M from 'materialize-css';
//import { Autocomplete } from "react-materialize";
import axios from 'axios';

import FPHeader from './local-components/FPHeader';
import Collapsible from './local-components/Collapsible';

import API from '../../../utils/API';

import testBays1am from './testers/am/testBays1'
import testBays2am from './testers/am/testBays2'
import testBays3am from './testers/am/testBays3'

import testBays1pm from './testers/pm/testBays1'
import testBays2pm from './testers/pm/testBays2'
import testBays3pm from './testers/pm/testBays3'

import './style.css';

let switchArr = ["1", "2", "3", "MB", "TR", "LL"]

class Floorplan extends Component {


    constructor(props) {
        super(props);

        // Bind the this context to the handler function
        //this.updateOnNewItem = this.updateOnNewItem.bind(this);

        // Set some state
        this.state = {
            staffList:{},
            staffAutoComplete: {},
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
            floor: "1",
            shift: false

        };

        // Bind the this context to the handler function
        this.switchView = this.switchView.bind(this);
    }

    componentDidMount() {
        // this.getItems();
        // console.log(this.state.sortedStaff.am.first)
        M.AutoInit();

        this.initTabs()

        this.getStaffNames();

    }
    componentDidUpdate() {
        M.AutoInit();
        this.initTabs()
    }

    getStaffNames() {
        // API.getAllStaff(this.props.sessionToken)
        API.getAllStaff("session token goes here")
            .then(response => {
                // console.log(response);
                this.sortStaffData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    sortStaffData(data) {
        let searchObj = {}

        // Pull names only and create list obj for autocomplete to use

        for (let i in data) {
            data[i].searchName = data[i].name.first.charAt(0).toUpperCase() + data[i].name.first.slice(1) + " " + data[i].name.last.charAt(0).toUpperCase() + data[i].name.last.slice(1)
            searchObj[data[i].searchName] = null  // can set to img link if we add profile images   'https://placehold.it/250x250'

        }
        // console.log(data)
        // console.log(searchObj)
        // set full data set to staffList
        this.setState({ staffList: data, staffAutoComplete: searchObj })

    }


    //initialise tabs and correct bugs assc with it
    initTabs() {
        //Set Tabs to swipeable (mobile responsive)
        let el = document.querySelectorAll('.parent-tabs');
        let options = {
            swipeable: true
        }
        var instance = M.Tabs.init(el, options);

        // Fix Tab content height to fit contents
         //console.log(document.querySelectorAll('.tabs-content'))
        let tabContent = document.querySelectorAll('.tabs-content')
        tabContent[0].style.height = "1400px"
        //tabContent[0].style.height = window.innerHeight + "px"
    }

    

    // this function will be sent to FPHeader so it can call and update this component on shift view change
    switchView() {
        // let newState = this.state.view
        // newState[target] = value;

        //this.setState({ [target]: value })
        this.setState({ shift: !this.state.shift })
        //this.forceUpdate();
        //this.initTabs()
    }

    switchFloor(value) {
        // let newState = this.state.view
        // newState[target] = value;

        //this.setState({ [target]: value })
        this.setState({ floor: value })
        //this.forceUpdate();
        //this.initTabs()
    }



    render() {
        // console.log(this.state.sortedStaff)
        return (
            <div>
                <FPHeader
                    //switchView={this.switchView}
                    // switchView={(target, value) => this.switchView(target, value)}
                    shift={this.state.shift}
                />

                <ul id="tabs-swipe" className="tabs parent-tabs">
                    {Object.keys(this.state.sortedStaff.am).map(
                        (keyName, keyIndex) => (
                            <li className="tab col s3" key={'tab-' + keyIndex}>
                                <a
                                    href={"#" + keyName + "-floor"}
                                //onClick={() => this.switchFloor(switchArr[keyIndex])}
                                >
                                    {keyName}
                                </a>
                            </li>
                        )
                    )}
                </ul>
                {
                    Object.keys(this.state.sortedStaff.am).map(
                        (keyName, keyIndex) => (
                            < Collapsible
                                sortedStaffAM={this.state.sortedStaff.am[keyName]}
                                sortedStaffPM={this.state.sortedStaff.pm[keyName]}
                                viewID={keyName + "-floor"}
                                floor={switchArr[keyIndex]}
                                shift={this.state.shift}
                                staffList= {this.state.staffList}
                                staffAutoComplete= {this.state.staffAutoComplete}
                            />
                        )
                    )
                }

            </div >
        );
    }
}

export default Floorplan;