const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const babel  = require('gulp-babel');
const newer = require('gulp-newer');
const istanbul = require('gulp-istanbul');

const appSrc = 'src/*.js';
const appDest = 'build';
const testSrc = ['test/spec/*Spec.js'];

gulp.task('default', ['test']);

gulp.task('compile', function() {
  return gulp.src(appSrc)
    .pipe(newer(appDest))
    .pipe(babel({ modules: 'common' }))
    .pipe(gulp.dest(appDest));
});

gulp.task('pre-test', ['compile'], function() {
  return gulp.src(appDest)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
  return gulp.src(testSrc)
    .pipe(jasmine())
    .pipe(istanbul.writeReports());
});
