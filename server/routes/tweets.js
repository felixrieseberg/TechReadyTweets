var express = require('express');
var router = express.Router();
var Tweet = require('../models/tweet.js');
var Datastore = require('nedb')
  , db = new Datastore();

router.get('/', function (req, res, next) {
    db.find({}).sort({ timestamp: -1}).exec(function (err, tweets) {
        if (err) {
            return next({ status: 500, message: err });
        }
        
        res.json({ tweets: tweets });
    });
});

router.post('/', function (req, res, next) {
    if (!req.body.tweet) {
        return next({ status: 400 });
    }
    
    var author = req.body.tweet.author;
    var message = req.body.tweet.message;
    
    if (!author || !message) {
        return next({ status: 400 });
    }
    
    var tweet = new Tweet(author, message);
    db.insert(tweet, function (err) {
        if (err) {
            return next({ status: 500, message: err });
        }
        
        return res.status(201).json({ tweets: tweet });
    });
});


module.exports = router;