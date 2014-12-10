import Ember from 'ember';

export default Ember.ObjectController.extend({
    created: function () {
        return new Date(this.get('timestamp')).toLocaleTimeString();
    }.property('timestamp')
});
