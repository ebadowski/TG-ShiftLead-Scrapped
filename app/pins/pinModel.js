'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const pinSchema = new Schema(
    {
        pin: {
            type: String,
            required: true
        },
        salt: {
            required: true,
            type: String
        },
        role: {
            enum: [
                'admin',
                '1slba',
                '1slta',
                '1slbp',
                '1sltp',
                '2slba',
                '2slta',
                '2slbp',
                '2sltp',
                '3slba',
                '3slta',
                '3slbp',
                '3sltp',
            ],
            lowercase: true,
            required: true,
            trim: true,
            type: String
        },
        session: {
            default: null,
            type: String
        }

    },
    { timestamps: true }
);

// Create Pin model
const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
