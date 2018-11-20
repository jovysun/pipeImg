const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        pipeImg: __dirname + "/src/js/pipeImg.js"
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "[name].bundle.js",
        libraryTarget: 'umd'
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './',
        compress: true,
        port: 9000
    },
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
        new HtmlWebpackPlugin({
            template: __dirname + "/src/test.html"
        })
    ]

}
