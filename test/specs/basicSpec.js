var runner = require('../../src/runner');

describe('Basic', function() {
	it('should run', function() {
		runner.start({
			drakov: {
				sourceFiles: 'test/blueprints/**/*.md',
				serverPort: 3000,
				staticPaths: [
					'dist/rsrc'
				]
			},
			protractor: {
				framework: "jasmine2",
				specs: 'test/specs/**/*Spec.js'
			},
			isChromeOnly: true
		});
	});
});
