var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
// var middleware = require("../");
// var { isLoggedIn, checkUserComment } = middleware;


//get route
router.get("/guidance", function (req, res) {
    Comment.find(req.params.id, function(err, comment){
        if(err){
            console.log(err);
        }
        else{
            res.render("./guidance/guidance.ejs", {comment: comment});
        }
    });
});

//comments new
// router.get("/guidance/new", middleware.isLoggedIn, function(req, res){
//     Comment.find(req.params.id, function(err, comment){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.render("comments/new", {campground: campground});
//         }
//     });
// });

//COMMENT CREATE ROUTE
router.post("/guidance", function(req, res){
    Comment.create(req.body.comment, function(err, comment){
        if(err){
            console.log(err);
        }
        else{
            comment.save();
            res.redirect("/guidance");
        }
    });
});


module.exports = router;