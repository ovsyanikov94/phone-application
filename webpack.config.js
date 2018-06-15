"use strict";

const path = require('path');

module.exports = {
<<<<<<< HEAD
    mode: "production",
=======
>>>>>>> 33d80dc42f74d2b44b8987dc9b7cd3bfc1f0683c
    entry: './frontend/app.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public/js')
    },
<<<<<<< HEAD
    devtool: "source-map",
    module: {
        rules: [
                {
                    test: /\.hbs$/,
                    loader: "handlebars-loader"
                }
        ]
    }
=======
    watch: true
>>>>>>> 33d80dc42f74d2b44b8987dc9b7cd3bfc1f0683c
};