var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('scripts', function() {
  console.log('running scripts gulp');
    return gulp.src(['jquery-2.1.4.min.js', 'libs/angular.min.js','libs/angular-animate.min.js', 'libs/ui-router.0.2.1.js', 'libs/*.js', 'src/app.module.js', 'src/app.routes.js', 'src/**/*.js'])
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('style', ['scripts'], function() {
  console.log('running style gulp');
    return gulp.src(['libs/**/*.css', 'src/**/*.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/assets/css'));
});



gulp.task('default', ['scripts', 'style']);

gulp.watch(['src/**/*.js', 'src/**/*.css'], ['default']);


// jquery-2.1.4.min.js',
