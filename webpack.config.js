const path = require('path');

const config = {
    // watch: true,
    entry: './src/index.js',
    output: {
        filename: 'sdk.js',
        library: "sdk",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
                // 'eslint-loader'
            ],
        }]
    },
    plugins: [],
};
// Exports
module.exports = config;