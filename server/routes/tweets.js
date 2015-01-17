var express = require('express');
var azure = require('azure-storage');
var config = require('../config.js');
var Tweet = require('../models/tweet.js');
var tableSvc = azure.createTableService(config.storageAccount, config.storageKey);
var router = express.Router();

var tableName = 'tweets';

router.get('/', function (req, res, next) {
    var query = new azure.TableQuery().where('PartitionKey eq ?', Tweet.partitionKey);

    tableSvc.queryEntities(tableName, query, null, function(error, result, response) {
        if (error) {
            next({ error: 500, message: error });
            return;
        }

        var tweets = [];
        result.entries.forEach(function(tweet) {
            tweets.push(Tweet.parseEntity(tweet));
        });

        res.json({ tweets: tweets });
    });
});

router.post('/', function (req, res, next) {
    if (!req.body.tweet) {
        next({ status: 400 });
        return;
    }
    
    var author = req.body.tweet.author;
    var message = req.body.tweet.message;
    var timestamp = req.body.tweet.timestamp;
    
    if (!author || !message || !timestamp) {
        next({ status: 400 });
        return;
    }

    tableSvc.createTableIfNotExists(tableName, function (error, result, response) {
        if (error) {
            next({ status: 500, message: error });
            return;
        }

        var entity = new Tweet(author, message, timestamp);
        tableSvc.insertEntity(tableName, entity.generateEntity(), function (error, result, response) {
            if (error) {
                next({ status: 500, message: error });
                return;
            }

            res.status(201).json({ tweets: entity });
        });
    });
});


module.exports = router;