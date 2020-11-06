const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    mobileno: {
        type: Number,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    dob: {
        type: Date,
        required: true
    },
    profile: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        },

    }
});

module.exports = User = mongoose.model('user', UserSchema);