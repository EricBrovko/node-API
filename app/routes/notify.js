'use strict';

var express = require('express');
var router = express.Router();
var controller = require(global.ROOT_DIR + '/app/controllers/notify');
var pug = require('pug');

router.get('/', controller.notify);

module.exports = router;