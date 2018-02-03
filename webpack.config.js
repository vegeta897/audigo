require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const env = process.env.NODE_ENV || 'production';

const webpackConfig = {
    target: 'web',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js',
        publicPath: '/'
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
                BROWSER: JSON.stringify(true)
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
        }),
        new CopyWebpackPlugin([
            'src/icon.png',
            'src/favicon.png'
        ])
    ],
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3000,
        proxy: {
            '*': {
                target: 'http://localhost:' + process.env.PORT,
                secure: true
            }
        }
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

if(env === 'production') {
    webpackConfig.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin()
    );
    delete webpackConfig.devtool;
    delete webpackConfig.hot;
}
if(env === 'development') {
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin({
            multiStep: false
        })
    );
}

module.exports = webpackConfig;