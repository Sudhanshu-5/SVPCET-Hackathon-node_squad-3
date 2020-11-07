var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var mesageSchema = new mongoose.Schema({
    name: String,
    message: String   
});

mesageSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Message", mesageSchema);

// var Message = mongoose.model(‘Message’,{ name : String, message : String});