import gulp from 'gulp';
import webpack from 'webpack-stream';
import runSequence from 'run-sequence';
import del from 'del';
import mergeStream from 'merge-stream';

var plugins =  require('gulp-load-plugins')();

function isProduction(){
  return process.env.NODE_ENV === 'production';
}

function isDevelopment(){
  return process.env.NODE_ENV === 'development';
}

function js_pipe(options={}){
  var cfg = Object.assign({},require('../config/webpack')(process.env.NODE_ENV),options);
  return gulp.src(['src/js/main.js'])
      .pipe(plugins.plumber())
      .pipe(webpack(cfg));
}

function html(){
  return gulp.src('src/index.html');
}

function bookZip(){
  return gulp.src('book/k_bible_1950_utf_kr.lz')
}

function resources(){
  var watch = isDevelopment();
  return mergeStream(
    js_pipe({watch}),
    bookZip()
  );
}

gulp.task('assets:clean',()=>{
  del(['./build/*','!build/.gitkeep'])
});

gulp.task('assets:resources',()=>{
  var stream = resources();
  if(isProduction()){
    stream = stream
          .pipe(plugins.rev())
          .pipe(plugins.revCssUrl())
          .pipe(gulp.dest('build'))
          .pipe(plugins.rev.manifest())
  }
  return stream.pipe(gulp.dest('build'));
});

gulp.task('assets:html:build',()=>{
  var stream = html();
  if(isProduction()){
    var manifest = gulp.src('build/rev-manifest.json');
    stream = stream.pipe(
      plugins.revReplace({manifest:manifest})
    );
  }
  stream.pipe(gulp.dest('./build'));
});


gulp.task('assets:build',(callback)=>{
  if(isDevelopment()){
    runSequence(
      'assets:clean',
      'assets:html:build',
      'assets:resources',
      callback
    )
  }else{
    runSequence(
      'assets:clean',
      'assets:resources',
      'assets:html:build',
      callback
    );
  }
});
