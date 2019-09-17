'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const pinSchema = new Schema(
    {
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
        role: {
            enum: ['admin', 'slb', 'slt'],
            lowercase: true,
            required: true,
            trim: true,
            type: String
        },
        floor: {
            enum: [1, 2, 3],
            lowercase: true,
            trim: true,
            type: Number
        },
        shift: {
            enum: ['am', 'pm'],
            lowercase: true,
            trim: true,
            type: String
        }

    }
);

// Create Pin model
const Pin = mongoose.model('Checkout', pinSchema);

module.exports = Pin;
