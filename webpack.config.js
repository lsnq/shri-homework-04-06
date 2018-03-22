const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sass = new ExtractTextPlugin({filename: 'style.css'});
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './app/index.js',
        'assets/script': './app/assets/script.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: sass.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {minimize: true}},
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        sass,
        new CopyWebpackPlugin([
            {from: 'app/views/', to: 'views/'}
        ])
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node',
    externals: [nodeExternals()]
};
