#recap
* restful service with a backing datastore
* using Visual Studio Code, grunt, node, express

#setup
```bash
npm install -g express-generator
express <project_name>
cd <project_name> && npm install
SET DEBUG=<project_name>:* & npm start
```
* Run in Visual Studio Code
	* launch.json: `"env": { "DEBUG": "<project_name>:*" }`
	* built-in debugging support, intellisense

#grunt
* sample gruntfile
   ```json
   jshint: {
      files: ['Gruntfile.js', '{models,routes}/*.js', '*.js'],
   ```
  * install dependencies
   ```
   npm install grunt grunt-contrib-jshint grunt-contrib-watch --save-dev
   ```

# express
 * web application framework
 * middleware (pipeline analogy)
 * app.js entry point

# tweets
* rename /users route to 'tweets'

## post
```

if (!req.body.tweet) {
  return next({status: 400});
}

var author = req.body.tweet.author;
var message = req.body.tweet.message;
var timestamp = req.body.tweet.timestamp;

if (!author || !message || !timestamp) {
  return next({ status: 400 });
}

var tweet = new Tweet(author, message, timestamp);
```

## model

```
var tweet = function (author, message, timestamp) {
	this.author = author;
  	this.message = message;
  	this.timestamp = timestamp;
  	this.id = this.timestamp;
}

module.exports = tweet;
``` 

## data storage
* azure table storage, sql server, etc.
* nedb (in-memory db)
* `npm install nedb --save `

```
var Datastore = require('nedb')
	     , db = new Datastore({ filename: "techreadytweets", autoload: true });
```

```
db.insert(tweet, function (err) {
if (err) {
    return next({ status: 500, message: err });
}

return res.status(201).json({ tweets: tweet });
```

## get
```
router.get('/', function(req, res, next) {
  db.find({}).sort({ timestamp: -1}).exec(function(err, tweets) {
    if (err) {
      return next({status: 500, message: err});
    }
    return res.status(200).json({tweets: tweets});
  });
});
```

# ember client
* serve ember client
```
app.use(express.static(path.join(__dirname, '/../client/dist'));
```
