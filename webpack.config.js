const path = require('path');

module.exports = {
    entry: './src/component.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '001-counter-reducer.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env'],
                    plugins: [require('babel-plugin-transform-object-rest-spread')]
                }
            }
        ]
    }
};
