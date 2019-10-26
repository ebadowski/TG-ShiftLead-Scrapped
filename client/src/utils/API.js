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

    createNewCheckout: (session, body) => {
        return axios.post('/api/checkout', body)
    }


}