import React, { Component } from 'react';

import M from 'materialize-css';
//import { Autocomplete } from "react-materialize";
import CollapseBody from './local-components/CollapseBody';

import axios from 'axios';

import testBays1am from './testers/am/testBays1'
import testBays2am from './testers/am/testBays2'
import testBays3am from './testers/am/testBays3'

import testBays1pm from './testers/pm/testBays1'
import testBays2pm from './testers/pm/testBays2'
import testBays3pm from './testers/pm/testBays3'

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
                    third: testBays3am,
                    MB: "testBaysMB",
                    TR: "testBaysTR",
                    LL: "testBaysLL"
                },
                pm: {
                    first: testBays1pm,
                    second: testBays2pm,
                    third: testBays3pm,
                    MB: "testBaysMB",
                    TR: "testBaysTR",
                    LL: "testBaysLL"
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
    }
    componentDidUpdate() {
        M.AutoInit();

    }

    render() {
        console.log(this.state.sortedStaff.am.first)
        return (
            <div>
                <ul className="collapsible popout">
                    {
                        // (this.state.sortedStaff.am.testBays2)
                        //     ?
                        this.state.sortedStaff.am.second.map(
                            (staff, i) => (
                                <li
                                    key={staff.name + '-li'}

                                >
                                    <div className="collapsible-header valign-wrapper">

                                        <div className="row left">{staff.bays.start}-{staff.bays.end} </div>
                                        <div className="row ">{staff.name}</div>
                                        <div className="row right">
                                            <i className="material-icons"> <span className={staff.slCheckout.BVsidework ? "green-text" : "red-text"}>local_drink</span></i>
                                            <i className="material-icons"> <span className={staff.slCheckout.TLsidework ? "green-text" : "red-text"}>golf_course</span></i>
                                            <i className="material-icons"> <span className={staff.slCheckout.rolls ? "green-text" : "red-text"}>local_dining</span></i>
                                            <i className="material-icons"> <span className={staff.slCheckout.folds ? "green-text" : "red-text"}>filter_hdr</span></i>
                                        </div>

                                    </div>
                                    <CollapseBody
                                        sessionToken={this.props.sessionToken}
                                        staff={staff}
                                        updateOnChange={() =>
                                            this.updateOnChange()
                                        }
                                    />
                                </li>
                            )
                        )
                        // : null

                    }
                </ul>
            </div>
        );
    }
}

export default Floorplan;