import React, { Component } from 'react';

import moment from 'moment';
import M from 'materialize-css';
//import { Autocomplete } from "react-materialize";
import axios from 'axios';


import API from '../../../utils/API';



import './style.css';



class NewUser extends Component {


    constructor(props) {
        super(props);
        // // Bind the this context to the handler function
        // //this.updateOnNewItem = this.updateOnNewItem.bind(this);

        // Set some state
        this.state = {
           
        };

        // Bind the this context to the handler function
       // this.switchView = this.switchView.bind(this);
    }

    componentDidMount() {
        
        M.AutoInit();

        
    }
    componentDidUpdate() {
        M.AutoInit();
       
    }



    render() {
        
        return (
            <div>
               
            </div >
        );
    }
}

export default NewUser;