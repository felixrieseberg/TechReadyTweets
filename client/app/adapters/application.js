import App from '../app';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://techreadytwitter.azurewebsites.net'
});

// Uncomment to use local storage!
// App.ApplicationSerializer = DS.LSSerializer.extend();
// export default DS.LSAdapter.extend({
//     namespace: 'TechReadyTwitter'
// });