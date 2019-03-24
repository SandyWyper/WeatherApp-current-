 var path = require('path');
 var webpack = require('webpack');
 
 module.exports = {
     module: {
         rules: [{
             test: /\.m?js$/,
             exclude: /(node_modules|bower_components)/,
             use: {
                 loader: 'babel-loader',
                 options: {
                     presets: ['@babel/preset-env']
                 }
             }
         }]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map',
     mode: 'development'
 };