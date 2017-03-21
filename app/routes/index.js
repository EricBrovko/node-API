'use strict';

var bodyParser = require('body-parser');
var logger = require('log4js').getLogger('[app.routes.index]');
var pug = require('pug');
var path = require('path');
var express = require('express');

module.exports = function(app, options) {
  app.use(bodyParser.json({ limit: options.bodyLimit }));
  app.use(bodyParser.urlencoded({ extended: true, limit: options.bodyLimit })); 

  // app.use(function(req, res, next) {
  //   console.log(req.url);
  //   next();
  // }); 

  app.set('view engine', 'pug');
  app.set('views', path.resolve(__dirname, '../views'));
  app.use('/bower_components', express.static(__dirname + '/../views/bower_components'));
  app.use('/styles', express.static(__dirname + '/../styles'));

  app.use('/', require('./contacts'));

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
