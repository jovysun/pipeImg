'use strict'

const gulp = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create(), //自动刷新
    reload = browserSync.reload;
const sass = require('gulp-sass');

gulp.task('copy', function () {
    return gulp.src('src/css/common/font/*')
        .pipe(gulp.dest('dist/css/common/font'))
});
// scss文件编译成css
gulp.task('sass', function () {
    return gulp.src(['src/css/common/common.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/css/common'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('clean', function () {
    return gulp.src(['dist/css'])
        .pipe(clean())
        .pipe(gulp.dest('dist'));
});

// 创建本地服务器，并实时更新页面
gulp.task('serve', function () {

    browserSync.init({
        // https: 'https',
        port: 3000,
        // browser: ["google chrome"],
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

    gulp.watch('src/css/*.scss', ['sass']);
    gulp.watch(['*.html', 'dist/js/*.js']).on('change', reload);
});

gulp.task('dev', ['sass', 'serve']);
gulp.task('build', ['copy','sass']);
gulp.task('default', ['serve']);
