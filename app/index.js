'use strict';

// Dependencies
const path = require('path');
const router = require('express').Router(); // Create a Router instance

// Require all API routes
const checkout = require('./checkouts');
const staff = require('./staff');
const contest = require('./contested')

// Require authentication routes
const auth = require('./auth');


// API routes
router.use('/api/checkout', checkout.controller);
router.use('/api/staff', staff.controller);
router.use('/api/contest', contest.controller);

// Authentication routes
router.use('/auth/login', auth.login);
router.use('/auth/session', auth.session);


// If no API routes are hit, send React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
