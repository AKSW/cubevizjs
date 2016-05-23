var path = require('path');
var webpack = require('webpack');

const PATHS = {
  dist: path.join(__dirname, 'dist')
};

module.exports = {
    devtool: 'inline-source-map',
    debug: true,
    context: path.resolve(__dirname),
    entry: './src/App.jsx',
    output: {
        path: PATHS.dist,
        filename: 'app.min.js',
    },
    node: {
        fs: 'empty'
    },
    devServer: {
          contentBase: PATHS.dist,
    },
    resolve: {
        root: path.resolve(__dirname),
    },
    externals:{
        sqlite3: 'sqlite3'
    },
    module: {
        loaders: [
         {
           test: /.jsx?$/,
           loader: 'babel-loader',
           exclude: /node_modules/,
           query: {
             presets: ['es2015', 'react']
           }
         }
       ]
    }
};
