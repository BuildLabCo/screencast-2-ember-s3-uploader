import Ember from 'ember';

export default Ember.Controller.extend({

  // if no user id set, logged out
  session: {
    userId: 1
  }

});