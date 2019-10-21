import React, { Component } from 'react';
import M from 'materialize-css';

import CollapseBody from '../local-components/CollapseBody';
import AddSection from '../local-components/AddSection';

import './style.css';

class Collapsible extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            sortedStaffAM: props.sortedStaffAM,
            sortedStaffPM: props.sortedStaffPM,
            viewID: props.viewID,
            floor: props.floor,
            shift: props.shift
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortedStaffAM: nextProps.sortedStaffAM,
            sortedStaffPM: nextProps.sortedStaffPM,
            viewID: nextProps.viewID,
            floor: nextProps.floor,
            shift: nextProps.shift
        });
    }

    componentDidMount() {

        M.AutoInit();
        this.initTabs()
    }
    componentDidUpdate() {
        M.AutoInit();
        this.initTabs()
    }
    //initialise tabs and correct bugs assc with it
    initTabs() {
        //Set Tabs to swipeable (mobile responsive)
        let el = document.querySelectorAll('.nested-tabs');
        let options = {
            swipeable: true
        }
        var instance = M.Tabs.init(el, options);

        // Fix Tab content height to fit contents
        console.log(document.querySelectorAll('.tabs-content'))
        let tabContent = document.querySelectorAll('.tabs-content')
        tabContent[0].style.height = "1400px"
        //tabContent[0].style.height = window.innerHeight + "px"
    }

    render() {
        return (
            <div id={this.state.viewID} className='tab-div'>

                <div class="row">
                    <div class="col s12">
                        <ul class="tabs nested-tabs" >
                            <li class="tab col s3"><a href={"#" + this.state.floor + '-AM'}>AM</a></li>
                            <li class="tab col s3"><a href={"#" + this.state.floor + '-AM'}>PM</a></li>

                        </ul>
                    </div>
                    <div id={this.state.floor + '-AM'} class="col s12">
                        <ul className="collapsible popout">
                            {
                                (this.state.sortedStaffAM).map(
                                    (staff, i) => (
                                        <li
                                            key={staff.name + '-li'}

                                        >
                                            <div className="collapsible-header">

                                                <div className="row left">{staff.bays.start}-{staff.bays.end} </div>
                                                <div className="row ">{staff.name}</div>
                                                <div className="row right">
                                                    <i className="material-icons"> <span className={staff.slCheckout.BVsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>local_drink</span></i>
                                                    <i className="material-icons"> <span className={staff.slCheckout.TLsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>golf_course</span></i>
                                                    <i className="material-icons"> <span className={staff.slCheckout.rolls ? "green-text text-darken-1" : "red-text text-darken-1"}>local_dining</span></i>
                                                    <i className="material-icons"> <span className={staff.slCheckout.folds ? "green-text text-darken-1" : "red-text text-darken-1"}>filter_hdr</span></i>
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
                            }
                            <AddSection />

                        </ul>
                    </div>
                    <div id={this.state.floor + '-PM'} class="col s12">
                        <ul className="collapsible popout">
                            {
                                (this.state.sortedStaffPM).map(
                                    (staff, i) => (
                                        <li
                                            key={staff.name + '-li'}

                                        >
                                            <div className="collapsible-header">

                                                <div className="row left">{staff.bays.start}-{staff.bays.end} </div>
                                                <div className="row ">{staff.name}</div>
                                                <div className="row right">
                                                    <i className="material-icons"> <span className={staff.slCheckout.BVsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>local_drink</span></i>
                                                    <i className="material-icons"> <span className={staff.slCheckout.TLsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>golf_course</span></i>
                                                    <i className="material-icons"> <span className={staff.slCheckout.rolls ? "green-text text-darken-1" : "red-text text-darken-1"}>local_dining</span></i>
                                                    <i className="material-icons"> <span className={staff.slCheckout.folds ? "green-text text-darken-1" : "red-text text-darken-1"}>filter_hdr</span></i>
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
                            }
                            <AddSection />

                        </ul>
                    </div>

                </div>


                {/* <ul className="collapsible popout">
                    {
                        // (this.state.sortedStaff.am.testBays2)
                        //     ?
                        (this.state.shift ? this.state.sortedStaffPM : this.state.sortedStaffAM).map(
                            (staff, i) => (
                                <li
                                    key={staff.name + '-li'}

                                >
                                    <div className="collapsible-header">

                                        <div className="row left">{staff.bays.start}-{staff.bays.end} </div>
                                        <div className="row ">{staff.name}</div>
                                        <div className="row right">
                                            <i className="material-icons"> <span className={staff.slCheckout.BVsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>local_drink</span></i>
                                            <i className="material-icons"> <span className={staff.slCheckout.TLsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>golf_course</span></i>
                                            <i className="material-icons"> <span className={staff.slCheckout.rolls ? "green-text text-darken-1" : "red-text text-darken-1"}>local_dining</span></i>
                                            <i className="material-icons"> <span className={staff.slCheckout.folds ? "green-text text-darken-1" : "red-text text-darken-1"}>filter_hdr</span></i>
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
                    <AddSection />

                </ul> */}
            </div>

        );
    }
}

export default Collapsible;
