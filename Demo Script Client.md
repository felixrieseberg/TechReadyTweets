##### Create new skeleton
```
ember new techreadytweets
mv techreadytweets client
```

##### Add dependencies
```
bower install jquery --save
bower install bootstrap --save
bower install bootstrap-material-design --save
```

ember-cli-build.js:
```
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');

app.import('bower_components/bootstrap-material-design/dist/js/material.js');
app.import('bower_components/bootstrap-material-design/dist/js/ripples.js');
app.import('bower_components/bootstrap-material-design/dist/css/material.css');
app.import('bower_components/bootstrap-material-design/dist/css/ripples.css');
```

*Serve, show running dev-server*

##### Create Routes
```
ember g route application
ember g route timeline
```

app/templates/application.hbs
```
<div class="container"></div>
```

app/templates/timeline.hbs
```
<h1>Hi!</h1>
```

app/routes/application.js
```
beforeModel: function() {
    this.transitionTo('timeline');
}
```
*Serve, show redirect & debugger*

##### Create Template
 * `bs3-panel-hd`
 * `<span>Hi {{name}}, let's tweet something!</span>`
 * `<div class="col-md-2"></div>`
 * `<div class="col-md-10"></div>`
 * `{{input value=name type="text" class="form-control floating-label" placeholder="What's your name?"}}`
 * `<div class="col-md-2 col-md-offset-10 text-right"></div>`
 * `bs3-button-primary`

##### Implement the 'Tweet' action
`ember g controller timeline`

app/controllers/timeline.js
```
tweet: function () {
    var author = this.get('name'),
        message = this.get('tweetDraft'),
        timestamp = new Date().getTime();

    console.log(timestamp, author, message);
}
```

app/templates/timeline.hbs
```
<button {{action "tweet"}} ...></button>
```

##### Save the Tweet
`ember g model tweet`

app/models/tweet.js
```
author: DS.attr('string'),
message: DS.attr('string'),
timestamp: DS.attr('number')
```

app/controllers/timeline.js
```
var tweet = this.store.createRecord('tweet', {
    author: author,
    message: message,
    timestamp: timestamp
});

tweet.save();
```

*Show how it tries to go straight to POST*

`ember g adapter application`

app/adapters/application.js
```
export default DS.FixtureAdapter.extend({});
```

app/models/tweet.js
```
tweet.reopenClass({
    FIXTURES: []
});
```

##### Display Tweets
app/routes/timeline.js
```
model: function () {
    return this.store.find('tweet');
}
```

app/templates/timeline.hbs
```
<h2>Timeline</h2>
{{#each model as |tweet|}}
    <div class="well">
        <p>{{tweet.message}}</p>
        <small>- {{tweet.author}}</small>
    </div>
{{/each}}
```

##### Display Timestamp
*Show ember-addons.com*
`ember install ember-moment`

```
<small>- {{tweet.author}} at {{ago tweet.timestamp}}</small>
```

##### Disable Tweet Button if information is missing

app/controllers/timeline.js
```
tweetDisabled: function () {
    var name = this.get('name'),
        draft = this.get('tweetDraft');

    if (name && draft && name !== '' && draft !== '' && draft.length < 160) {
        return false;
    } else {
        return true;
    }
}.property('name', 'tweetDraft')
```

app/templates/timeline.js
```
<button disabled={{tweetDisabled}}...>
```