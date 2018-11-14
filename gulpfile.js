'use strict'

const gulp = require('gulp');
const babel = require("gulp-babel");

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create(), //自动刷新
    reload = browserSync.reload;
const webpack = require('webpack-stream');

const sass = require('gulp-sass');
var named = require('vinyl-named');

// scss文件编译成css
gulp.task('sass', function () {
    gulp.src('src/css/pipeImg.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});

gulp.task('babel', function() {
    return gulp.src('src/js/bundle/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream: true}));
});

gulp.task('uglify', function() {
    return gulp.src('dist/js/pipeImg.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
    return gulp.src('dist/js/*.js')
        .pipe(clean())
        .pipe(gulp.dest('dist/js'));
});
// js模块化处理 
gulp.task('bundle', function() {
  return gulp.src(['src/js/pipeImg.js'])
    .pipe(named())
    .pipe(webpack({
      mode: 'development',
      module:{
        rules: [
            {
                test: /\.tpl$/,
                use: 'raw-loader'
            }
        ]
    },
    devtool: 'eval-source-map'
    }))
    .pipe(gulp.dest('src/js/bundle'));
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

    gulp.watch('src/css/*.scss', ['sass']);
    gulp.watch(['src/js/*.js', 'src/js/*.tpl'], ['bundle', 'babel']);
    gulp.watch(['*.html']).on('change', reload);
});

gulp.task('dev', ['sass', 'bundle', 'babel', 'serve']);
gulp.task('build', ['clean', 'sass', 'bundle', 'babel', 'uglify']);
gulp.task('default', ['serve']);
