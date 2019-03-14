const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const pug           = require('gulp-pug');
const sass          = require('gulp-sass');
const sassPleeease  = require('gulp-pleeease');
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = require('./webpack.config');

const commonConfig = {
  pug: {
    srcFile: ['./src/pug/**/*.pug', '!./src/pug/include/*.pug'],
    destDirectory: './',
  },
  sass: {
    srcFile: './src/assets/scss/**/*.scss',
    destDirectory: './assets/css',
  },
  webpack: {
    srcFile: './src/assets/js/**/*.js',
    // srcFile: './src/assets/ts/**/*.ts',
    destDirectory: './assets/js',
  }
}



gulp.task('bs', () => {
  browserSync.init(null, {
    server: {
      baseDir: '../../'
    },
    open: false
  });
});



gulp.task('pug', () => {
  return gulp.src(commonConfig.pug.srcFile)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(commonConfig.pug.destDirectory));
});

gulp.task('pugReload', gulp.series(gulp.parallel('pug'), () => {
  return gulp.src(commonConfig.pug.srcFile)
    .pipe(browserSync.stream({once: true}));
}));



gulp.task('sass', () => {
  return gulp.src(commonConfig.sass.srcFile)
    .pipe(sass({pretty: true}))
    .pipe(sassPleeease({
      minifier: true,
      autoprefixer: {
        browsers: ['last 6 versions']
      }
    }))
    .pipe(gulp.dest(commonConfig.sass.destDirectory));
});

gulp.task('sassReload', gulp.series(gulp.parallel('sass'), () => {
  return gulp.src(commonConfig.sass.srcFile)
    .pipe(browserSync.stream({once: true}));
}));



gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(commonConfig.webpack.destDirectory));
});

gulp.task('webpackReload', gulp.series(gulp.parallel('webpack'), () => {
  return gulp.src(commonConfig.webpack.srcFile)
    .pipe(browserSync.stream({once: true}));
}));



gulp.task('watch', () => {
  gulp.watch(commonConfig.pug.srcFile, gulp.task('pugReload'));
  gulp.watch(commonConfig.sass.srcFile, gulp.task('sassReload'));
  gulp.watch(commonConfig.webpack.srcFile, gulp.task('webpackReload'));
});



gulp.task('default', gulp.series(gulp.parallel('bs', 'watch')));
