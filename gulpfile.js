// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch');
	plumber = require('gulp-plumber');
	header = require('gulp-header');

gulp.task('default', function() {
	var pkg = require('./package.json');
	var banner = ['/**',
		' * <%= pkg.name %> - <%= pkg.description %>',
		' * v<%= pkg.version %> - <%= pkg.license %> License',
		' * <%= pkg.homepage %> - <%= pkg.repository.url %>',
		' * by <%= pkg.author.name %> - @jackrugile',
		' */',
		'', ''].join('\n');

	gulp.src('assets/scss/style.scss')
	.pipe(watch())
	.pipe(plumber())
	.pipe(sass({ style: 'expanded', lineNumbers: true }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('assets/css'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss())
	.pipe(gulp.dest('assets/css'))

	gulp.src('placeholdem.js')
	.pipe(watch())
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(uglify())
	.pipe(header(banner, { pkg : pkg } ))
	.pipe(gulp.dest(''))
});
