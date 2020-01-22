import React, { Component } from 'react';

import moment from 'moment';
import M from 'materialize-css';
import axios from 'axios';

import API from '../../../utils/API';

import './style.css';


// 'buttons' are hardcoded so I can experiement with animation coding later
class NewUser extends Component {


    constructor(props) {
        super(props);

        // Sets  state
        this.state = {
            shift: '',
            floor: '',
            pin: '',
            SLRole: '',
            inputVal: ''
        };

    }

    componentDidMount() {
        M.AutoInit();


    }
    componentDidUpdate() {
        M.AutoInit();

    }


    changeState(target, val) {
        this.setState({ [target]: this.state[target] == val ? '' : val });
    }

    handleInputChange = event => {
        this.setState({ inputVal: event.target.value });
    }

    handleFormSubmit() {
        this.props.userSubmit(this.state.shift, this.state.floor, this.state.inputVal, this.state.SLRole)
    }

    render() {

        return (

            <div >
                <br /><br />
                <div className=" container s10 center z-depth-3">
                    {/* <br/> */}
                    <div className="row">
                        <div
                            className=" col s6"
                            style={{ backgroundColor: this.state.shift == 'a' ? 'goldenrod' : 'transparent' }}
                            onClick={() => this.changeState('shift', 'a')}
                        >
                            AM
                        </div>
                        <div
                            className=" col s6"
                            style={{ backgroundColor: this.state.shift == 'p' ? '#866e84' : 'transparent' }}
                            onClick={() => this.changeState('shift', 'p')}
                        >
                            PM
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className=" col s4"
                            style={{ backgroundColor: this.state.floor == '1' ? 'red' : 'transparent' }}
                            onClick={() => this.changeState('floor', '1')}
                        >
                            1
                        </div>
                        <div
                            className=" col s4"
                            style={{ backgroundColor: this.state.floor == '2' ? 'DodgerBlue' : 'transparent' }}
                            onClick={() => this.changeState('floor', '2')}
                        >
                            2
                        </div>
                        <div
                            className=" col s4"
                            style={{ backgroundColor: this.state.floor == '3' ? 'LimeGreen' : 'transparent' }}
                            onClick={() => this.changeState('floor', '3')}
                        >
                            3
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className=" col s4"
                            style={{ backgroundColor: this.state.floor == 'LL' ? 'Tomato' : 'transparent' }}
                            onClick={() => this.changeState('floor', 'LL')}
                        >
                            LL
                        </div>
                        <div
                            className=" col s4"
                            style={{ backgroundColor: this.state.floor == 'MB' ? 'LightSkyBlue' : 'transparent' }}
                            onClick={() => this.changeState('floor', 'MB')}
                        >
                            MB
                        </div>
                        <div
                            className=" col s4"
                            style={{ backgroundColor: this.state.floor == 'TR' ? 'LightGreen' : 'transparent' }}
                            onClick={() => this.changeState('floor', 'TR')}
                        >
                            TR
                        </div>


                    </div>


                    <div className='divider' />
                    <br />

                    <div className="row ">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">lock_open</i>
                            <input
                                id={"icon_prefix_"}
                                type="number" pattern="[0-9]*"
                                inputMode="numeric"
                                className="validate"
                                value={this.state.inputVal}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor={"icon_prefix_" }>Pin</label>
                        </div>
                        <div
                            className=" col s3"
                            style={{ backgroundColor: this.state.SLRole == 'b' ? 'Orange' : 'transparent' }}
                            onClick={() => this.changeState('SLRole', 'b')}
                        >
                            BEV
                        </div>
                        <div
                            className=" col s3"
                            style={{ backgroundColor: this.state.SLRole == 't' ? 'yellow' : 'transparent' }}
                            onClick={() => this.changeState('SLRole', 't')}
                        >
                            TeeLine
                        </div>
                    </div>


                    <div className='divider' />
                    <br />
                    <a
                        className="waves-effect waves-teal btn col s4 pulse"
                        onClick={() => this.handleFormSubmit()}
                    >
                        Make That Bread
                        </a>
                </div>
            </div>
        );
    }
}

export default NewUser;