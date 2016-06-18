var drakov = require('drakov');
var protractorLauncher = require('protractor/built/launcher');
var config = require('./config');
var exec = require('child_process').exec;

module.exports = {
	start: function(opts, done) {
		done = done || console.log;
		console.log('\n', config.description, config.version, '\n');

		var drakovArgs = opts.drakov;
		var protractorArgs = opts.protractor;
		var browserName = opts.browserName;

		runWebdriver();

		function runWebdriver() {
			exec(__dirname + '/../node_modules/.bin/webdriver-manager update',
				function(err, stdout, stderr) {
					console.log(stdout);
					console.log(stderr);
					if (err) {
						return done(err);
					}

					runDrakov();
				}
			);
		}

		function runDrakov() {
			drakov.run(drakovArgs, runProtractor);
		}

		function runProtractor() {
			console.log('Running with', browserName.toUpperCase(), '\n');
			var protractorProperties = config.properties.getProtractor(browserName);

			Object.assign(protractorProperties, protractorArgs);
			protractorLauncher.init(null, protractorProperties);
		}
	}
};
