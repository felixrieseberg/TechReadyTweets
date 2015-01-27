# TechReadyTweets
![Screenshot](http://i.imgur.com/LBdsjS4.png)

This is a small app build with Ember-Cli & Node, showcasing how to prototype a small Twitter-like app (both frontend and backend). You probably came here via TechReady, where Jason Poon ([@jpoon](http://github.com/jpoon)) and I gave a 75 minute talk on Ember, Node and Sophisticated Web Apps. Because this app is our demo, you'll find a few shortcuts - and things one might do differently in a real-world example.

Visit the deployed version at http://techreadytweets.azurewebsites.net.

## Getting Started
To start the app, run `npm install` and then `npm start`.

## Structure
- `client` houses the Ember client's source code. If you want to play with the Ember app (and run commands like `ember serve`), do it in this directory.
- `server` houses the server (surprising, huh?). It does not only take care of managing the tweets, but also serves the compiled client (located in `client/dist`). In order to recompile, run `ember build` in `client`.

## License
Copyright (c) Microsoft Corporation, licensed under [The MIT License (MIT)](https://github.com/felixrieseberg/TechReadyTweets/blob/master/LICENSE.md).
