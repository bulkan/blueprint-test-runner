var gulp = require('gulp'),
	mocha = require('gulp-mocha'),
	gUtil = require('gulp-util'),
	jshint = require('gulp-jshint');

gulp.task('test:unit', function () {
	return gulp.src('test/*Spec.js', {read: false})
		.pipe(mocha({
			reporter: 'spec'
		}))
		.on('error', gUtil.log);
});
gulp.task('test:lint', function() {
	return gulp.src(['src/**/*.js', 'test/specs/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});
gulp.task('test', ['test:lint', 'test:unit']);
