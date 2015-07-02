import Ember from 'ember';

export default Ember.ObjectController.extend({
  
  posts: Ember.A(),
  postsCount: Ember.computed.alias("posts.length"),

  nextPost: null,
  previousPost: null,

  pageViews: 0,

  setNextAndPrevious: function(){
    var modelIndex = this.get("posts").indexOf(this.get("model")),
        nextPost = (modelIndex < this.get("postsCount") - 1) ? this.get("posts").objectAt(modelIndex + 1) : null,
        previousPost = (modelIndex > 0) ? this.get("posts").objectAt(modelIndex - 1) : null;

    this.setProperties({
      nextPost:       nextPost,
      previousPost:   previousPost
    });
    
  }.observes("posts.[]", "model")

});