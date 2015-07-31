var tweet = function(author, message, timestamp) {
	this.author = author;
	this.message = message;
	this.timestamp = timestamp;
	this.id = this.timestamp;
}

module.exports = tweet;