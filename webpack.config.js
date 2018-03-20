const nodeExternals = require('webpack-node-externals');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sass = new ExtractTextPlugin({filename: 'style.css'});

module.exports = {
    entry: {
        index: './app/index.js',
        'assets/main': './app/public/script.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: sass.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        sass
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node',
    externals: [nodeExternals()]
};
