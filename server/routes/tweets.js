var express = require('express');
var azure = require('azure-storage');
var config = require('../config.js');
var Tweet = require('../models/tweet.js');
var tableSvc = azure.createTableService(config.storageAccount, config.storageKey);
var router = express.Router();

var tableName = 'tweets';

router.get('/', function (req, res) {
    var query = new azure.TableQuery().where('PartitionKey eq ?', Tweet.partitionKey);

    tableSvc.queryEntities(tableName, query, null, function(error, result, response) {
        if (error) {
            res.status(500).end(error);
        }

        var tweets = [];
        result.entries.forEach(function(tweet) {
            tweets.push(Tweet.parseEntity(tweet));
        });

        res.json({ tweets: tweets });
    });
});

router.post('/', function (req, res) {
    if (!req.body.tweet) {
        res.status(400).end();
    }
    
    var author = req.body.tweet.author;
    var message = req.body.tweet.message;
    var timestamp = req.body.tweet.timestamp;
    
    if (!author || !message || !timestamp) {
        res.status(400).end();
    }

    tableSvc.createTableIfNotExists(tableName, function (error, result, response) {
        if (error) {
            res.status(500).end(error);
        }

        var entity = new Tweet(author, message, timestamp);
        tableSvc.insertEntity(tableName, entity.generateEntity(), function (error, result, response) {
            if (error) {
                res.status(500).end(error);
            }
            
            res.status(201).json({ tweets: entity}).end();
        });
    });
});


module.exports = router;