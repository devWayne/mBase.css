'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

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
    .pipe(gulp.dest('css/'));

  gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));

});

gulp.task('postcss', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src('css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['less','postcss'])
