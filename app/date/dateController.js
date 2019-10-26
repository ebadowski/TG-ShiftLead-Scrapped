'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance


// Require User model
const Dates = require('./dateModel');

// Require users auth controller
const auth = require('../auth/auth');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /api/date
router
    .route('/')
    // GET route for listing all d sorted by id, with the most recent users appearing first
    // .get(auth.authenticate, function (req, res) {
    .get(function (req, res) {
        console.log(req.params)
        const query = utils.format.query(req.query);

        Dates.find(query)

            .sort({ _id: -1 })
            .then(function (users) {
                res.status(200).json(

                );
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a new date
    // .post(auth.authenticate, function (req, res) {
    .post(function (req, res) {
        // switch 'today' field in last date doc to false
        // Dates.findOneAndUpdate({ today: true }, { $set: { today: false } })
        //     .then(
                Dates.create(req)
                .then(function (user) {
                    res.status(200).json(user);
                })
                .catch(function (err) {
                    res.status(500).json(err);
                })
                //);



    })
    // PATCH route for updating a user by id
    // .patch(auth.authenticate, function (req, res) {
    .patch(function (req, res) {
        if (req.body.Dates) {
            const Dates = hashPass(req.body.Dates);
            req.body.Dates = Dates.hash;
            req.body.salt = Dates.salt;
        }

        Dates.findOneAndUpdate({ role: req.body.role }, req.body)
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })

// // Matches with /api/users/:_id
// router
//     .route('/:_id')
//     // GET route for retrieving a user by id
//     .get(auth.authenticate, function (req, res) {
//         Dates.findById(req.params._id)
//             .populate({
//                 path: 'checkouts',
//                 populate: { path: 'items' },
//                 options: { sort: { _id: -1 } }
//             })
//             .then(function (user) {
//                 res.status(200).json(utils.format.usersResponse(user));
//             })
//             .catch(function (err) {
//                 res.status(500).json(err);
//             });
//     })
//     // PATCH route for updating a user by id
//     // .patch(auth.authenticate, function (req, res) {
//     .patch(function (req, res) {
//         if (req.body.Dates) {
//             const Dates = hashPass(req.body.Dates);
//             req.body.Dates = Dates.hash;
//             req.body.salt = Dates.salt;
//         }

//         Dates.findOneAndUpdate({ role: req.params.role }, req.body)
//             .then(function (user) {
//                 res.status(200).json(user);
//             })
//             .catch(function (err) {
//                 res.status(500).json(err);
//             });
//     })
//     // DELETE route for deleting a user by id
//     .delete(auth.authenticate, function (req, res) {
//         Dates.deleteOne({ _id: req.params._id })
//             .then(function (user) {
//                 res.status(200).json(user);
//             })
//             .catch(function (err) {
//                 res.status(500).json(err);
//             });
//     });

module.exports = router;
