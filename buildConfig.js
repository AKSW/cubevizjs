var path = require('path');

module.exports = {
    path: path.join(__dirname, 'dist'),
    testEntryPoint: path.join(__dirname, 'test', 'index.jsx'),
    webpackConfig: {
        debug: require('./webpack.config.js'),
        application: require('./webpack.config.app.js'),
    },
    lintingFiles: [
        './src/**/*',
        './test/**/*',
    ],
};
