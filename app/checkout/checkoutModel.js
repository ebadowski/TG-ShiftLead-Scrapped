'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const checkoutSchema = new Schema(
    {
        staffID: [
            {
                ref: 'Staff',
                type: Schema.Types.ObjectId,
                index: true
            }
        ],
        shiftLead: {
            type: Boolean,
            required: true
        },
        date: {
            required: true,
            type: Date
        },
        shift: {
            enum: ['am', 'pm'],
            lowercase: true,
            required: true,
            trim: true,
            type: String
        },
        floor: {
            enum: ['1', '2', '3', 'mb', 'tr'],
            lowercase: true,
            required: true,
            trim: true,
            type: String
        },
        bays: {
            start: Number,
            end: Number
        },
        tasks: {
            bev: String,
            teeline: String,
            rolls: Number,
            folds: Number
        },
        slCheckout: {
            sidework: Boolean,
            rolls: Boolean,
            folds: Boolean
        },
        adminCheckout: {
            type: Boolean
        },
        modCheckout: {
            type: Boolean
        },
        comments: {
            type: String
        }
    },
    { timestamps: true }
);

// Create Checkout model
const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
