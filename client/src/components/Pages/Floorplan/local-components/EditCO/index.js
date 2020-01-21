import React, { Component } from 'react';

import M from 'materialize-css';
import moment from 'moment';

import bevTasks from './bevTasks'
import tlTasks from './tlTasks'
import API from '../../../../../utils/API';

import './style.css';

class EditCO extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            staff: props.staff,
            staffList: props.staffList,
            staffAutoComplete: props.staffAutoComplete,
            shift: props.shift, // CHANGE TO PROPS FROM VIEW
            floor: props.floor, // CHANGE TO PROPS FROM VIEW
            rolls: props, // CHANGE TO PROPS FROM VIEW
            folds: null, // CHANGE TO PROPS FROM VIEW
            nameVal: '' + props.staff.name,
            startVal: '' + props.staff.bays.start,
            endVal: '' + props.staff.bays.end,
            bevVal: '' + props.staff.tasks.bev,
            tlVal: '' + props.staff.tasks.teeline,
            slVal: props.staff.shiftLead
        };
    }

    componentDidMount() {
        // this.getStaffNames();


        M.AutoInit();

        this.initAutoComplete()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            staff: nextProps.staff,
            staffList: nextProps.staffList,
            staffAutoComplete: nextProps.staffAutoComplete
        });
    }



    initAutoComplete() {
        // init autocomplete 
        let options = {
            data: this.state.staffAutoComplete,
            onAutocomplete: val => {
                this.setState({ nameVal: val });
                // this.getUsers(this.state.searchFilter, val);
            }
        }

        let autocomplete = document.querySelectorAll('.staffNameEdit');

        M.Autocomplete.init(autocomplete, options);
    }



    handleInputChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSwitchChange = event => {
        event.preventDefault();
        this.setState({ slVal: !this.state.slVal })
    }

    handleFormSubmit = event => {
        event.preventDefault();

        if (this.state.nameVal && this.state.startVal && this.state.endVal) {
            //get staffID by name
            let staffObj = this.state.staffList.filter(obj => {
                return obj.searchName === this.state.nameVal
            })
            console.log(staffObj[0]._id)
            let newCO = {
                staffID: staffObj[0]._id,
                shiftLead: this.state.slVal,
                date: moment(),
                shift: this.state.shift,
                floor: this.state.floor,
                bays: {
                    start: this.state.startVal,
                    end: this.state.endVal
                },
                tasks: {
                    bev: this.state.bevVal,
                    teeline: this.state.tlVal,
                    rolls: this.state.rolls,
                    folds: this.state.folds
                }
            }
            API.createNewCheckout('PUT SESSION HERE', newCO)
            //REFRESH PARENT ON SUCCESS 
        }
        else {
            M.toast({
                html: 'Form Incomplete',
                classes: 'red'
            });
        }
        console.log('submit clicked')
        // this.getUsers(this.state.searchFilter, this.state.value)
    }

    checkOff(target) {
        switch (target) {
            case "bev":
                console.log(this.state.staff)
                API.checkOff(!this.slCheckout, target, this.state.staff.staffID)
                break;
            case "tee":
                console.log(this.state.staff, target, this.state.staff.staffID)
                break;
            case "rolls":
                console.log(this.state.staff, target, this.state.staff.staffID)
                break;
            case "folds":
                console.log(this.state.staff, target, this.state.staff.staffID)
                break;
            default:
            // code block

        }
    }


    render() {
        this.initAutoComplete()
        return (

            <div className="row">
                <form>
                    <div className="row">
                        <div className="col s6 center" >
                            <p>
                                <label>
                                    <input type="checkbox" name="slVal"
                                        onClick={() => this.checkOff('bev')} />
                                    <span>Bev Task</span>
                                </label>
                            </p>
                        </div>
                        <div className="col s6 center">
                            <p>
                                <label>
                                    <input type="checkbox" name="slVal"
                                        onClick={() => this.checkOff('tee')} />
                                    <span>Tee Task</span>
                                </label>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6 center">
                            <p>
                                <label>
                                    <input type="checkbox" name="slVal"
                                        onClick={() => this.checkOff('rolls')} />
                                    <span>Rolls</span>
                                </label>
                            </p>
                        </div>
                        <div className="col s6 center">
                            <p>
                                <label>
                                    <input type="checkbox" name="slVal"
                                        onClick={() => this.checkOff('folds')} />
                                    <span>Folds</span>
                                </label>
                            </p>
                        </div>
                    </div>

                </form>



                <div className='divider' />
                <br />



                <form
                    className="col s12"
                    onSubmit={this.handleFormSubmit}
                    id="section-form"
                >
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input
                                type="text"
                                id={"autocomplete-input-name-" + (this.state.staff.name.replace(/ /g, '-'))}
                                className="autocomplete staffNameEdit"
                                name="nameVal"
                                value={this.state.nameVal}
                                onChange={this.handleInputChange}
                                onClick={this.handleInputChange} />
                            <label htmlFor={"autocomplete-input-name-" + (this.state.staff.name.replace(/ /g, '-'))}>Staff Name</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12">
                            Bays: {'  '}
                            <div className="input-field inline">
                                <input
                                    id={"baystart-" + (this.state.staff.name.replace(/ /g, '-'))}
                                    inputMode="numeric" 
                                    className="validate"
                                    type="number" pattern="[0-9]*" 
                                    name="startVal"
                                    value={this.state.startVal}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor={"baystart-" + (this.state.staff.name.replace(/ /g, '-'))}>Start</label>
                            </div>
                            <div className="input-field inline">
                                <input
                                    id={"bayend-" + (this.state.staff.name.replace(/ /g, '-'))}
                                    inputMode="numeric" 
                                    type="number" pattern="[0-9]*" 
                                    className="validate"
                                    name="endVal"
                                    value={this.state.endVal}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor={"bayend-" + (this.state.staff.name.replace(/ /g, '-'))}>End</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s8">
                            <i className="material-icons prefix">local_drink</i>
                            <input
                                id={"bevTaskInput-" + (this.state.staff.name.replace(/ /g, '-'))}
                                type="text"
                                className="validate"
                                name="bevVal"
                                value={this.state.bevVal}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor={"bevTaskInput-" + (this.state.staff.name.replace(/ /g, '-'))}>Bev Task</label>
                            <i className="material-icons dropdown-trigger prefix right light-blue-text" data-target={"dropdownbev-" + (this.state.staff.name.replace(/ /g, '-'))}>assignment</i>
                        </div>
                        <ul id={"dropdownbev-" + (this.state.staff.name.replace(/ /g, '-'))} className='dropdown-content '>
                            {
                                bevTasks.map(
                                    (task) => (
                                        <li><a href="#!" onClick={() => this.setState({ bevVal: task })}>{task}</a></li>
                                    )
                                )
                            }
                        </ul>
                    </div>

                    <div className="row">
                        <div className="input-field col s8">
                            <i className="material-icons prefix">golf_course</i>
                            <input
                                id={"teeTaskInput-" + (this.state.staff.name.replace(/ /g, '-'))}
                                type="text"
                                className="validate"
                                name="tlVal"
                                value={this.state.tlVal}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor={"teeTaskInput-" + (this.state.staff.name.replace(/ /g, '-'))}>Tee Line Task</label>
                            <i className="material-icons dropdown-trigger prefix right light-blue-text" data-target={"dropdowntee-" + (this.state.staff.name.replace(/ /g, '-'))}>assignment</i>
                        </div>
                        <ul id={"dropdowntee-" + (this.state.staff.name.replace(/ /g, '-'))} className='dropdown-content'>
                            {
                                tlTasks.map(
                                    (task) => (
                                        <li><a href="#!" onClick={() => this.setState({ tlVal: task })}>{task}</a></li>
                                    )
                                )
                            }
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col s12">
                            <p>
                                <label>
                                    <input type="checkbox" name="slVal"
                                        onClick={this.handleSwitchChange} />
                                    <span>Shiftlead</span>
                                </label>
                            </p>
                        </div>
                    </div>

                    <div className="row center">
                        <button className="btn-large waves-effect waves-light blue lighten-2 center" type="submit" name="action" form='section-form'>Update
                                    <i className="material-icons right">update</i>
                        </button>
                    </div>

                </form>

            </div>

        );
    }
}

export default EditCO;
