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
            sortedStaff: props.sortedStaff,
            viewID: props.viewID
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            sortedStaff: nextProps.sortedStaff,
            viewID: nextProps.viewID
        });
    }

    componentDidMount() {

        M.AutoInit();

    }
    componentDidUpdate() {
        M.AutoInit();

    }

    render() {
        return (
            <div id={this.state.viewID} className='tab-div'>
                <ul className="collapsible popout">
                    {
                        // (this.state.sortedStaff.am.testBays2)
                        //     ?
                        this.state.sortedStaff.map(
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

                </ul>
            </div>

        );
    }
}

export default Collapsible;
