#recap
* restful service with a backing datastore
* using Visual Studio Code, grunt, node, express

#setup
```
npm install -g express-generator
express <project_name>
cd <project_name> && npm install
SET DEBUG=techreadytweetsdemo:* & npm start

```
* Run in Visual Studio Code
	* launch.json: `"env": { "DEBUG": "techreadytweetsdemo:*" }`
	* built-in debugging support, intellisense

#grunt
* sample gruntfile
   ```
   jshint: {
      files: ['Gruntfile.js', 'routes/*.js', '*.js'],
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
var author = req.body.tweet.author;
var message = req.body.tweet.message;

if (!author || !message) {
return next({ status: 400 });
}

var tweet = new Tweet(author, message);
```

## model

```
var tweet = function (author, message) {
	this.author = author;
  	this.message = message;
  	this.timestamp = Date.now().toString();
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
