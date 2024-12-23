const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const sessionSchema = new mongoose.Schema({
    students: {
        type: Array,
        required: true
    },
    cordinators: {
        type: Array,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    startTiming: {
        type: Number,
        required: true
    },
    endTiming: {
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('SessionSchema', userSchema);