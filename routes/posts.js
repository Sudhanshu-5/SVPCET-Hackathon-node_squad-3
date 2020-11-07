var express = require("express");
var router = express.Router();
var post = require("../models/posts");
var multer = require('multer');

require("dotenv").config();


var middleware = require("./index");






router.get('/posts',middleware.isLoggedIn, function (req, res) {
  console.log("inside")
  res.render("posts/showPost");    
  
})

router.post('/posts', (req, res) => {
 
  
})


module.exports = router;