'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');


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
    .pipe(gulp.dest('dist/'));

  gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));

});

gulp.task('default', ['less'])
