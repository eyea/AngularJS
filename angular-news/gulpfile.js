var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');
    sass = require('gulp-sass');

//connect任务开启一个web调试服务，访问http://localhost:8080 
gulp.task('connect', function () {
    connect.server({
        port:8080,
        livereload: true
    });
});
//allJs任务，执行合并js任务
gulp.task('allJs', function () {
    //合并数组中所有的js文件为all.js放入www文件夹中
    return gulp.src(['www/js/*.js', 'www/directive/*/*.js', 'www/views/*/*.js'])
        .pipe(concat("all.js"))
        .pipe(gulp.dest("www/"));
});
//sass任务，执行编译sass任务
gulp.task('sass',function () {
    //编译scss文件把编译后的文件合并为css.css放入www/css文件夹中
    return gulp.src(['scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("css.css"))
        .pipe(gulp.dest("www/css"));
})
//reload任务，在执行reload之前先执行allJs和sass任务
gulp.task('reload', ['allJs','sass'], function () {
    //刷新web调试服务器
    return gulp.src(['www/'])
    .pipe(connect.reload());
})
//watch任务，开启一个监控
gulp.task('watch', function () {
    //监控数组中文件的修改，如果有修改则执行reload任务
    gulp.watch(['scss/*.scss', 'www/index.html', 'www/js/*.js', 'www/directive/*/*', 'www/views/*/*'], ['reload']);
});
//默认的gulp任务，直接执行gulp即可启动default，启动default前启动connect和watch任务
gulp.task('default', ['connect', 'watch']);