var tweet = function (author, message) {
    this.author = author;
    this.message = message;
    this.timestamp = Date.now().toString();
    this.id = this.timestamp;
}

module.exports = tweet;
