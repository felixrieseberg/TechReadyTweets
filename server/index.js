var fortune = require('fortune'),
	express = require('express');

var app = fortune ({
    db: 'techreadytweets'
  })
  .resource('tweet', {
    author: String,
    message: String,
    timestamp: Number 
  });

app.use(express.static(__dirname + '/../client/dist'));

app.listen(process.env.PORT || 80);
