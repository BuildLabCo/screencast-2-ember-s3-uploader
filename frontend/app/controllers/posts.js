import Ember from 'ember';

export default Ember.Controller.extend({

  sortProperties: ['createdAt:desc'],
  sortedPosts: Ember.computed.sort('model','sortProperties'),

  imageUploadPercentage: null,

  actions: {
    imageUploadProgress: function(data) {
      Ember.run.once(this, function(){ 
        console.log(data);
        this.set("imageUploadPercentage", Math.round(data.percent)); 
      });
    }
  }

});