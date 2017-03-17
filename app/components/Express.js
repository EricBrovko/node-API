var _ = require('lodash');
var logger = require('log4js').getLogger('[app.components.Express]');

var Express = function(components) {
  this.components = components;

  this.options = components.Config.Express;
  this.app = require('express')();
  this.app.expressOptions = this.options;
  this.app.components = this.components;
  this.server = require('http').createServer(this.app);

  require(global.ROOT_DIR + '/app/routes')(this.app, this.options);
};


Express.prototype.load = function(callback) {
  var self = this;

  this.server.listen(self.options.port, function(err) {
    if (err) {
      return callback(err);
    }

    logger.info('express listens on port ' + self.options.port);
    callback();
  });
};

module.exports = Express;