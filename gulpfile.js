'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

var processors = [
    autoprefixer({
        browsers: ['last 1 version']
    }),
    mqpacker,
    csswring
];

gulp.task('img', function() {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('less', function() {
    gulp.src('src/mb.less')
        .pipe(less({
            paths: [
                path.join(__dirname, 'less')
            ]
        }))
        .on('error', console.error)
	.pipe(postcss(processors))
        .pipe(gulp.dest('dist'));
});

gulp.task('less.lite', function() {
    gulp.src('src/mb.lite.less')
        .pipe(less({
            paths: [
                path.join(__dirname, 'less')
            ]
        }))
        .on('error', console.error)
	.pipe(postcss(processors))
        .pipe(gulp.dest('dist'));
});


gulp.task('concat', function() {
    var processors = [
        autoprefixer({
            browsers: ['last 1 version']
        }),
        mqpacker,
        csswring
    ];
    return gulp.src('css/**/*.css')
        .pipe(concat('mb.css'))
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist'));
});


gulp.task('clean', function(done) {
    require('del')([
        'dist', 'css/mb.css'
    ], done);
});


gulp.task('default', function(cb) {
    runSequence('clean', 'less', 'less.lite','img', cb);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.less', ['default']);
});
