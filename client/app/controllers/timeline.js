import Ember from 'ember';

export default Ember.Controller.extend({
    sorting: ['timestamp:desc'],
    sortedTweets: Ember.computed.sort('model', 'sorting'),

    tweetDisabled: function () {
        var name = this.get('name'),
            draft = this.get('tweetDraft');

        if (name && draft && name !== '' && draft !== '' && draft.length < 160) {
            return false;
        } else {
            return true;
        }
    }.property('name', 'tweetDraft'),

    actions: {
        tweet: function () {
            var author = this.get('name'),
                message = this.get('tweetDraft'),
                timestamp = new Date().getTime();

            var tweet = this.store.createRecord('tweet', {
                author: author,
                message: message,
                timestamp: timestamp
            });

            tweet.save();
        }
    }
});