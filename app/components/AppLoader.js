'use strict';

var async = require('async');
var _ = require('lodash');
var logger = require('log4js').getLogger('[app.components.AppLoader]');

var AppLoader = module.exports = function() {
  var self = this;

  this.components = {};
  this.components.AppLoader = this;
  this.config = require(global.ROOT_DIR + '/app/config/local');
  this.components.Config = this.config.componentsOptions;
};

AppLoader.prototype.loadComponents = function(callback) {
  var self = this;

  async.eachSeries(this.config.loadingComponentsOrder, function(componentName, callback) {
    var component = require(global.ROOT_DIR + '/app/components/' + componentName);

    if (self.components[componentName]) {
      return callback(new Error(componentName + ' component already exists'));
    }

    self.components[componentName] = new component(self.components);

    if (self.components[componentName].load) {
      self.components[componentName].load(function(err) {
        if (err) {
          return callback(err);
        }

        logger.info(componentName + ' loaded');
        callback();
      });
    } else {
      logger.info(componentName + ' loaded');
      callback();
    }
  }, callback);
};