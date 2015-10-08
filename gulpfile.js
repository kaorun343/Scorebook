'use strict';

var gulp = require('gulp')
var typescript = require('gulp-typescript')
var project = typescript.createProject('tsconfig.json')

gulp.task('copy:html', () => (
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
))

gulp.task('copy:js', () => (
  gulp.src('./src/main.js')
    .pipe(gulp.dest('./build'))
))

gulp.task('copy', ['copy:html', 'copy:js'])
