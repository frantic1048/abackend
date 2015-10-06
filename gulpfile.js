const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const babel  = require('gulp-babel');
const newer = require('gulp-newer');

const appSrc = 'src/*.js';
const appDest = 'build';
const testSrc = ['test/spec/*Spec.js'];

gulp.task('default', ['compile', 'test']);

gulp.task('test', function() {
  return gulp.src(testSrc)
    .pipe(jasmine());
});

gulp.task('compile', function() {
  return gulp.src(appSrc)
    .pipe(newer(appDest))
    .pipe(babel({ modules: 'common' }))
    .pipe(gulp.dest(appDest);
});
