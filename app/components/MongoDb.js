var _ = require('lodash');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var logger = require('log4js').getLogger('[app.components.MongoDb]');

var MongoDb = function(components) {
  this.components = components;
  this.options = components.Config.MongoDb;
};

MongoDb.prototype.load = function(callback) {
  var self = this;

  MongoClient.connect(this.options.connectionUrl, function(err, db) {
    if (err) {
      return callback(err);
    }

    self.db = db;

    callback();
  });
};

module.exports = MongoDb;