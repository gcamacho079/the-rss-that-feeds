var sass = require('gulp-sass');
var gulp = require('gulp');
var babel = require("gulp-babel");
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  gulp.src('./src/main.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./scss/*.scss', ['styles']);
  gulp.watch('./src/*.js', ['scripts']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts','serve']);
