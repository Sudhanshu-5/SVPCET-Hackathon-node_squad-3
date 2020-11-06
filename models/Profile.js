const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    avatar: {
        type: String
    },
    dob: {
        type: Date,
        required
    }
});

module.exports = Profile = mongoose.model('user', ProfileSchema);