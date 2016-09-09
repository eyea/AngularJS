var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');
    sass = require('gulp-sass');

gulp.task('connect', function () {
    connect.server({
        // root: '/source/circleproject/circle/doc/html/',
        port:8080,
        livereload: true
    });
});

gulp.task('allJs', function () {
    return gulp.src(['www/js/*.js', 'www/directive/*/*.js', 'www/views/*/*.js'])
        .pipe(concat("all.js"))
        .pipe(gulp.dest("www/"));
});
gulp.task('sass',function () {
    return gulp.src(['scss/*.scss','scss/*/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("css.css"))
        .pipe(gulp.dest("www/css"));
})
gulp.task('reload', ['allJs','sass'], function () {
    return gulp.src(['www/'])
    .pipe(connect.reload());
})

gulp.task('watch', function () {
    gulp.watch(['scss/*.scss','scss/*/*.scss', 'www/index.html', 'www/js/*.js', 'www/directive/*/*', 'www/views/*/*'], ['reload']);
});

gulp.task('default', ['connect', 'watch']);
