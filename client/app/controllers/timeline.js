import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        tweet: function () {
            var author = this.get('name'),
                message = this.get('tweetDraft'),
                timestamp = new Date().getTime();

            this.store.createRecord('tweet', {
                author: author,
                message: message,
                timestamp: timestamp
            });
        }
    }
});
