var browserify = require('browserify');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifyHTML = require('gulp-minify-html');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browserify', function() {
    return browserify('./frontend/js/app.js')
        .bundle()

        //Pass desired output filename to vinyl-source-stream
        .pipe(source('app.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('../dist/js'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./frontend/index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('../dist'));
});
gulp.task('sass', function() {
    return sass('./frontend/styles/main.scss', {
      sourcemap: true,
      style: 'expanded', /*use 'compressed' for production*/
      trace: true
      //verbose:true 
    }) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })

    .pipe(sourcemaps.write())

    .pipe(gulp.dest('../dist/styles'));
});

gulp.task('build', ['sass', 'minify-html', 'browserify']);