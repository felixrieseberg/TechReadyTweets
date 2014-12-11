import App from '../app';
import DS from 'ember-data';


// Uncomment to use local storage!
App.ApplicationSerializer = DS.LSSerializer.extend();
export default DS.LSAdapter.extend({
    namespace: 'TechReadyTwitter'
});