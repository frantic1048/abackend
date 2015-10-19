/* eslint-env node, jasmine */
/* eslint-disable no-var, prefer-const, func-names */
/* eslint-disable ecmaFeatures */

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var SpecReporter = require('jasmine-spec-reporter');
var babel  = require('gulp-babel');
var newer = require('gulp-newer');
var istanbul = require('gulp-istanbul');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');

var appSrc = 'src/**/*.js';
var appDest = 'build/**/*.js';
var appDestPath = 'build';
var lintSrc = [appSrc, 'test/spec/*Spec.js', 'gulpfile.js', 'abackend.conf.js'];
var testSrc = ['test/spec/*Spec.js'];
var server = null;

gulp.task('lint', function() {
  return gulp.src(lintSrc)
    .pipe(eslint({ rulePaths: ['./'] }))
    .pipe(eslint.format());
});

gulp.task('compile', function() {
  return gulp.src(appSrc)
    .pipe(newer(appDestPath))
    .pipe(babel({ modules: 'common' }))
    .pipe(gulp.dest(appDestPath));
});

gulp.task('pre-test', function() {
  return gulp.src(appDest)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', function() {
  return gulp.src(testSrc)
    .pipe(jasmine({ reporter: new SpecReporter() }))
    .on('end', function() {
      // automatically close server on test finished
      server.close();
      server = null;
    })
    .pipe(istanbul.writeReports());
});

gulp.task('serve', function(callback) {
  server = require('./build/server');
  callback();
});

gulp.task('end-serve', function(callback) {
  if (server) {
    server.close();
    server = null;
  }
  callback();
});

gulp.task('watcher-appSrc', function(callback) {
  runSequence(
    'end-serve',
    'compile',
    'pre-test',
    'serve',
    'test',
    callback
  );
});

gulp.task('watcher-testSrc', function(callback) {
  runSequence(
    'pre-test',
    'test',
    callback
  );
});

gulp.task('watch', function(callback) {
  gulp.watch(appSrc, ['watcher-appSrc']);
  gulp.watch(testSrc, ['watcher-testSrc']);
  callback();
});

// CI
gulp.task('default', function(callback) {
  runSequence(
    ['compile', 'lint'],
    'pre-test',
    'serve',
    'test',
    'end-serve',
    callback
  );});

// develop
gulp.task('dev', function(callback) {
  runSequence(
    'compile',
    'pre-test',
    'serve',
    'test',
    'watch',
    callback
  );
});

// run server
gulp.task('run', function(callback) {
  runSequence(
    'compile',
    'serve',
    callback
  );
});
