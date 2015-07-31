import Ember from 'ember';

export default Ember.Controller.extend({
    sorting: ['timestamp:desc'],
    sortedTweets: Ember.computed.sort('model', 'sorting'),

    tweetDisabled: function () {
        var name = this.get('name'),
            message = this.get('tweetDraft');

        return !(name && message && name !== '' && message !== '' && message.length < 140);
    }.property('name', 'tweetDraft'),

    init: function () {
        this._super();
        this.refreshData();
    },

    refreshData: function () {
        Ember.run.later(() => {
            this.send('refresh');
            console.log('Hi!');
            this.refreshData();
        }, 600);
    },

    actions: {
        tweet: function () {
            var name = this.get('name'),
                message = this.get('tweetDraft'),
                timestamp = new Date().getTime();

            // console.log(name, message, timestamp);
            
            let tweet = this.store.createRecord('tweet', {
                name: name,
                message: message,
                timestamp: timestamp
            });

            tweet.save();
        }
    }
});
