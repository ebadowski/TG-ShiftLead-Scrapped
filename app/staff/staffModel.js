'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const staffSchema = new Schema(
    {
        name: {
            first: { type: String, trim: true, lowercase: true },
            last: { type: String, trim: true, lowercase: true }
        },
        pin: {
            type: String,
            required: true
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
        ]

    }
);

// Create Pin model
const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
