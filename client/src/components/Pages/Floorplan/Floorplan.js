import React, { Component } from 'react';

import moment from 'moment';
import M from 'materialize-css';
//import { Autocomplete } from "react-materialize";
import axios from 'axios';

import FPHeader from './local-components/FPHeader';
import Collapsible from './local-components/Collapsible';

import API from '../../../utils/API';

// import testBays1am from './testers/am/testBays1'
// import testBays2am from './testers/am/testBays2'
// import testBays3am from './testers/am/testBays3'

// import testBays1pm from './testers/pm/testBays1'
// import testBays2pm from './testers/pm/testBays2'
// import testBays3pm from './testers/pm/testBays3'

import './style.css';

let switchArr = ["1", "2", "3", "MB", "TR", "LL"]

class Floorplan extends Component {


    constructor(props) {
        super(props);
        // Bind the this context to the handler function
        //this.updateOnNewItem = this.updateOnNewItem.bind(this);

        // Set some state
        this.state = {
            staffList: {},
            staffAutoComplete: {},
            // sortedStaff: {
            //     am: {
            //         first: testBays1am,
            //         second: testBays2am,
            //         third: testBays3am
            //         // MB: "testBaysMB",
            //         // TR: "testBaysTR",
            //         // LL: "testBaysLL"
            //     },
            //     pm: {
            //         first: testBays1pm,
            //         second: testBays2pm,
            //         third: testBays3pm
            //         // MB: "testBaysMB",
            //         // TR: "testBaysTR",
            //         // LL: "testBaysLL"
            //     }
            // },
            sortedStaff: {
                am: {
                    first: [],
                    second: [],
                    third: []
                    // MB: "testBaysMB",
                    // TR: "testBaysTR",
                    // LL: "testBaysLL"
                },
                pm: {
                    first: [],
                    second: [],
                    third: []
                    // MB: "testBaysMB",
                    // TR: "testBaysTR",
                    // LL: "testBaysLL"
                }
            },
            floor: "1",
            shift: false,
            userRole: props.userRole

        };

        // Bind the this context to the handler function
        this.switchView = this.switchView.bind(this);
    }

    componentDidMount() {
        this.getCOs();
        // console.log(this.state.sortedStaff.am.first)
        M.AutoInit();

        this.initTabs()

        this.getStaffNames();

        // // UPDATES TEST SET, DELETE LATER
        //console.log(API.updateTestSet('session', moment('2019-11-13')))
        // API.updateTestSet('session', moment('2020-01-21'))
        API.updateTestSet('session', moment('2019-10-26'))
    }
    componentDidUpdate() {
        M.AutoInit();
        this.initTabs()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            userRole: nextProps.userRole
        });
    }

    //get Checkouts for today
    getCOs() {
        let today = moment()
        API.getCOFromDate("session token goes here", today)
            .then(response => {
                // console.log(response);
                this.sortCOData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    sortCOData(data) {
        console.log(data)
        let sortedData = {
            am: {
                first: [],
                second: [],
                third: []

            },
            pm: {
                first: [],
                second: [],
                third: []

            }
        }
        // sort each item into respective obj key
        for (let i in data) {
            // Concats Name into a usable format for later use
            data[i].name = data[i].staffID.name.first.charAt(0).toUpperCase() + data[i].staffID.name.first.slice(1) + " " + data[i].staffID.name.last.charAt(0).toUpperCase() + data[i].staffID.name.last.slice(1)

            switch (data[i].shift) {
                case "am":
                    switch (data[i].floor) {
                        case "1":
                            sortedData.am.first.push(data[i])
                            break;
                        case "2":
                            sortedData.am.second.push(data[i])
                            break;
                        case "3":
                            sortedData.am.third.push(data[i])
                            break;
                        default:
                        // code block
                    }
                    break;
                case "pm":
                    switch (data[i].floor) {
                        case "1":
                            sortedData.pm.first.push(data[i])
                            break;
                        case "2":
                            sortedData.pm.second.push(data[i])
                            break;
                        case "3":
                            sortedData.pm.third.push(data[i])
                            break;
                        default:
                        // code block
                    }
                    break;
                default:
                // code block
            }
        }
        console.log(sortedData)
        let orderedData = {
            am: {
                first: this.bubbleSort(sortedData.am.first),
                second: this.bubbleSort(sortedData.am.second),
                third: this.bubbleSort(sortedData.am.third)

            },
            pm: {
                first: this.bubbleSort(sortedData.pm.first),
                second: this.bubbleSort(sortedData.pm.second),
                third: this.bubbleSort(sortedData.pm.third),

            }
        }
        console.log(orderedData)
        this.setState({ sortedStaff: orderedData })

    }
    bubbleSort(inputArr) {
        console.log(inputArr)
        let len = inputArr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < len; i++) {
                if (i < len - 1 && inputArr[i].bays.start > inputArr[i + 1].bays.start) {
                    let tmp = inputArr[i];
                    inputArr[i] = inputArr[i + 1];
                    inputArr[i + 1] = tmp;
                    swapped = true;
                }
            }
        } while (swapped);
        return inputArr;
    };


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

    //Uses key against role to determine if that tab should be active
    //BUGGED DEFAULTS TO THIRD ON REFRESH, something to do with materialize, this is assigning the correct class attr
    checkPath(key) {
        console.log(key + ' ********* ' + this.state.userRole.charAt(0))
        let block = <a href={"#" + key + "-floor"}>{key}</a>
        switch (key) {
            case "first":
                if (this.state.userRole.charAt(0) === "1") {
                    console.log(true)
                    block = <a href={"#" + key + "-floor"} className="active">{key}</a>
                }
                break;
            case "second":
                if (this.state.userRole.charAt(0) === "2") {
                    console.log(true)
                    block = <a href={"#" + key + "-floor"} className="active">{key}</a>
                }
                break;
            case "third":
                if (this.state.userRole.charAt(0) === "3") {
                    console.log(true)
                    block = <a href={"#" + key + "-floor"} className="active">{key}</a>
                }
                break;

        }
        console.log(block)
        return block
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
                                {this.checkPath(keyName)}
                                {/* <a
                                    href={"#" + keyName + "-floor"}
                                    className={this.checkPath(keyName) ? "active" : null}
                                //onClick={() => this.switchFloor(switchArr[keyIndex])}
                                > 
                                {keyName}
                                </a>*/}
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
                                staffList={this.state.staffList}
                                staffAutoComplete={this.state.staffAutoComplete}
                            />
                        )
                    )
                }

            </div >
        );
    }
}

export default Floorplan;