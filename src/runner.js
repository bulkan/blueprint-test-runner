var WebDriverManager = require('webdriver-manager');
var extend = require('extend');
var drakov = require('drakov');
var protractorLauncher = require('protractor/built/launcher');
var config = require('./config');

module.exports = {
	start: function(opts, done) {
		console.log('\n', config.description, config.version, '\n');

		var drakovArgs = opts.drakov;
		var protractorArgs = opts.protractor;
		var browserName = opts.browserName;

		runWebdriver();

		function runWebdriver() {
			var wd = new WebDriverManager(config.paths.seleniumInstalls);
			var drivers = [browserName, 'standalone'];

			wd.install(drivers, function(err) {
				if (err) {
					return done(err);
				}
				runDrakov();
			});
		}

		function runDrakov() {
			drakov.run(drakovArgs, runProtractor);
		}

		function runProtractor() {
			console.log('Running with', browserName.toUpperCase(), '\n');
			var protractorProperties = config.properties.getProtractor(browserName);

			extend(protractorProperties, protractorArgs);
			protractorLauncher.init(null, protractorProperties);
		}
	}
};
