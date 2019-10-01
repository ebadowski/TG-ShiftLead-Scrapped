'use strict';

// Dependencies
const mongoose = require('mongoose');

// Mongoose Schema constructor reference
const Schema = mongoose.Schema;

// Define Checkout schema
const contestedSchema = new Schema(
    {
        staffID: [
            {
                ref: 'Staff',
                type: Schema.Types.ObjectId,
                index: true
            }
        ],
        checkout:
        {
            ref: 'Checkout',
            type: Schema.Types.ObjectId
        },
        comment: {
            type: String,
            required: true
        }
    }
);

// Create Pin model
const Contest = mongoose.model('Contest', contestedSchema);

module.exports = Contest;
