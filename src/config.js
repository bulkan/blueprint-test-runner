var path = require('path');

var paths = {
	seleniumInstalls: 'selenium_installs'
};

var chromeDriver = paths.seleniumInstalls + '/chromedriver';
var seleniumServerJar = paths.seleniumInstalls + '/selenium-server-standalone-2.52.0.jar';

var package = require('../package.json');

exports.description = package.description;
exports.version = package.version;
exports.paths = paths;
exports.properties = {
	getProtractor: function(browserName) {
		return {
			capabilities: {
				browserName: browserName
			},
			suites: {},
			chromeDriver: chromeDriver,
			seleniumServerJar: seleniumServerJar,
			jasmineNodeOpts: {
				showColors: true
			}
		};
	}
};
