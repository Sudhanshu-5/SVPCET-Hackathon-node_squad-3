var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    username: String
});

module.exports = mongoose.model("Comment", commentSchema);