require('babel/register')({optional:['es7.objectRestSpread','es7.asyncFunctions','regenerator']});
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('require-dir')('./tasks');
require('gulp').task('default',['assets:build'
// ,'assets:sass:watch'
,'server'
,'test:server'
]);
