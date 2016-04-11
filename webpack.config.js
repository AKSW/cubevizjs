var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    debug: true,
    context: path.resolve(__dirname),
    entry: './src/app.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.min.js',
    },
    resolve: {
        root: path.resolve(__dirname),
    },
};
