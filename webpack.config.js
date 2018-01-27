const path = require('path');
module.exports = {
    entry: ['./src/app.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        modules: [
            path.resolve('src'),
            'node_modules',
        ],
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};