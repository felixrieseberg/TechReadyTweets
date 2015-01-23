var tweet = function (author, message) {
    this.author = author;
    this.message = message;
    this.timestamp = Date.now();
    this.id = this.timestamp;
}

module.exports = tweet;