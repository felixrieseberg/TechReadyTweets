import DS from 'ember-data';

var tweet = DS.Model.extend({
    name: DS.attr('string'),
    message: DS.attr('string'),
    timestamp: DS.attr('number')
});

tweet.reopenClass({
    FIXTURES: []
})

export default tweet;