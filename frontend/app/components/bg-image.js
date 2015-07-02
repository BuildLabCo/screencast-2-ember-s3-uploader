import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["bg-image-component"],

  // passed in
  src: null,

  attributeBindings: ["style"],

  style: function() {
    var styles = [];
    styles.push("background-image: url("+ this.get('src') +")");
    return styles.join("; ");
  }.property('src')

});