import React, { Component } from 'react';

import M from 'materialize-css';


import './style.css';

class SLLogin extends Component {
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



    render() {
        return (

            <div className="row">
                <ul className="collection">
                    <li className="collection-item avatar">
                        <i className="material-icons circle">local_drink</i>
                        <span className="title"> Bev Side Work</span>
                        <p>{this.props.staff.tasks.bev}</p>
                    </li>
                    <li className="collection-item avatar">
                        <i className="material-icons circle">golf_course</i>
                        <span className="title"> Tee Line Side Work</span>
                        <p>{this.props.staff.tasks.teeline}</p>
                    </li>
                </ul>
                <div className='divider' />

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
                                    id={"icon_prefix_" + (this.props.staff.name.replace(/ /g, '_'))} 
                                    type="number" pattern="[0-9]*" 
                                    inputMode="numeric" 
                                    className="validate" 
                                    value={this.state.inputVal}
                                    onChange={this.handleInputChange}
                                    />
                                    <label htmlFor={"icon_prefix_" + (this.props.staff.name.replace(/ /g, '_'))}>Pin</label>
                                </div>
                            </div>
                        </form>
                        : <div className="center" style={{ paddingTop: "5%" }}>
                            <a
                                className="waves-effect waves-orange btn-large btn-flat center"
                                onClick={() => this.setState({ buttonClicked: true })}
                            >
                                SL <i className="material-icons">lock_open</i> Login
                            </a>
                        </ div>
                }

            </div>

        );
    }
}

export default SLLogin;
