'use strict'

const gulp = require('gulp');
const babel = require("gulp-babel");

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create(), //自动刷新
    reload = browserSync.reload;

// babel and uglify
gulp.task('scripts', function() {
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('babel', function() {
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
    return gulp.src('dist/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist/*.js', {read: false})
        .pipe(clean())
        .pipe(gulp.dest('dist'));
});

//监控改动并自动刷新任务;
gulp.task('watcher', function() {
    gulp.watch('src/*.js', ['babel']);
    gulp.watch(['dist/*.js', '*.html']).on('change', reload);
});

// 创建本地服务器，并实时更新页面
gulp.task('serve', function() {

    browserSync.init({
        // https: 'https',
        port: 3000,
        // browser: ["google chrome"],
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

});

gulp.task('dev', ['serve', 'watcher']);
gulp.task('build', ['clean','scripts']);
gulp.task('default', ['serve']);