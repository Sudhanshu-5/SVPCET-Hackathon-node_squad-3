var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
// var middleware = require("./middleware");
var methodOverride = require("method-override");
var back = require('express-back'); //access previous paths
var app = express();
require('dotenv').config(); //for env variables
// const moment = require('moment-timezone');
var chatRoute = require("./routes/chat.js");

// var indexRoute = require("./routes/index.js");



const {
    asyncify
} = require("async");


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
app.use(back());

//!passport config
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(user.authenticate()));
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());




//!passing data to all the tempelates
// app.use(function (req, res, next) {
//     res.locals.currentUser = req.user;

 

//     next();
// });


//login
app.get("/login", function(req, res){
    res.render("/auth/login.ejs");
});

//handle login logic
app.post("/auth/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/"
    }) ,function(req, res){

});

//show sign-up form
app.get("/register", function(req, res){
    res.render("/auth/register.ejs");
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("auth/register.ejs");
        }
        else{
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
    res.render("homepage.ejs");
});



// app.use(mealsRoute);




app.use(chatRoute);

app.listen(process.env.PORT || 3000, function () {
    console.log("app started");
});