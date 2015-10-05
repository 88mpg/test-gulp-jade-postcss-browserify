require('es6-promise').polyfill();
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var jade = require('gulp-jade');
var cssnext = require('cssnext');
var precss = require('precss');
var nano = require('gulp-cssnano');
var browserSync = require('browser-sync');

gulp.task('css', function () {
  var processors = [
    autoprefixer,
    cssnext,
    precss
  ];
  return gulp.src('./app/assets/css/*.css')
    .pipe(postcss(processors))
    .pipe(nano())
    .pipe(gulp.dest('./dest/assets/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dest'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'localhost',
    open: false,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    }
  });
});

gulp.task('watch', function () {
   gulp.watch('./app/assets/css/**/*.css', ['css']);
   gulp.watch('./app/**/*.jade', ['html']);
});
gulp.task('start', ['browser-sync', 'watch']);
