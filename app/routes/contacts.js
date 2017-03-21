'use strict';

var express = require('express');
var router = express.Router();
var controller = require(global.ROOT_DIR + '/app/controllers/contacts');
var pug = require('pug');

router.get('/', controller.index);
router.get('/list', controller.list);
router.get('/create', controller.create);
router.post('/insert', controller.insert);
router.post('/update', controller.update);
router.post('/edit', controller.edit);
router.post('/call', controller.call);
router.post('/remove', controller.remove);

module.exports = router;