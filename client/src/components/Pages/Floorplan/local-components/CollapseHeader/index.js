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

            staff: props.staff,
            floor: props.floor,
            shift: props.shift
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({

            staff: nextProps.staff,
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

    refreshOnUpdate(updatedCO) {
        console.log(updatedCO)
        console.log(this.state.staff)
        let newCO = this.state.staff;
        newCO.slCheckout = updatedCO.slCheckout;
        //newCO.comments = updatedCO.comments; // USE WHEN COMMENTS ARE IMPLEMENTED
        this.setState({ staff: newCO })

        let elem = document.querySelectorAll('.collapsible')
        console.log(this.props.index)
        for (let i = 0; i < elem.length; i++){
            var instance = M.Collapsible.getInstance(elem[i]);
            instance.close(this.props.index )
        }
        

        // // BUG
        // // currently the returned state is the first CO on floor 1 am and thusly can't selectively close collapsible
       
        // console.log(elem)
        // console.log(this.state.staff)
        // console.log(this.state.floor)
        // console.log(this.state.staff.shift)
        // console.log(this.state.floor - (this.state.shift === 'am' ? 1 : 0))
        // console.log(elem[this.state.floor - (this.state.shift === 'am' ? 1 : 0)])
        // // var instance = M.Collapsible.getInstance(elem[this.state.floor - 1]);
        // //instance.close()
    }


    render() {
        return (


            <li
                key={(this.state.staff.name.replace(/ /g, '-')) + '-li'}

            >
                <div className="collapsible-header">

                    <div className="col s2 center-align">{this.state.staff.bays.start}-{this.state.staff.bays.end} </div>
                    <div
                        className={"col s4" + (this.state.staff.shiftLead ? "green-text" : "black-text")}
                    >
                        {this.state.staff.name}
                    </div>

                    <div className="col s6 right-align">
                        {/* FIGURE OUT CONTAINER SO THAT ONE ICON DOESN'T DROP BY ITSELF ON WIDTH SHRINK */}
                        <i className="material-icons "> <span className={this.state.staff.slCheckout.BVsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>local_drink</span></i>
                        <i className="material-icons "> <span className={this.state.staff.slCheckout.TLsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>golf_course</span></i>
                        <i className="material-icons "> <span className={this.state.staff.slCheckout.rolls ? "green-text text-darken-1" : "red-text text-darken-1"}>local_dining</span></i>
                        <i className="material-icons "> <span className={this.state.staff.slCheckout.folds ? "green-text text-darken-1" : "red-text text-darken-1"}>filter_hdr</span></i>
                    </div>

                </div>
                <CollapseBody
                    sessionToken={this.props.sessionToken}
                    staff={this.state.staff}
                    shift={this.state.shift}
                    floor={this.state.floor}
                    rolls={this.props.rolls}
                    folds={this.props.folds}
                    staffList={this.props.staffList}
                    staffAutoComplete={this.props.staffAutoComplete}
                    updateOnChange={() =>
                        this.updateOnChange()
                    }
                    refreshOnUpdate={(updatedCO) => this.refreshOnUpdate(updatedCO)}
                    shiftLeadLogin={pin => this.props.shiftLeadLogin(pin)}
                    SLCode={this.props.SLCode}
                    userRole={this.props.userRole}
                    userShiftLead={this.props.userShiftLead}
                />
            </li>


        );
    }
    // render() {
    //     return (

    //         (this.state.sortedStaff).map(
    //             (staff, i) => (
    //                 <li
    //                     key={(staff.name.replace(/ /g, '-')) + '-li'}

    //                 >
    //                     <div className="collapsible-header">

    //                         <div className="col s2 center-align">{staff.bays.start}-{staff.bays.end} </div>
    //                         <div
    //                             className={"col s4" + (staff.shiftLead ? "green-text" : "black-text")}
    //                         >
    //                             {staff.name }
    //                         </div>

    //                         <div className="col s6 right-align">
    //                             {/* FIGURE OUT CONTAINER SO THAT ONE ICON DOESN'T DROP BY ITSELF ON WIDTH SHRINK */}
    //                             <i className="material-icons "> <span className={staff.slCheckout.BVsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>local_drink</span></i>
    //                             <i className="material-icons "> <span className={staff.slCheckout.TLsidework ? "green-text text-darken-1" : "red-text text-darken-1"}>golf_course</span></i>
    //                             <i className="material-icons "> <span className={staff.slCheckout.rolls ? "green-text text-darken-1" : "red-text text-darken-1"}>local_dining</span></i>
    //                             <i className="material-icons "> <span className={staff.slCheckout.folds ? "green-text text-darken-1" : "red-text text-darken-1"}>filter_hdr</span></i>
    //                         </div>

    //                     </div>
    //                     <CollapseBody
    //                         sessionToken={this.props.sessionToken}
    //                         staff={staff}
    //                         shift={this.state.shift}
    //                         floor={this.state.floor}
    //                         rolls={this.props.rolls}
    //                         folds={this.props.folds}
    //                         staffList={this.props.staffList}
    //                         staffAutoComplete={this.props.staffAutoComplete}
    //                         updateOnChange={() =>
    //                             this.updateOnChange()
    //                         }
    //                         refreshOnUpdate= {(updatedCO) => this.refreshOnUpdate(updatedCO)}
    //                         shiftLeadLogin={pin => this.props.shiftLeadLogin(pin)}
    //                         SLCode={this.props.SLCode}
    //                         userRole={this.props.userRole}
    //                             userShiftLead={this.props.userShiftLead}
    //                     />
    //                 </li>
    //             )
    //         )
    //     );
    // }
}

export default CollapsibleHeader;
