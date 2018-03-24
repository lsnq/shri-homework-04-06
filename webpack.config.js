const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sass = new ExtractTextPlugin({filename: 'assets/style.css'});
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
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
            {from: 'app/views/', to: 'views/'},
            {from: 'app/*.js', to: './', flatten: true},
            {from: 'app/assets/favicon.ico', to: 'assets/'}
        ]),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/',
                open: false
            },
            {
                reload: true
            }
        )
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node',
    node: {
        __dirname: true
    },
    externals: [nodeExternals()]
};
