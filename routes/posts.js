var express = require("express");
var router = express.Router();
var post = require("../models/posts");
var multer = require('multer');
require("dotenv").config();
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'rutuja', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


router.get('/posts', middleware.isLoggedIn, (req, res) => {
            

})

router.post('/posts', (req, res) => {
 
})


module.exports = router;