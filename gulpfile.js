"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');

var output_dir = 'public_html/scripts';

gulp.task('concatScripts', function(){
	return gulp.src(['js/story.js', 'js/comment.js', 'js/hn_util.js', 'js/stories_controller.js', 'js/comments_controller.js', 'js/settings.js', 'js/app.js'])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(output_dir));
});

gulp.task('minifyScripts', ['concatScripts'], function(){
	return gulp.src(output_dir + '/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(output_dir));
});
gulp.task('watchScripts', function(){
	gulp.watch('js/**/*.js', ['minifyScripts']);
});

gulp.task('build', ['minifyScripts']);
gulp.task('default', ['build']);
