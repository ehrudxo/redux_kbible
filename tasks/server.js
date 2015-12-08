import gulp from 'gulp';
import connect from 'gulp-connect';

gulp.task('server', () => {
   connect.server({
       root: 'build',
       livereload: true
   });
});
