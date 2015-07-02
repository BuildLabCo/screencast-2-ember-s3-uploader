import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");
  this.route("posts", { path: "/posts" }, function() {
    this.route("post", { path: "/:post_id" }, function() {
      this.route("comments", { path: "/comments" });
    });
  });
});

export default Router;
