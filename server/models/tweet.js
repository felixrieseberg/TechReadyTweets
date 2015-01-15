var azure = require('azure-storage');
var entGen = azure.TableUtilities.entityGenerator;

function Tweet(author, message, timestamp, partitionKey, rowKey) {
    this.PartitionKey = partitionKey || Tweet.partitionKey,
    this.RowKey = rowKey || (new Date(3000, 1) - Date.now()).toString(),

    this.id = this.RowKey;
    this.author = author;
    this.message = message;
    this.timestamp = timestamp;
}

Tweet.prototype.generateEntity = function() {
    var entity = {};
    for (var propertyName in this) {
        if (Object.prototype.hasOwnProperty.call(this, propertyName)) {
            entity[propertyName] = entGen.String(this[propertyName]);
        }
    }
    return entity;
};

Tweet.partitionKey = 'tweet';

Tweet.parseEntity = function(entity) {
    return new Tweet(entity.author._, entity.message._, entity.timestamp._, entity.PartitionKey._, entity.RowKey._);
};

module.exports = Tweet;