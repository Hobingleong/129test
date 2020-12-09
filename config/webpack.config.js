const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        app: './src/app.js',
        arry: './src/arry.js'
        // img: './src/img.js'
        // index: './src/index.css',
        // index: './src/index.less'
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].[hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: miniCssExtractPlugin.loader
                    },
                    // {
                    //     loader: 'style-loader'
                    // },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [{
                        loader: miniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ],
            },
            // {
            //     test: /\.(jpg|png|jpeg|webp|gif)$/,
            //     use: [{
            //         loader: 'file-loader'
            //     }]
            // },
            {
                test: /\.(jpg|png|jpeg|webp|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 102400
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|brower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: '<>',
            template: './src/tpl.html',
            inject: 'head',
            minify: {
                removeComments: false,
                removeAttributeQuotes: false,
                collapseWhitespace: false
            },
            filename: 'index_1.html'
        }),
        new miniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}