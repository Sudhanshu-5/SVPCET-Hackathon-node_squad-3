const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
const ProfileSchema = new mongoose.Schema({
    year: {
        type: String,
         default:"Add class/year/job" 
    },
    lang: {
        type: String,
        default:"Add all languages known at that time"
    },
    tech: {
        type: String,
        default:"known technology stack"
    },
    comproject: {
        type: String,
        default:"complete projects"
    },
    comprojectdesc: {
        type: String,
        default:" project description"
    },
    incproject: {
        type: String,
        default:"incomplete projects"
    },
    incprojectdesc: {
        type: String,
        default:"project description"
    },
    codingplat: {
        type: String,
        default:"coding platforms used"
    },
    failures: {
        type: String,
        default:"list failures"
    }
});
ProfileSchema.plugin(passportLocalMongoose);
module.exports =  mongoose.model('profile', ProfileSchema);