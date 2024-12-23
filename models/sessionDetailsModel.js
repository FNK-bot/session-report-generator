const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('./userModel');


const sessionSchema = new mongoose.Schema({
    students: {
        type: Array,
        required: true
    },
    coordinators: {
        type: Array,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
    batch: {
        type: Array,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema"

    },

});
module.exports = mongoose.model('SessionSchema', sessionSchema);