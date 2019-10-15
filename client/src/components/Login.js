import React, { Component } from 'react';
import API from '../utils/API.js';
import './style.css';

class Login extends Component {
    state = {
        pin: '',
        role
            : ''
    };

    handleChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        API.login({
            pin: this.state.pin,
            role: this.state.role
        })
            .then(res => {
                localStorage.setItem(
                    'sessionid',
                    res.headers['x-session-token']
                );
                this.props.login(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <div className="login">
                    <div className="container s9">
                        <div className="row">
                            <div className="card-panel white">

                                <form onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        {/* PUT ROLE TEXT HERE, NOT AN INPUT FIELD */}
                                        <div className="input-field col s12">
                                            <input
                                                id="role"
                                                name="role"
                                                type="REPLACE TYPE HERE!!!!!!!!!!!!!!!!!!!!!!"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="role">
                                                Email <span className="req">*</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* MASK INPUT USING JS CODE */}
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                id="pin"
                                                name="pin"
                                                type="number"
                                                className="validate"
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="pin">Password</label>
                                        </div>
                                    </div>
                                    <p>
                                        <button type="submit" className="btn btn-blue">
                                            Log in
                            </button>
                                    </p>
                                </form>

                            </div>
                        </div>




                    </div>







                </div>
            </div>
        );
    }
}

export default Login;
