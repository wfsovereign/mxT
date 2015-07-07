/**
 * Created by wfsovereign on 15-7-7.
 */
/**
 * Created by wfsovereign on 15-4-23.
 */


var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css');

var reload = browserSync.reload;

gulp.task('default', ['serve']);

gulp.task('serve', ['styles','html','script'], function () {
    browserSync({
        server: {
            baseDir: ["./", "dist"]
        }
    });

    gulp.watch("src/*.js").on("change", browserSync.reload);
    gulp.watch("src/styles/*.scss", ['styles']).on("change", browserSync.reload);
    gulp.watch("src/*.html",['html']).on("change", browserSync.reload);
});


gulp.task('styles', function () {
    return sass('src/styles/index.scss', {style: 'expanded'})
        .pipe(gulp.dest('./src/css'))
        //.pipe(rename({suffix:'.min'}))
        //.pipe(minifycss())
        .pipe(gulp.dest("dist/css"))
        .pipe(reload({stream: true}));
});

gulp.task('html',function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream: true}));
});

gulp.task('script',function() {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({stream: true}));
});



