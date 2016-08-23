
var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackAppConfig = require('./webpack.config.app.js');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('default', ['server']);

gulp.task('build', function(callback) {

  var myConfig = Object.create(webpackAppConfig);
  myConfig.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
                screw_ie8: true,
            },
            mangle: {
                screw_ie8: true,
            },
        }),
        new webpack.DefinePlugin({
          'process.env': {
             NODE_ENV: JSON.stringify('production')
           }
        })
  ];

  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    callback();
  });
});

gulp.task('server', function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
        contentBase: myConfig.devServer.contentBase,
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        // Display only errors to reduce the amount of output.
        stats: {
            colors: true
        }
    }).listen(8080, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
	});
});
