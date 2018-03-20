'use strict';

const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.js',
    target: 'node',
    externals: [nodeExternals()]
};