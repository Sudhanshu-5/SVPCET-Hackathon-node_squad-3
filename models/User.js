const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
     username: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
     
   
    gender: {
        type: String
    },
    email: {
        type: String
    },
    password: String,
    mobileno: {
        type: Number,
    },
    avatar: {
        type: String
    },
    dob: {
        type: Date
    },
    profile: [{
        
            type: mongoose.Schema.Types.ObjectId,
            ref: "profile"
        

    }]
});
UserSchema.plugin(passportLocalMongoose);

module.exports =  mongoose.model('user', UserSchema);