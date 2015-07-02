var AppConfig = require('../../../app/config');
var thinky    = require('thinky');

var dbConfig        = AppConfig.database["development"];
var thinkyInstance  = thinky(dbConfig);
var r               = thinkyInstance.r;

var Promise         = require('bluebird');

module.exports = new Promise(function(resolve, reject) {
  thinkyInstance._onDbReady.push(function() {
    resolve({thinky: thinkyInstance, r: r});
  });
});