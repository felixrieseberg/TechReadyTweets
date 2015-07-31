var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweets.js');
var Datastore = require('nedb');
var db = new Datastore({ filename: 'tr21', autoload: true});

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.find({}).sort({timestamp: -1}).exec(function(err, tweets)
    {
      if (err) {
        return next({status: 500});
      }
      
      return res.status(200).json({tweets: tweets});
    })
});

router.post('/', function(req, res, next) {
  if (!req.body.tweet) {
    return next({status: 400});
  }
  
  var name = req.body.tweet.name;
  var message = req.body.tweet.message;
  var timestamp = req.body.tweet.timestamp;
  
  if (!name || !message || !timestamp) {
    return next({status: 400, message: "bad felix!"});
  }
  
  var tweet = new Tweet(name, message, timestamp);
  
  db.insert(tweet, function(err) {
    if (err) {
      return next({status: 500, message: err});
    }
    
    res.status(201).json({tweets: tweet});
  });
})

module.exports = router;
