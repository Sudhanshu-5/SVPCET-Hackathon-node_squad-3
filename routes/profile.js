var express = require("express");
var router = express.Router();   // new instance of the router
var mongoose = require("mongoose");     
var Profile = require("../models/Profile");
var User = require("../models/User");
var bodyParser = require('body-parser');
// var middleware = require("../middleware"); 


//get
router.get("/", async (req, res) => {
    try {
        let user = await User.find().populate("profile");
        res.render("profile/profile",{user:user})
    }
    catch (error) {
        console.log(error)
    }   
})
// router.get("/", async (req, res) =>{ 
    
//     tryuser.find()
//     Profile.find({}, function(err, allProfiles){
//         if(err){
//             console.log(err);
//         }
//         else{

//             res.render("/profile/profile",{profile: allProfiles, currentUser: req.user});

//         }
//     });
// });

//post
router.post("/", function(req, res){    
    var year = req.body.year;
    var lang = req.body.lang;
    var tech = req.body.tech;
    var comproject = req.body.comproject;
    var comprojectdesc = req.body.comprojectdesc;
    var incproject = req.body.incproject;
    var incprojectdesc = req.body.incprojectdesc;
    var codingplat = req.body.codingplat;
    var failures = req.body.failures;
   
    var newProfile = {year: year, lang: lang, tech: tech, comproject: comproject, comprojectdesc: comprojectdesc, incproject: incproject, incprojectdesc: incprojectdesc, codingplat: codingplat, failures: failures};

    Profile.create(newProfile, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/profile");  
        }
    });
});


// router.get("/:id", function (req, res) {
//     //find the campground with provided ID
//     Profile.findById(req.params.id).exec(function (err, foundProfile) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("profile/showprofile", {profile: foundProfile});
//         }
//     });
// });


// DESTROY CAMPGROUND ROUTE
// router.delete("/:id", function (req, res) {
//     Profile.findById(req.params.id, function (err, profile) {
//         if (err) {
//             res.redirect("/profile");
//         } else {
//             profile.remove();
//             res.redirect("/profile");
//         }
//     });
// });


module.exports = router;