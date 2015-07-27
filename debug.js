var runner = require('./src/runner');

runner.start(
	{
		drakov: {
			sourceFiles: 'test/blueprints/**/*.md',
			serverPort: 3001,
			staticPaths: [
				'dist/rsrc'
			],
			stealthmode: true
		},
		protractor: {
			framework: "jasmine2",
			specs: 'test/specs/**/*Spec.js'
		},
		browserName: 'firefox'
	}
);
