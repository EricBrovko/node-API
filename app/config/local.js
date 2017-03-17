module.exports = {
	loadingComponentsOrder: [
		'MongoDb',
		'Express'
	],
  componentsOptions: {
    Express: {
      port: 5000,
      bodyLimit: '1mb'
    },
    MongoDb: {
      connectionUrl: 'mongodb://localhost:27017/rest_api_collection'
    }
  }
};