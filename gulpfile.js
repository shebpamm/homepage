'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var pug = require('gulp-pug')
var gutil = require('gulp-util');
var sass = require('gulp-sass');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'app.js',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:8888',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 3000,

    // open the proxied app in chrome
    browser: ['firefox']
  });
});

gulp.task('js',  function () {
  return gulp.src('base/public/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  return gulp.src('base/public/css')
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('sass', function() {
    return gulp.src('base/dev/scss/*.scss').pipe(sass()).on('error', sass.logError).pipe(gulp.dest('base/public/css')).pipe(browserSync.reload({ stream: true }));
});

gulp.task('pug', function() {
    gutil.log("pugged lol")
    return gulp.src('base/dev/views/*.pug').pipe(pug({})).pipe(gulp.dest('base/public/views/'));
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('base/public/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('base/public/**/*.css',  ['css']);
  gulp.watch('base/public/**/*.html', ['bs-reload']);
  gulp.watch('base/dev/views/*.pug', ['pug']);
  gulp.watch('base/dev/scss/*.scss', ['sass']);
});
