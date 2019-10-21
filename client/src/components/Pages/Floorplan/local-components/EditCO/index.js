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
            nameVal: '',
            startVal: '',
            endVal: '',
            bevVal: '',
            tlVal: '',
            slVal: false
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
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSwitchChange = event => {
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



    render() {
        this.initAutoComplete()
        return (

            <div className="row">
                <form
                    className="col s12"
                    onSubmit={this.handleFormSubmit}
                    id="section-form"
                >
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input
                                type="text"
                                id="autocomplete-input-name"
                                className="autocomplete staffNameEdit"
                                name="nameVal"
                                value={this.state.nameVal}
                                onChange={this.handleInputChange}
                                onClick={this.handleInputChange} />
                            <label htmlFor="autocomplete-input-name">Staff Name</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12">
                            Bays: {'  '}
                            <div className="input-field inline">
                                <input
                                    id="baystart"
                                    type="number"
                                    className="validate"
                                    name="startVal"
                                    value={this.state.startVal}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor="baystart">Start</label>
                            </div>
                            <div className="input-field inline">
                                <input
                                    id="bayend"
                                    type="number"
                                    className="validate"
                                    name="endVal"
                                    value={this.state.endVal}
                                    onChange={this.handleInputChange}
                                />
                                <label htmlFor="bayend">End</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s8">
                            <i className="material-icons prefix">local_drink</i>
                            <input
                                id="bevInput"
                                type="text"
                                className="validate"
                                name="bevVal"
                                value={this.state.bevVal}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="bevInput">Bev Task</label>
                            <i className="material-icons dropdown-trigger prefix right light-blue-text" data-target='dropdown1'>assignment</i>
                        </div>
                        <ul id='dropdown1' className='dropdown-content '>
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
                                id="tlInput"
                                type="text"
                                className="validate"
                                name="tlVal"
                                value={this.state.tlVal}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="tlInput">Tee Line Task</label>
                            <i className="material-icons dropdown-trigger prefix right light-blue-text" data-target='dropdown2'>assignment</i>
                        </div>
                        <ul id='dropdown2' className='dropdown-content'>
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
                        <button className="btn-large waves-effect waves-light blue lighten-2 center" type="submit" name="action" form='section-form'>Add Section
                                    <i className="material-icons right">person_add</i>
                        </button>
                    </div>

                </form>

            </div>

        );
    }
}

export default EditCO;
