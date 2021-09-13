const path = require('path');

const config = {
    // watch: true,
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'sdk.js',
        library: "sdk",
        libraryTarget: "umd",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
                'eslint-loader'
            ],
        }]
    },
    plugins: [],
};
// Exports
module.exports = config;