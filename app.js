
const express = require('express')
const fs = require('fs');



const context = {}
context.app = express()
context.http = require('http');
// Init config
context.config = require('./config');

context.fs = fs;


// Load components and modules
var dirs = ['controllers', 'services'];

dirs.forEach(function (compName) {
	console.log('Loading component ' + compName);
	var fileNames = fs.readdirSync('./' + compName);

	context[compName] = {};
	fileNames.forEach(function (fileName) {
		if (fileName.indexOf('.js') >= 0) {
			var moduleName = fileName.replace('.js', '');
			var module = require('./' + compName + '/' + moduleName);
			context[compName][moduleName] = module;
			context[compName][moduleName](context);
			console.log('     LOADED MODULE ' + compName + '/' + moduleName);
		}
	});
});

context.http.createServer(context.app).listen(context.config.app.port, function () {
	console.log('Express server listening on port ' + context.config.app.port);
})
