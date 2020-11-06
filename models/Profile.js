const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
const ProfileSchema = new mongoose.Schema({
    year: {
        type: String,
        
    },
    lang: {
        type: String
    },
    tech: {
        type: String
    },
    comproject: {
        type: String
    },
    comprojectdesc: {
        type: String
    },
    incproject: {
        type: String
    },
    incprojectdesc: {
        type: String
    },
    codingplat: {
        type: String
    },
    failures: {
        type: String
    }
});
ProfileSchema.plugin(passportLocalMongoose);
module.exports = Profile = mongoose.model('profile', ProfileSchema);