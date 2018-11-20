const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        'pipeImg.bundle': "./src/js/pipeImg.js",
        'pipeImg.thin': "./src/js/pipeImg.thin.js"
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
    plugins: [
        new CleanWebpackPlugin(['dist/js'])
    ]

}
