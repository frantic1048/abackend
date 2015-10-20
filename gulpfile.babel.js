import gulp from 'gulp';
import jasmine from 'gulp-jasmine';
import SpecReporter from 'jasmine-spec-reporter';
import babel  from 'gulp-babel';
import newer from 'gulp-newer';
import istanbul from 'gulp-istanbul';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';

const appSrc = 'src/**/*.js';
const appDest = 'build/**/*.js';
const appDestPath = 'build';
const lintSrc = [appSrc, 'test/spec/*Spec.js', 'gulpfile.js', 'abackend.conf.js'];
const testSrc = ['test/spec/*Spec.js'];
let server = null;

gulp.task('lint', () => {
  return gulp.src(lintSrc)
    .pipe(eslint({ rulePaths: ['./'] }))
    .pipe(eslint.format());
});

gulp.task('compile', () => {
  return gulp.src(appSrc)
    .pipe(newer(appDestPath))
    .pipe(babel({ modules: 'common' }))
    .pipe(gulp.dest(appDestPath));
});

gulp.task('pre-test', () => {
  return gulp.src(appDest)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', () => {
  return gulp.src(testSrc)
    .pipe(jasmine({ reporter: new SpecReporter() }))
    .on('end', () => {
      // automatically close server on test finished
      server.close();
      server = null;
    })
    .pipe(istanbul.writeReports());
});

gulp.task('serve', (callback) => {
  server = require('./build/server');
  callback();
});

gulp.task('end-serve', (callback) => {
  if (server) {
    server.close();
    server = null;
  }
  callback();
});

gulp.task('watcher-appSrc', (callback) => {
  runSequence(
    'end-serve',
    'compile',
    'pre-test',
    'serve',
    'test',
    callback
  );
});

gulp.task('watcher-testSrc', (callback) => {
  runSequence(
    'pre-test',
    'test',
    callback
  );
});

gulp.task('watch', (callback) => {
  gulp.watch(appSrc, ['watcher-appSrc']);
  gulp.watch(testSrc, ['watcher-testSrc']);
  callback();
});

// CI
gulp.task('default', (callback) => {
  runSequence(
    ['compile', 'lint'],
    'pre-test',
    'serve',
    'test',
    'end-serve',
    callback
  );});

// develop
gulp.task('dev', (callback) => {
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
gulp.task('run', (callback) => {
  runSequence(
    'compile',
    'serve',
    callback
  );
});
