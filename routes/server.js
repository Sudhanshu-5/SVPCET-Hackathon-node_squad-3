var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var http = require('http').Server(router);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var Message = require("../models/Message");

router.use(express.static(__dirname));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}))

// var Message = mongoose.model('Message',{
//   name : String,
//   message : String
// })

// var dbUrl = 'mongodb://username:password@ds257981.mlab.com:57981/simple-chat'

router.get("/messages", (req, res) => {
  Message.find({}, function(err, message){
      if(err){
          console.log(err);
      }
      else{
          res.render("./chat/index", {message: message});
      }
  })
})

router.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.redirect("./chat/index");
  })
})

io.on('connection', () =>{
  console.log('a user is connected')
})

// mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
//   console.log('mongodb connected',err);
// })

// var server = http.listen(3001, () => {
//   console.log('server is running on port', server.address().port);
// });

module.exports = router;