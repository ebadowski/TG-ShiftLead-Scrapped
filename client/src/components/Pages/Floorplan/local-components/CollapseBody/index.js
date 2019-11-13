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
            staff: nextProps.staff
        });
    }



    render() {
        return (
            <div className="collapsible-body">
                {this.state.NOTSECURE
                    ? <EditCO
                        staff={this.state.staff}
                        staffList={this.props.staffList}
                        staffAutoComplete={this.props.staffAutoComplete}
                    /> //AUTH LOGIN FOR THAT FLOOR if true go to EditCO
                    : <SLLogin
                        shiftLeadLogin={pin => this.props.shiftLeadLogin(pin)}
                        staff={this.state.staff}
                        floor={this.props.floor}
                        shift={this.props.shift}
                    />
                }
            </div>
        );
    }
}

export default CollapseBody;
