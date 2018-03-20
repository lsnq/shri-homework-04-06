'use strict';

const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSASS = new ExtractTextPlugin({filename: 'style.css'});

module.exports = {
    entry: {
        index: './app/index.js',
        'assets/main': './app/public/script.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSASS.extract({ // Instance 2
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        extractSASS // Instance 2
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node',
    externals: [nodeExternals()]
};
