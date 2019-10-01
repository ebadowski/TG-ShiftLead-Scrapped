'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashpass');
const uuidv4 = require('uuid/v4');

// Require User model
const Pin = require('./pinModel');

// Require users auth controller
const auth = require('../auth/auth');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /api/users
router
    .route('/')
    // GET route for listing all users sorted by id, with the most recent users appearing first
    // .get(auth.authenticate, function (req, res) {
    .get(function (req, res) {
        console.log(req.params)
        const query = utils.format.query(req.query);

        Pin.find(query)
            // .populate({
            //     path: 'checkouts',
            //     populate: { path: 'items' },
            //     options: { sort: { _id: -1 } }
            // })
            .sort({ _id: -1 })
            .then(function (users) {
                res.status(200).json(
                    users.map(user => utils.format.usersResponse(user))
                );
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a user
    // .post(auth.authenticate, function (req, res) {
    .post(function (req, res) {
        const pin = hashPass(req.body.pin);
        const request = {
            pin: pin.hash,
            salt: pin.salt,
            role: req.body.role
        };
        console.log(pin)

        // if (request.role === 'admin') {
        //     const uuid = uuidv4();
        //     request.token = uuid;
        // }

        Pin.create(request)
            .then(function (user) {
                // const response = utils.format.usersResponse(user);

                // if (user.token) {
                //     response.token = user.token;
                // }

                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating a user by id
    // .patch(auth.authenticate, function (req, res) {
    .patch(function (req, res) {
        if (req.body.pin) {
            const pin = hashPass(req.body.pin);
            req.body.pin = pin.hash;
            req.body.salt = pin.salt;
        }

        Pin.findOneAndUpdate({ role: req.body.role }, req.body)
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
//         Pin.findById(req.params._id)
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
//         if (req.body.pin) {
//             const pin = hashPass(req.body.pin);
//             req.body.pin = pin.hash;
//             req.body.salt = pin.salt;
//         }

//         Pin.findOneAndUpdate({ role: req.params.role }, req.body)
//             .then(function (user) {
//                 res.status(200).json(user);
//             })
//             .catch(function (err) {
//                 res.status(500).json(err);
//             });
//     })
//     // DELETE route for deleting a user by id
//     .delete(auth.authenticate, function (req, res) {
//         Pin.deleteOne({ _id: req.params._id })
//             .then(function (user) {
//                 res.status(200).json(user);
//             })
//             .catch(function (err) {
//                 res.status(500).json(err);
//             });
//     });

module.exports = router;
