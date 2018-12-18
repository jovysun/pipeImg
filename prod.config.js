const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        'pipeImg.bundle': './src/js/pipeImg.bundle.js',
        'pipeImg': './src/js/pipeImg.js'
    },
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "[name].min.js",
        libraryTarget: 'umd'
    },

    devtool: 'cheap-module-source-map',
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: "postcss-loader"
                }]
            },
            {
                test: /\.tpl$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000 //这里要足够大这样所有的字体图标都会打包到css中
                    }
                }
            }
        ]
    },
    externals : {
        "jquery": {
            commonjs: "jQuery",//如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
            commonjs2: "jQuery",//同上
            amd: "jQuery",//如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
            root: "jQuery"//如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
        },
        "template": {
            commonjs: "template",
            commonjs2: "template",
            amd: "template",
            root: "template"
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist/js/*.min.*'])
    ]

}
