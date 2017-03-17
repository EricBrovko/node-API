'use strict';

var bodyParser = require('body-parser');
var logger = require('log4js').getLogger('[app.routes.index]');
var pug = require('pug');
var path = require('path');

module.exports = function(app, options) {
  app.use(bodyParser.json({ limit: options.bodyLimit }));

  app.set('view engine', 'pug');
  app.set('views', path.resolve(__dirname, '../client/views'));

  app.use('/notify', require('./notify'));

  app.all('*', function(req, res) {
    res.status(404).send('Not found');
  });

  app.use(function(err, req, res, next) {
    if(err.status === 401) {
      return res.status(401).send(err.message);
    }

    logger.error(err);
    res.status(500).send('Server error');
  });
};
