import React, { Component } from 'react';

import EditCO from '../EditCO'
import SLLogin from '../SLLogin'

import './style.css';

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            staff: props.staff,
            NOTSECURE: props.SLCode
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            staff: nextProps.staff,
            NOTSECURE: nextProps.SLCode
        });
    }



    render() {
        return (
            <div className="collapsible-body">
                {(this.props.userShiftLead && this.props.floor === this.props.userRole.charAt(0))
                    ? <EditCO
                        staff={this.state.staff}
                        staffList={this.props.staffList}
                        staffAutoComplete={this.props.staffAutoComplete}
                        shift={this.props.shift}
                            floor={this.props.floor}
                            rolls={this.props.rolls}
                            folds={this.props.folds}
                    /> //AUTH LOGIN FOR THAT FLOOR if true go to EditCO
                    : <div className="row">
                        <ul className="collection">
                            <li className="collection-item avatar">
                                <i className="material-icons circle">local_drink</i>
                                <span className="title"> Bev Side Work</span>
                                <p>{this.state.staff.tasks.bev}</p>
                            </li>
                            <br/>
                            <li className="collection-item avatar">
                                <i className="material-icons circle">golf_course</i>
                                <span className="title"> Tee Line Side Work</span>
                                <p>{this.state.staff.tasks.teeline}</p>
                            </li>
                        </ul>
                    </div>
                    // : <SLLogin
                    //     shiftLeadLogin={pin => this.props.shiftLeadLogin(pin)}
                    //     staff={this.state.staff}
                    //     floor={this.props.floor}
                    //     shift={this.props.shift}
                    // />
                }
            </div>
        );
    }
}

export default CollapseBody;
