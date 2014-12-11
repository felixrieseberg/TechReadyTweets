import Ember from 'ember';

export default Ember.ArrayController.extend({
    sortProperties: ['timestamp'],
    sortAscending: false,

    tweetDisabled: function () {
        var name = this.get('name'),
            draft = this.get('tweetDraft');

        if (name && draft && name !== '' && draft !== '' && draft.length < 160) {
            return false;
        } else {
            return true;
        }
    }.property('name', 'tweetDraft'),

    init: function () {
        this._super();
        this.refreshData();
    },

    refreshData: function () {
        var self = this;
        Ember.run.later(this, function() {
            self.store.find('tweet');
            self.refreshData();
        }, 600);
    },

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
