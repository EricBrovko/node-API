'use strict';

var _ = require('lodash');
var async = require('async');


module.exports = {
  notify: function(req, res) {
  	res.render('index', {msg: 'some msg'});
  }
};