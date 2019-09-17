'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const staffSchema = new Schema(
    {
        name: {
            required: true,
            first: { type: String, trim: true, lowercase: true },
            last: { type: String, trim: true, lowercase: true }
        },
        pin: {
            type: Number,
            required: true,
            min: 0000,
            max: 9999
        },
        salt: {
            required: true,
            type: String
        },
        checkouts: [
            {
                ref: 'Checkout',
                type: Schema.Types.ObjectId
            }
        ],

    }
);

// Create Pin model
const Staff = mongoose.model('Checkout', staffSchema);

module.exports = Staff;
