import React, { Component } from 'react';
import M from 'materialize-css';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import { Header } from './components/common';
import {
    Floorplan,
    NewUser
} from './components/Pages';
import API from './utils/API';

let roles = ['1ab', '1at', '1pb', '1pt', '2ab', '2at', '2pb', '2pt', '3ab', '3at', '3pb', '3pt'];

class App extends Component {
    state = {
        links: {
            admin: ['dashboard'],
            user: ['dashboard']
        },
        init: true,
        path: '',
        sessionToken: '',
        newUser: true,
        userRole: '',
        userShiftLead: false


    };

    componentDidMount() {
        M.AutoInit();
        const sessionToken = localStorage.getItem('sessionid');
        const state = {};
        state.init = false; // Allow original path to be stored in state by avoiding redirect after initial render
        state.path = window.location.pathname;

        this.checkUser();

        if (sessionToken) {
            // this.getSessionUser(sessionToken);
            state.sessionToken = sessionToken;
        } else {
            // state.switchState = 'login';
        }

        this.setState(state);
    }

    //checks if returning user, sets appropriate state accordingly
    checkUser() {
        let pin = sessionStorage.getItem("pin");
        let role = sessionStorage.getItem("role");

        if (pin && role) {
            this.checkPin(pin, role)
        }
    }

    //verifies pin for existing role
    checkPin(pin, role) {
        API.checkPin(pin, role)
            .then(response => {
                console.log(response);
                this.setState({ newUser: false, userShiftLead: true, userRole: role })
                sessionStorage.setItem("pin", pin);
                sessionStorage.setItem("role", role);
            })
            .catch(function (error) {
                console.log(error);
                sessionStorage.removeItem('pin');
                M.toast({html:'Invalid Pin'})
            });
        console.log(pin)
    }

    userSubmit(shift, floor, pin, role){
        console.log(shift, floor, pin, role)
        if(shift && floor){
            sessionStorage.setItem("role", floor+shift);
            if(pin && role){
                sessionStorage.setItem("role", floor+shift+role);
               this.checkPin(pin, floor+shift+role) 
            }
            else if (pin || role){
                M.toast({html:'Enter Pin and Role'})
            }
            else{
                this.setState({ newUser: false})
            }
        }
        else {
            M.toast({html:'Select Floor and Shift'})
        }
    }




    render() {
        return (
            <div>
                <Header
                    sessionToken={this.state.sessionToken}
                />


                {
                    this.state.newUser
                        ? <NewUser
                        userSubmit={(shift, floor, pin, role) => this.userSubmit(shift, floor, pin, role)}
                        />
                        : <Floorplan
                            sessionToken={this.state.sessionToken}
                            userRole={this.state.userRole}
                            userShiftLead={this.state.userShiftLead}
                            checkPin={(pin, role) => this.checkPin(pin, role)}
                        />
                }


            </div>
        )
    }
}

export default App;

