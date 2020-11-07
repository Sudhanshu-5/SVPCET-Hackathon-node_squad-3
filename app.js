var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var User = require("./models/User");
var Message = require("./models/Message");
var Profile = require("./models/Profile");
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('dotenv').config();
// const moment = require('moment-timezone');


//requiring routes
var guidanceRoute = require("./routes/guidance.js");
var serverRoute = require("./routes/server.js");
var profileRoute = require("./routes/profile.js");

var postsRoute= require("./routes/posts.js");
var middleware = require("./");


//
//!depreciate related stuff
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//!mongo atlas connection String
mongoose.connect("mongodb://sudhanshu:sudhanshu@cluster0-shard-00-00-7nbwd.mongodb.net:27017,cluster0-shard-00-01-7nbwd.mongodb.net:27017,cluster0-shard-00-02-7nbwd.mongodb.net:27017/helpmE?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERRORs:', err.message);
});


//!app config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "going to know u soon",
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride("_method"));
app.use(express.static("./public"));

app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

app.use(require("express-session")({
    secret: "going to know u soon",
    resave: false,
    saveUninitialized: false
}));

//!passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//!passing data to all the tempelates
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;

    next();
});


//login
app.get("/login", function(req, res){
    res.render("auth/login.ejs");
});

//handle login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/"
    }) ,function(req, res){

});

//show sign-up form
app.get("/register", function(req, res){
    res.render("auth/register");
});

//handle sign up logic
app.post("/register", function (req, res) {
    console.log(req.body.name)
    var newUser = new User({
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        dob: req.body.dob,
        mobileno:req.body.mobileno,
        username: req.body.username,
       });
    User.register(newUser, req.body.password,function(err, user){
        if(err){
            console.log(err);
            return res.render("auth/register");
        }
        else {
            const profile = new Profile();
            profile.save();
            user.profile.push(profile);
            user.save(function (err, addedData) {
            })
             console.log(profile+"profile")   
            console.log("uuser"+user)
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });


});

//logout
app.get("/auth/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


app.get("/", function (req, res) {
    res.render("homepage");
});

app.use("/profile", profileRoute);

// app.use(postsRoute);
app.use("/",serverRoute);
app.use(guidanceRoute);
// app.use(middleware);


app.use("/",serverRoute);
app.use(postsRoute)
app.listen(process.env.PORT || 3000, function () {
    console.log("app started");
});

// FAQ page
app.get("/FAQ", function(req, res){
    res.render("FAQ/faq.ejs");
});