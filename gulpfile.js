"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('concatScripts', function(){
	return gulp.src(['js/fastclick.js', 'js/story_controller.js', 'js/app.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('scripts'));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
	gulp.src('scripts/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('scripts'));
});

gulp.task('build', ['minifyScripts']);
gulp.task('default', ['build']);






















