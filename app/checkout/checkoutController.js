'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require Checkout model
const Checkout = require('./checkoutModel');

// Require users helper modules
const staff = {
    // Avoid cyclic dependency by requiring direct path to users attach module
    attach: require('../staff/staffAttach').attach,
    detach: require('../staff/staffAttach').detach,
    exists: require('../staff/staffExists').exists
};

// Require users auth controller
const auth = require('../auth/auth');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /api/checkout
router
    .route('/')
    // GET route for listing all checkouts sorted by id, with the most recent checkouts appearing first
    // .get(auth.authenticate, function (req, res) {
    .get(function (req, res) {
        const query = utils.format.query(req.query);

        Checkout.find(query)
            .populate({ path: 'staffID', options: { sort: { _id: -1 } } })
            .sort({ _id: -1 })
            .then(function (checkout) {
                res.status(200).json(checkout);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a checkout
    // .post(auth.authenticate, staff.exists, function (req, res) {
    .post(function (req, res) {
        Checkout.create(req.body)
            .then(function (checkout) {
                Checkout.findById(checkout._id)
                    //.populate({ path: 'staffID', options: { sort: { _id: -1 } } })
                    .then(function (dbCheckout) {
                        res.status(200).json(dbCheckout);

                        // // Attach the checkout to a user
                        // return users.attach(
                        //     { _id: dbCheckout.user },
                        //     { checkouts: dbCheckout._id }
                        // );

                    })
                    .catch(function (err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });


    // Matches with /api/checkouts/update/:_id
router
.route('/update/:_id')
// PATCH route for updating a checkout by staff id
// .patch(auth.authenticate, function (req, res) {
.get(function (req, res) {
    Checkout.findOneAndUpdate({ staffID: req.params._id },{"$set":{[req.headers['target']]: req.headers['val']}},  {
        new: true
    })
        //.populate({ path: 'staff', options: { sort: { _id: -1 } } })
        .then(function (checkout) {
            res.status(200).json(checkout);

        })
        .catch(function (err) {
            res.status(500).json(err);
        });
})


// Matches with /api/checkouts/find/:_id
router
    .route('/find/:_id')
    // GET route for retrieving a checkout by id
    //.get(auth.authenticate, function (req, res) {
    .get(function (req, res) {
        Checkout.findById(req.params._id)
        .populate({ path: 'staffID', options: { sort: { _id: -1 } }  })
            .then(function (checkout) {
                res.status(200).json(checkout);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating a checkout by id
    // .patch(auth.authenticate, function (req, res) {
    .patch(function (req, res) {
        Checkout.findOneAndUpdate({ _id: req.params._id }, req.body, {
            new: true
        })
           //.populate({ path: 'staff', options: { sort: { _id: -1 } } })
            .then(function (checkout) {
                res.status(200).json(checkout);
                console.log(checkout)
            })
            .catch(function (err) {
                res.status(500).json(err);
                console.log(err)
            });
    })
    // DELETE route for deleting a checkout by id
    .delete(auth.authenticate, function (req, res) {
        Checkout.deleteOne({ _id: req.params._id })
            .then(function (checkout) {
                res.status(200).json(checkout);

            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

// Matches with /api/checkouts/date
router
    .route('/date')
    // GET route for retrieving checkouts from today
    //.get(auth.authenticate, function (req, res) {
    .get(function (req, res) {
        let query = { date: { $gte: req.headers['start'], $lt: req.headers['end'] } }
        Checkout.find(query)
        .populate( 'staffID', 'name checkouts' )
            .then(function (checkout) {
                res.status(200).json(checkout);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

    // Matches with /api/checkout/updatetest
router
.route('/updatetest')
// GET route for retrieving checkouts from today
//.get(auth.authenticate, function (req, res) {
.get(function (req, res) {
    let query = { date: { $gte: req.headers['start'], $lt: req.headers['end'] } }
    Checkout.updateMany(query,  {"$set":{date: req.headers['today']}})
        .then(function (checkout) {
            res.status(200).json(checkout);
        })
        .catch(function (err) {
            res.status(500).json(err);
        });
});


module.exports = router;
