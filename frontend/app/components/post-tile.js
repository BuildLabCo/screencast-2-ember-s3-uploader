import Ember from 'ember';

export default Ember.Component.extend({

  tagName:            "figure",
  classNames:        ["post-tile-component"],
  classNameBindings: ["loaded:image-loaded:image-loading"],
  attributeBindings: ["style"],

  height: 0,
  width:  0,

  loaded: false,
  $image: null,

  // passed in post
  post: null,

  calculatedHeight: function(){
    return this.get("width") * this.get("post.aspectRatio");
  }.property('post.height','post.width','post.aspectRatio','width'),

  style: function(){
    var style = [];
    style.push("height: " + this.get("calculatedHeight") + "px");
    return style.join("; ");
  }.property('post','width'),

  calculateSize: function(){
    this.set("width", this.$().outerWidth());
  }.on('didInsertElement'),

  loadImage: function(){
    var _this = this;

    this.set("$image", this.$('img'));

    this.$image.on("load", function(){
      _this.set("loaded", true);
    });

    this.$image.attr("src", this.$image.data().src);
  }.on('didInsertElement'),

  willDestroyElement: function() {
    this.$image.off("load");
  }

});