'use strict';

var webDriverManager = require('webdriver-manager');
var drakov = require('drakov');

var config = require('./config');

var drakovArgs,
	isChromeOnly = false,
	browserName = null,

	standaloneProperties,
	protractorProperties = config.properties.getProtractor();

var runProtractor = function() {
	standaloneProperties = config.properties.getStandalone(browserName);

	protractorProperties.seleniumServerJar = config.paths.selenium;
	if (isChromeOnly) {
		protractorProperties.chromeOnly = true;
	} else {
		protractorProperties.capabilities = standaloneProperties.capabilities;
		console.log('Running with', standaloneProperties.capabilities.browserName.toUpperCase(), '\n');
	}
	config.paths.protractorLauncher.init(null, protractorProperties);
};

var runDrakov = function(cb) {
	return function(err) {
		if (err) {
			cb(err);
		}
		drakov.run(drakovArgs, runProtractor);
	};
};

var updateAndRunWebdriver = function(cb) {
	var wd = new webDriverManager();
	var drivers = isChromeOnly ? ['chrome'] : ['standalone'];
	if (drakovArgs) {
		wd.install(drivers, runDrakov(cb));
	} else {
		wd.install(drivers, runProtractor);
	}
};

var applyOptionsToProtractorConfig = function(options) {
	Object.keys(options).forEach(function(key) {
		protractorProperties[key] = options[key];
	});
};

module.exports = {

	start: function(opts, cb) {
		console.log('\n', config.description, config.version, '\n');

		drakovArgs = opts.drakov;
		isChromeOnly = opts.isChromeOnly;
		browserName = opts.browserName;

		applyOptionsToProtractorConfig(opts.protractor);
		updateAndRunWebdriver(cb);
	}

};
