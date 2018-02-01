require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const env = process.env.NODE_ENV || 'development';

const webpackConfig = {
    target: 'web',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js',
        publicPath: process.env.BASENAME + '/'
    },
    resolve: {
        modules: [
            path.resolve('src'),
            'node_modules',
        ],
        extensions: ['.js', '.jsx'],
        alias: {
            '../../theme.config$': path.join(__dirname, 'semantic-theme/theme.config')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env),
            },
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            alwaysWriteToDisk: true
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
        }),
        new Dotenv({
            path: './.env'
        })
    ],
    devtool: 'eval-source-map',
    devServer: { 
        historyApiFallback: true,
        publicPath: process.env.BASENAME + '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
                use: 'file-loader?name=[name].[ext]?[hash]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
            }
        ]
    }
};

if (env === 'production') {
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
        })
    );
    delete webpackConfig.devtool;
    delete webpackConfig.devServer;
    require('fs').writeFileSync(path.resolve('dist') + '/.htaccess',
        `<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase ${process.env.BASENAME}/
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . ${process.env.BASENAME}/index.html [L]
</IfModule>`);
}

module.exports = webpackConfig;