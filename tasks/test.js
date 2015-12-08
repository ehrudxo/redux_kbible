import gulp from 'gulp';
import {log} from 'gulp-util';
import webpack from 'webpack-stream';
var plugins = require('gulp-load-plugins')();

function testAssets(options = {}) {
    var stream = gulp.src('test/**/*_spec.js');
    var webpackConfig = Object.assign(require('../config/webpack')('test'), options);

    return stream
        .pipe(plugins.plumber())
        .pipe(webpack(webpackConfig))
}

gulp.task('test:server', () => {
    var plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
    return testAssets({watch: true, plugins: [plugin]})
        .pipe(plugins.jasmineBrowser.specRunner())
        .pipe(plugins.jasmineBrowser.server({whenReady: plugin.whenReady}));
});
