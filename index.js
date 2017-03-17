'use strict';

global.ROOT_DIR = __dirname;

var AppLoader = require(global.ROOT_DIR + '/app/components/AppLoader');
var appLoader = new AppLoader();
var logger = require('log4js').getLogger('[app]');

appLoader.loadComponents(function() {
	logger.info('app is ready');
});
