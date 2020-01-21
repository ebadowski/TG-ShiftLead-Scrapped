import React, { Component } from 'react';

import M from 'materialize-css';


import './style.css';

class HdrSLLogin extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            buttonClicked: false,
            inputVal: ''
        };
    }

    componentDidMount() {



    }

    componentWillReceiveProps(nextProps) {
        this.setState({

        });
    }

    handleInputChange = event => {
        this.setState({ inputVal: event.target.value });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.props.shiftLeadLogin(this.state.inputVal)
    }


    // shiftLeadLogin(pin) {
    //     let bevAttempt = this.state.floor + "slb" + (this.state.shift ? 'p' : 'a')
    //     let teeAttempt = this.state.floor + "slt" + (this.state.shift ? 'p' : 'a')
    //     console.log(pin)
    //     console.log(bevAttempt, teeAttempt)
    //     API.checkPin(pin, bevAttempt)
    //         .then(response => {
    //             console.log(response);
    //             //this.setState({ SLCode: response.data.role })
    //             this.setState({ SLCode: true })
    //             //this.forceUpdate()
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    //     API.checkPin(pin, teeAttempt)
    //         .then(response => {
    //             console.log(response);
    //             //this.setState({ SLCode: response.data.role })
    //             this.setState({ SLCode: true })
    //             //this.forceUpdate()
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    // }



    render() {
        return (
            <li>
                {
                    this.state.buttonClicked
                        ? <form
                            className="col s12"
                            style={{ paddingTop: "5%" }}
                            onSubmit={this.handleFormSubmit}
                        >
                            <div className="row ">
                                <div className="input-field col s6 offset-s2">
                                    <i className="material-icons prefix">lock_open</i>
                                    <input
                                        id={"icon_prefix_"}
                                        type="number" pattern="[0-9]*"
                                        inputMode="numeric"
                                        className="validate"
                                        value={this.state.inputVal}
                                        onChange={this.handleInputChange}
                                    />
                                    <label htmlFor={"icon_prefix_"}>Pin</label>
                                </div>
                            </div>
                        </form>
                        :
                        <a
                            className=""
                            onClick={() => this.setState({ buttonClicked: true })}
                        >
                            SL Login</a>

                }
            </li>

        );
    }
}

export default HdrSLLogin;
