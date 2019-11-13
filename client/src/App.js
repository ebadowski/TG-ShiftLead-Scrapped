import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import { Header } from './components/common';
import {
    Floorplan
} from './components/Pages';
import API from './utils/API';


class App extends Component {
    state = {
        links: {
            admin: ['dashboard'],
            user: ['dashboard']
        },
        init: true,
        path: '',
        sessionToken: ''
    };

    componentDidMount() {
        const sessionToken = localStorage.getItem('sessionid');
        const state = {};
        state.init = false; // Allow original path to be stored in state by avoiding redirect after initial render
        state.path = window.location.pathname;

        if (sessionToken) {
            // this.getSessionUser(sessionToken);
            state.sessionToken = sessionToken;
        } else {
            // state.switchState = 'login';
        }

        this.setState(state);
    }


    render() {
        return (
            <div>
                <Header
                    sessionToken={this.state.sessionToken}
                />
                <Floorplan
                    sessionToken={this.state.sessionToken}
                />
            </div>
        )
    }
}

export default App;

