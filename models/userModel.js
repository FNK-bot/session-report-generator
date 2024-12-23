const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    batch: {
        type: String,
    },
    onBoarding: {
        type: Boolean,
        required: true
    },
    googleId: {
        type: String
    },
    sessionDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SessionSchema"
    }

});


module.exports = mongoose.model('UserSchema', userSchema);