'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance

// Require Contest model
const Contest = require('./contestedModel');

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
// Matches with /api/contest
router
    .route('/')
    // GET route for listing all checkouts sorted by id, with the most recent checkouts appearing first
    .get(auth.authenticate, function (req, res) {
        const query = utils.format.query(req.query);

        Contest.find(query)
            //.populate({ path: 'staffID', options: { sort: { _id: -1 } } })
            .sort({ _id: -1 })
            .then(function (contest) {
                res.status(200).json(contest);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a checkout
    .post(auth.authenticate, staff.exists, function (req, res) {
        Contest.create(req.body)
            // .then(function (contest) {
            //     Contest.findById(contest._id)
            //         //.populate({ path: 'staffID', options: { sort: { _id: -1 } } })
            //         .then(function (dbContest) {
            //             res.status(200).json(dbContest);

            //             // // Attach the checkout to a user
            //             // return users.attach(
            //             //     { _id: dbCheckout.user },
            //             //     { checkouts: dbCheckout._id }
            //             // );

            //         })
            //         .catch(function (err) {
            //             res.status(500).json(err);
            //         });
            // })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

// Matches with /api/contest/:_id
router
    .route('/:_id')
    // GET route for retrieving a checkout by id
    .get(auth.authenticate, function (req, res) {
        Contest.findById(req.params._id)
            //.populate({ path: 'staff', options: { sort: { _id: -1 } } })
            .then(function (contest) {
                res.status(200).json(contest);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating a checkout by id
    .patch(auth.authenticate, function (req, res) {
        Contest.findOneAndUpdate({ _id: req.params._id }, req.body, {
            new: true
        })
            //.populate({ path: 'staff', options: { sort: { _id: -1 } } })
            .then(function (contest) {
                res.status(200).json(contest);

            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // DELETE route for deleting a checkout by id
    .delete(auth.authenticate, function (req, res) {
        Contest.deleteOne({ _id: req.params._id })
            .then(function (contest) {
                res.status(200).json(contest);

            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
