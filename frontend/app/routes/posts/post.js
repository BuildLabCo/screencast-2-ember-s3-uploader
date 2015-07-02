import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    console.log("Running post route beforeModel");
  },

  model: function(params) {
    console.log("Running Post route model");
    return this.store.find("post", params.post_id);
  },

  renderTemplate: function(controller, model) {
    return this.render("posts.post", {
      into:       "application",
      outlet:     "post-modal",
      controller: controller,
      model:      model
    });
  },

  activate: function() {
    Ember.$('body').addClass("modal-visible");
  },

  deactivate: function() {
    Ember.$('body').removeClass("modal-visible");
  },

  afterModel: function(model, transition) {
    var user = this.controllerFor("application").get("session.userId"),
        canAccess = model.get("blackListedUserIds").indexOf(user);
    console.log((canAccess) ? "User can access" : "User can not access!!!");

    if (!canAccess) {
      return (transition.sequence === 0) ? this.replaceWith("posts") : transition.abort();
    }
    // if i redirect here the model hooks will be run again
    // return this.transitionTo("posts.post.comments");
    return;
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set("posts", this.modelFor("posts"));
  },

  resetController: function(controller, isExiting) {
    console.log("Route is shutting down: " + isExiting);

    if (isExiting) {
      controller.set("pageViews", 0);
    }
  },

  // use this to redirect the user
  redirect: function() {
    return this.transitionTo("posts.post.comments");
  }

});