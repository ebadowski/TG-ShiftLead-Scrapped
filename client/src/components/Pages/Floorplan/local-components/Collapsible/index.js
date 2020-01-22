import React, { Component } from 'react';
import M from 'materialize-css';

import CollapseHeader from '../CollapseHeader';
import CollapseBody from '../CollapseBody';
import AddSection from '../AddSection';

import './style.css';
import API from '../../../../../utils/API';

class Collapsible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortedStaffAM: props.sortedStaffAM,
            sortedStaffPM: props.sortedStaffPM,
            viewID: props.viewID,
            floor: props.floor,
            shift: props.shift,
            staffList: props.staffList,
            staffAutoComplete: props.staffAutoComplete,
            SLCode: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortedStaffAM: nextProps.sortedStaffAM,
            sortedStaffPM: nextProps.sortedStaffPM,
            viewID: nextProps.viewID,
            floor: nextProps.floor,
            shift: nextProps.shift,
            staffList: nextProps.staffList,
            staffAutoComplete: nextProps.staffAutoComplete
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
    //handle login from child components
    shiftLeadLogin(pin) {
        let bevAttempt = this.state.floor + "slb" + (this.state.shift ? 'p' : 'a')
        let teeAttempt = this.state.floor + "slt" + (this.state.shift ? 'p' : 'a')
        console.log(pin)
        console.log(bevAttempt, teeAttempt)
        API.checkPin(pin, bevAttempt)
            .then(response => {
                console.log(response);
                //this.setState({ SLCode: response.data.role })
                this.setState({ SLCode: true })
                //this.forceUpdate()
            })
            .catch(function (error) {
                console.log(error);
            });

        API.checkPin(pin, teeAttempt)
            .then(response => {
                console.log(response);
                //this.setState({ SLCode: response.data.role })
                this.setState({ SLCode: true })
                //this.forceUpdate()
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (
            <div id={this.state.viewID} className='tab-div'>

                <div className="row">
                    <div className="col s12">
                        <ul className="tabs nested-tabs" >
                            <li className="tab col s3"><a href={"#" + this.state.floor + '-AM'}>AM</a></li>
                            <li className="tab col s3"><a href={"#" + this.state.floor + '-PM'}>PM</a></li>

                        </ul>
                    </div>
                    <div id={this.state.floor + '-AM'} className="col s12">
                        <ul className="collapsible popout">
                            <CollapseHeader
                                sortedStaff={this.state.sortedStaffAM}
                                sessionToken={this.props.sessionToken}
                                floor={this.state.floor}
                                shift={'am'}
                                staffList={this.props.staffList}
                                staffAutoComplete={this.props.staffAutoComplete}
                                shiftLeadLogin={pin => this.shiftLeadLogin(pin)}
                                SLCode={this.state.SLCode}
                                userRole={this.props.userRole}
                                userShiftLead={this.props.userShiftLead}
                            />

                            <AddSection
                                staffList={this.props.staffList}
                                staffAutoComplete={this.props.staffAutoComplete}
                                floor={this.state.floor}
                                shift={'am'}
                            />

                        </ul>
                    </div>
                    <div id={this.state.floor + '-PM'} className="col s12">
                        <ul className="collapsible popout">

                            <CollapseHeader
                                sortedStaff={this.state.sortedStaffPM}
                                sessionToken={this.props.sessionToken}
                                floor={this.state.floor}
                                shift={'pm'}
                                staffList={this.props.staffList}
                                staffAutoComplete={this.props.staffAutoComplete}
                                shiftLeadLogin={pin => this.shiftLeadLogin(pin)}
                                SLCode={this.state.SLCode}
                                userRole={this.props.userRole}
                                userShiftLead={this.props.userShiftLead}
                            />

                            <AddSection
                                staffList={this.props.staffList}
                                staffAutoComplete={this.props.staffAutoComplete}
                                floor={this.state.floor}
                                shift={'pm'}
                            />

                        </ul>
                    </div>

                </div>

            </div>

        );
    }
}

export default Collapsible;
