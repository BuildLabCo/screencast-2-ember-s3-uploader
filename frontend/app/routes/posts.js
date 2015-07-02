import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    var user = this.controllerFor("application").get("session.userId");
    console.log((user) ? "Logged In" : "Not Logged In");

    if (!user) {
      return this.transitionTo("login");
    }
    return;
  },

  model: function() {
    return this.store.find("post");
  },

  actions: {
    imageUploadComplete: function(data) {

      let newPost = Ember.Object.create({
        id: 123321123,
        image: data.url,
        imageThumbWithPath: data.url,
        imageMediumWithPath: data.url,
        createdAt: new Date(Date.now()),
        message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
      });

      let image = new Image();
      image.onload = () => {
        newPost.set("width", image.width);
        newPost.set("height", image.height);
        newPost.set("aspectRatio", image.height / image.width);
        Ember.run.once(this, function() {
          this.controllerFor("posts").get('model').pushObject(newPost);
          this.controllerFor("posts").set("imageUploadPercentage", null);
        });
      };
      image.src = data.url;
    }
  }

});