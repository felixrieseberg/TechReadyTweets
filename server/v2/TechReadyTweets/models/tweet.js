var azure = require('azure-storage');
var entGen = azure.TableUtilities.entityGenerator;

function Tweet(author, message, timestamp, partitionKey, rowKey) {
    this.partitionKey = partitionKey || 'tweet';
    this.rowKey = rowKey || (new Date(3000, 1) - Date.now()).toString();

    this.id = this.rowKey;
    this.author = author;
    this.message = message;
    this.timestamp = timestamp;
}

Tweet.prototype.generateEntity = function() {
    return {
        PartitionKey: entGen.String(this.partitionKey),
        RowKey: entGen.String(this.rowKey),

        author: entGen.String(this.author),
        message: entGen.String(this.message),
        timestamp: entGen.Int64(this.timestamp),
    }
}

Tweet.parseEntity = function (entity) {
    return new Tweet(entity.author._, entity.message._, entity.timestamp._, entity.PartitionKey._, entity.RowKey._);
}

module.exports = Tweet;