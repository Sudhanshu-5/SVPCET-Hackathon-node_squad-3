var express = require("express");
var router = express.Router();   // new instance of the router
var mongoose = require("mongoose");     
var Profile = require("../models/Profile");
var User = require("../models/User");
var bodyParser = require('body-parser');
var middleware = require("./index");
const { findOneAndUpdate, findOne } = require("../models/User");


//get
router.get("/",middleware.isLoggedIn,async (req, res) => {
    try {
        let user = await User.find().populate("profile");
        res.render("profile/profile",{user:user})
    }
    catch (error) {
        console.log(error)
    }   
})
router.get("/my",middleware.isLoggedIn,async (req, res) => {
    try {
        // let user = await User.find().populate("profile");
        res.render("profile/myprofile",{user:req.user})
    }
    catch (error) {
        console.log(error)
    }   
});
router.post("/my",middleware.isLoggedIn,async (req, res) => {
    try {
        console.log("1111111111111" + JSON.stringify(req.body.info0))
        let result = await Profile.findOneAndUpdate({ year: req.body.info0.year }, req.body.info0, {
            new: true,
            upsert: true,
            // Return the raw result from the MongoDB driver
        });
        let userDoc = await User.findOne({ username: req.user.username });

        userDoc.profile.push(result);
        userDoc.save(function (err, addedData) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        //console.log("pushedandsavedData" + addedData);
                                    }
                                });
        res.redirect("/profile");
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

router.get("/new", function(req, res){
    res.render("/profile/newprofile");
});

//post
router.post("/new", function(req, res){    
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