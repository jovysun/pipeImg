'use strict'

const gulp = require('gulp');
const babel = require("gulp-babel");

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create(), //自动刷新
    reload = browserSync.reload;
var webpack = require('webpack-stream');

// babel and uglify
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('babel', function() {
    return gulp.src('src/es6/bundle/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', function() {
    return gulp.src('dist/*.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist/js/*.min.js', {read: false})
        .pipe(clean())
        .pipe(gulp.dest('dist/js'));
});
// js模块化处理 
gulp.task('bundle', function() {
  return gulp.src('src/es6/pipeImg.js')
    .pipe(webpack({
      output: {
          filename: 'pipeImg.js'
      }
    }))
    .pipe(gulp.dest('src/es6/bundle'));
});

//监控改动并自动刷新任务;
gulp.task('watcher', function() {
    gulp.watch('src/es6/*.js', ['bundle', 'babel']);
    gulp.watch(['dist/js/*.js', '*.html']).on('change', reload);
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

gulp.task('dev', ['serve', 'bundle', 'babel', 'watcher']);
gulp.task('build', ['clean','uglify']);
gulp.task('default', ['serve']);