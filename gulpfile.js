var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('test:unit', function(done) {
	var runner = require('./src/runner');

	runner.start({
		drakov: {
			sourceFiles: 'test/blueprints/**/*.md',
			serverPort: 3000,
			staticPaths: [
				'dist/rsrc'
			]
		},
		protractor: {
			framework: 'jasmine',
			specs: 'test/specs/**/*Spec.js',
			onComplete: function() {done();}
		},
		browserName: 'chrome'
	});
});
gulp.task('test:lint', function() {
	return gulp.src(['src/**/*.js', 'test/specs/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});
gulp.task('test', ['test:lint', 'test:unit']);
