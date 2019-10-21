import React, { Component } from 'react';

import EditCO from '../EditCO'

import './style.css';

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            staff: props.staff
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
                {/* {this.props.sesionToken
                    ? null //AUTH LOGIN FOR THAT FLOOR if true go to EditCO
                    : <SLLogin />
                } */}


                <EditCO
                    staff={this.state.staff}
                    staffList={this.props.staffList}
                    staffAutoComplete= {this.props.staffAutoComplete}
                />
            </div>
        );
    }
}

export default CollapseBody;
