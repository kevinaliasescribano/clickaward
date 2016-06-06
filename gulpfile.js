// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var flatten = require('gulp-flatten');
var less = require('gulp-less');
var $ = require('gulp-load-plugins')();
var copy = require('gulp-copy');
var cssnano = require('gulp-cssnano');

var browserSync = require('browser-sync').create();

// JS hint task
gulp.task('jshint', function() {
  gulp.src(['!./src/assets/libs/**/*.js', './src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
	//Ficheros JS de angular
	gulp.src(['./src/app/app.js', './src/app/app.modules.js', './src/app/**/*.filter.js', './src/app/**/*.controller.js', './src/app/**/*.directive.js', './src/app/**/*.service.js', './src/app/**/*.route.js'])
		.pipe(concat('app-min.js'))
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest('./build/js'))
		.pipe(livereload());
		
	//Ficheros JS externos a angular (canvas)
	gulp.src(['./src/assets/js/principal.canvas.js', './src/assets/js/**/*canvas.js'])
		.pipe(concat('canvas-min.js'))
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest('./build/js'))
		.pipe(livereload());

  //Ficheros JS externos a angular
  gulp.src('./src/assets/js/**/*scripts.js')
    .pipe(concat('scripts-min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());
});

// HTML
gulp.task('views', function() {
  gulp.src('./src/**/*.html')
//    .pipe(flatten())
//    .pipe(gulp.dest('./build/'))
	.pipe($.copy('./build/', {prefix:2}))
    .pipe(livereload());
});

// Tarea para copiar Font-awesome 
gulp.task('fontawesome', function() {
  gulp.src('./src/assets/libs/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest('./build/libs/font-awesome/css'));
	
  gulp.src('./src/assets/libs/font-awesome/fonts/*.*')
	.pipe($.copy('./build/libs/font-awesome', {prefix:4}));
});

// Librerias externas
gulp.task('libraries',['fontawesome'], function() {
  gulp.src(['./src/assets/libs/angular/angular.min.js', './src/assets/libs/angular-ui-router/release/angular-ui-router.min.js', './src/assets/libs/angular-animate/angular-animate.min.js', './src/assets/libs/angular-aria/angular-aria.min.js', './src/assets/libs/angular-messages/angular-messages.min.js', './src/assets/libs/angular-material/angular-material.min.css', './src/assets/libs/angular-material/angular-material.min.js', './src/assets/libs/jquery/dist/jquery.min.js', './src/assets/libs/font-awesome/css/font-awesome.min.css', './src/assets/libs/oclazyload/dist/ocLazyLoad.min.js'])
	.pipe(gulp.dest('./build/libs'))
    .pipe(livereload());
});

// LESS
gulp.task('less', function(){
  gulp.src('./src/assets/styles/styles.less')
    .pipe(concat('styles-min.css'))
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/styles/'));
});

// Tarea de copia de todos los archivos multimedia
gulp.task('media', function() {
  gulp.src('./src/assets/media/**/*.*')
	.pipe($.copy('./build/', {prefix:2}));
});

// default gulp task
gulp.task('server', ['scripts', 'libraries', 'views', 'less', 'media'], function() {

  browserSync.init({
    port: 3001,
    proxy: 'http://localhost:3000/',
    open: false,
    ui: false
  });

  // watch for JS changes
  gulp.watch('./src/**/*.js', ['jshint', 'scripts', browserSync.reload], function() {
    //livereload.listen();
  });
 
  // watch for CSS changes
  gulp.watch('./src/**/*.less', ['less', browserSync.reload], function(){
    //livereload.listen();
  });

  // watch for HTML changes
  gulp.watch('./src/**/*.html', ['views', browserSync.reload], function(){
    //browserSync.reload();
  });
});