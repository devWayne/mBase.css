'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var runSequence = require('gulp-run-sequence');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');


gulp.task('img', function(){
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('less', function() {
  gulp.src('src/ns.less')
    .pipe(less({
      paths: [
        path.join(__dirname, 'less')
      ]
    }))
    .on('error', console.error)
    .pipe(gulp.dest('css/ns-css'));
});

gulp.task('postcss', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src('css/**/*.css')
    	.pipe(concat('ns.css'))
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist'));
});


gulp.task('clean', function(done) {
    require('del')([
      'dist','css/ns.css'
    ], done);
});


gulp.task('default', function(cb) {
  runSequence('clean','less','img','postcss', cb);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.less', ['default']);
});


