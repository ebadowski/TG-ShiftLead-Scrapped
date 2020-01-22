import React, { Component } from 'react';
import M from 'materialize-css';

import CollapseBody from '../CollapseBody';
import AddSection from '../AddSection';

import './style.css';

class CollapsibleHeader extends Component {
    constructor(props) {
        // console.log(props)
        super(props);
        this.state = {
            sortedStaff: props.sortedStaff,
            floor: props.floor,
            shift: props.shift
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortedStaff: nextProps.sortedStaff,
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
            // swipeable: true
        }
        var instance = M.Tabs.init(el, options);

    }

    render() {
        return (

            (this.state.sortedStaff).map(
                (staff, i) => (
                    <li
                        key={(staff.name.replace(/ /g, '-')) + '-li'}

                    >
                        <div className="collapsible-header">

                            <div className="col s2 center-align">{staff.bays.start}-{staff.bays.end} </div>
                            <div
                                className={"col s4" + (staff.shiftLead ? "green-text" : "black-text")}
                            >
                                {staff.name }
                            </div>

                            <div className="col s6 right-align">
                                {/* FIGURE OUT CONTAINER SO THAT ONE ICON DOESN'T DROP BY ITSELF ON WIDTH SHRINK */}
                                <i className="material-icons "> <span className={staff.slCheckout.BVsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>local_drink</span></i>
                                <i className="material-icons "> <span className={staff.slCheckout.TLsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>golf_course</span></i>
                                <i className="material-icons "> <span className={staff.slCheckout.rolls ? "green-text text-darken-1" : "red-text text-darken-1"}>local_dining</span></i>
                                <i className="material-icons "> <span className={staff.slCheckout.folds ? "green-text text-darken-1" : "red-text text-darken-1"}>filter_hdr</span></i>
                            </div>

                        </div>
                        <CollapseBody
                            sessionToken={this.props.sessionToken}
                            staff={staff}
                            shift={this.state.shift}
                            floor={this.state.floor}
                            staffList={this.props.staffList}
                            staffAutoComplete={this.props.staffAutoComplete}
                            updateOnChange={() =>
                                this.updateOnChange()
                            }
                            shiftLeadLogin={pin => this.props.shiftLeadLogin(pin)}
                            SLCode={this.props.SLCode}
                            userRole={this.props.userRole}
                                userShiftLead={this.props.userShiftLead}
                        />
                    </li>
                )
            )
        );
    }
}

export default CollapsibleHeader;
