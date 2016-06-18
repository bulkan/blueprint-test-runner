var package = require('../package.json');

exports.description = package.description;
exports.version = package.version;
exports.properties = {
	getProtractor: function(browserName) {
		return {
			capabilities: {
				browserName: browserName
			},
			suites: {},
			jasmineNodeOpts: {
				showColors: true
			}
		};
	}
};
