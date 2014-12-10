var fortune = require('fortune');

var app = fortune ({
    db: 'techreadytweets'
  })
  .resource('tweet', {
    author: String,
    message: String,
    timestamp: Number 
  })
  .listen(1337);
