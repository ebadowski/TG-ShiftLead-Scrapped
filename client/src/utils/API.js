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
    createNewCheckout: (session, body) => {
        return axios.post('/api/checkout', body)
    }


}