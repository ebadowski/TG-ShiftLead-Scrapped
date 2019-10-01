'use strict';

// Dependencies
const router = require('express').Router(); // Create a Router instance
const hashPass = require('hashpass');
const uuidv4 = require('uuid/v4');

// Require Staff model
const Staff = require('./staffModel');

// Require users auth controller
const auth = require('../auth/auth');

// Require utilities
const utils = require('../utils');

// Routes
// Matches with /api/staff
router
    .route('/')
    // GET route for listing all staff sorted by name
    // .get(auth.authenticate, function (req, res) {
    .get(function (req, res) {
        console.log(req.params)
        const query = utils.format.query(req.query);

        Staff.find(query)
            .select('checkouts name')
            .populate({
                path: 'checkouts',
                options: { sort: { _id: -1 } }
            })
            .sort({ 'name.last': 1 })
            .then(function (staff) {
                res.status(200).json(
                    staff.map(user => utils.format.usersResponse(user))
                );
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // POST route for creating a user
    //.post(auth.authenticate, function (req, res) {
    .post(function (req, res) {
        const pin = hashPass(req.body.pin);
        const request = {
            name: req.body.name,
            pin: pin.hash,
            salt: pin.salt
        };

        // if (request.role === 'admin') {
        //     const uuid = uuidv4();
        //     request.token = uuid;
        // }

        Staff.create(request)
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
    });

// Matches with /api/staff/:_id
router
    .route('/:_id')
    // GET route for retrieving a user by id
    .get(auth.authenticate, function (req, res) {
        Staff.findById(req.params._id)
            .populate({
                path: 'checkouts',
                options: { sort: { _id: -1 } }
            })
            .then(function (user) {
                res.status(200).json(utils.format.usersResponse(user));
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // PATCH route for updating a user by id
    .patch(auth.authenticate, function (req, res) {
        if (req.body.pin) {
            const pin = hashPass(req.body.pin);
            req.body.pin = pin.hash;
            req.body.salt = pin.salt;
        }

        Staff.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
            .populate({
                path: 'checkouts',
                options: { sort: { _id: -1 } }
            })
            .then(function (user) {
                res.status(200).json(utils.format.usersResponse(user));
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    })
    // DELETE route for deleting a user by id
    .delete(auth.authenticate, function (req, res) {
        Staff.deleteOne({ _id: req.params._id })
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    });

module.exports = router;
