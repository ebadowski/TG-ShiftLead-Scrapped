import axios from 'axios';
import moment from 'moment';

export default {

    // STAFF
    getAllStaff: session => {
        return axios.get('/api/staff', {
            // headers: {
            //     'x-session-token': session
            // }
        });
    },


    // CHECKOUT
    getAllCO: session => {
        return axios.get('/api/checkout', {
            // headers: {
            //     'x-session-token': session
            // }
        });
    },
    getOneCO: (session, coid) => { //coid is checkout id
        return axios.get('/api/checkout/find/' + coid, {
            // headers: {
            //     'x-session-token': session
            // }
        })
        .then(res => {
            return res.data;
        });
    },
    getCOFromDate: (session, date) => {
        // start today
        var start = moment(date).startOf('day');
        // end today
        var end = moment(date).endOf('day');

        return axios.get('/api/checkout/date', {
            headers: {
                //'x-session-token': session
                'start': start.toString(),
                'end': end.toString()
            }
        });
    },
    updateTestSet: (session, date) => {
        // start today
        var start = moment(date).startOf('day');
        // end today
        var end = moment(date).endOf('day');
        // today
        var today = moment()

        return axios.get('/api/checkout/updatetest', {
            headers: {
                //'x-session-token': session
                'start': start.toString(),
                'end': end.toString(),
                'today': today.toString()
            }
        });
    },

    createNewCheckout: (session, body) => {
        return axios.post('/api/checkout', body)
    },
    updateCheckout: (session, body, id) => {
        return axios.patch('/api/checkout/find/' + id, body)
    },
    checkOff: (val, target, staffID) => {
        return axios.get('/api/checkout/update/' + staffID, { 
            headers:{
                'target': target, 
                'val': val 
            }
            
        })
    },


    // LOGIN
    checkPin: (pin, role, session) => {
        return axios.post('/api/pin/login', { role: role, pin: pin })
    }



}