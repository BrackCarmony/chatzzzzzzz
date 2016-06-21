var express = require("express");
var app = express();
var serverConfig = require("./../server_config.js");
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var _ = require('underscore');
var port = serverConfig.serverPort;

var mongoUri = "mongodb://localhost:27017/freecodecamp";
var db;
var challenges;

MongoClient.connect(mongoUri, function(err, dbres){
  console.log("Connect to mongoDB");
  db = dbres;
  challenges = db.collection('challenge');
});

app.use(express.static(__dirname+'/../public'));
app.use(bodyParser.json())

app.get('/admin/challenges', function(req, res, next){
  challenges.find({},
    {isRequired:1, name:1, order:1, isBeta:1,
      isComingSoon:1, block:1, superBlock:1,
      suborder:1, superOrder:1, _id:1 })
  //.sort({suborder:1}).sort( {order:1}).sort({superOrder:1})
  .sort({superOrder:1})
  .toArray(function(err, docs){
    res.send(docs);
  })
})

// console.log(MongoClient);

app.put('/admin/challenges', function(req, res, next){
  console.log(req.body);
  var id = ObjectId(req.body._id);
  delete req.body._id;
  challenges.findOneAndUpdate({_id:id}, {$set:req.body},
    function(err, response){
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }

      console.log(response);
      return res.send(response);
    })
})


app.listen(port, function(){
  console.log("Listeing on port ", port);
});
