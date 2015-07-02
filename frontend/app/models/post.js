import DS from 'ember-data';
import ENV from '../config/environment';

var PostModel = DS.Model.extend({

  message:        DS.attr('string'),
  image:          DS.attr('string'),
  imageThumb:     DS.attr('string'),
  imageLarge:     DS.attr('string'),
  imageMedium:    DS.attr('string'),
  height:         DS.attr('number'),
  width:          DS.attr('number'),
  aspectRatio:    DS.attr('number'),
  blackListedUserIds: DS.attr(),
  createdAt:      DS.attr('date'),
  updatedAt:      DS.attr('date'),

  imageWithPath: function(){
    return ENV["imageHost"] + "/originals/" + this.get("image");
  }.property('image'),

  imageThumbWithPath: function(){
    return ENV["imageHost"] + this.get("imageThumb");
  }.property('imageThumb'),

  imageLargeWithPath: function(){
    return ENV["imageHost"] + this.get("imageLarge");
  }.property('imageLarge'),

  imageMediumWithPath: function(){
    return ENV["imageHost"] + this.get("imageMedium");
  }.property('imageMedium'),

  author: function(){
    return "Kyle Davis";
  }.property(),

  authorImage: function() {
    return "http://lorempixel.com/100/100/people";
  }.property()



});

export default PostModel;