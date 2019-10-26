'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const dateSchema = new Schema(
    {
        date: {
            required: true,
            type: Date
        },
        today: {
            default: false,
            type: Boolean
        },

    },
    { timestamps: true }
);

// Create Pin model
const Dates = mongoose.model('date', dateSchema);

module.exports = Dates;
