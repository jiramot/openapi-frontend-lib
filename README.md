## How to expose javascript library
https://webpack.js.org/guides/author-libraries/

```javascript
// webpack.config.js
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack-numbers.js',
        library: "webpackNumbers",
    },
};
```

## Build
```shell
npm run build
```