var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var postSchema = new mongoose.Schema({
    text: String,
    images: String,
    vedios: String
});

postSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("post", postSchema);