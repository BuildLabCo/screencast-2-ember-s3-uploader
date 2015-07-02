import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return [
      {name: "Person 1", comment: "This is a comment"},
      {name: "Person 2", comment: "I second that. This is also a comment"}
    ];
  },

  renderTemplate: function(controller, model) {
    return this.render("posts.post.comments", {
      into:       "posts.post",
      controller: controller,
      model:      model
    });
  }

});