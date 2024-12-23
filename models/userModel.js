const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: false,
        sparse: true,
    },
    isDetailsShared: {
        type: Boolean,
        required: true
    },
    image: {
        type: String
    },
    googleId: {
        type: String
    }

});


module.exports = mongoose.model('User', userSchema);