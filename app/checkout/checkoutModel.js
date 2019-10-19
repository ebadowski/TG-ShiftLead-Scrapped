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
            bev: {
                default: null,
                type: String
            },
            teeline: {
                default: null,
                type: String
            },
            rolls: {
                default: null,
                type: Number
            },
            folds: {
                default: null,
                type: Number
            }
        },
        slCheckout: {
            BVsidework: {
                default: false,
                type: Boolean
            },
            TLsidework: {
                default: false,
                type: Boolean
            },
            rolls: {
                default: false,
                type: Boolean
            },
            folds: {
                default: false,
                type: Boolean
            }
        },
        adminCheckout: {
            default: false,
            type: Boolean
        },
        modCheckout: {
            default: false,
            type: Boolean
        },
        comments: {
            default: null,
            type: String
        }
    },
    { timestamps: true }
);

// Create Checkout model
const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
