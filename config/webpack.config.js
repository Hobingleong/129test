const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    entry: {
        // tpl2: './src/tpl2.js',
        // app: './src/app.js',
        // arry: './src/arry.js'
        // img: './src/img.js'
        index: './src/index.js'
        // index: './src/index.less'
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].[hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
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
            title: 'document',
            // template: './src/templates/tpl.html',
            template: './src/templates/index.html',
            inject: 'head',
            minify: {
                removeComments: false,
                removeAttributeQuotes: false,
                collapseWhitespace: false
            },
            chunks:['index'],
            filename: 'index.html'
        }),
        // new HTMLWebpackPlugin({
        //     title: 'document',
        //     template: './src/templates/tpl2.html',
        //     inject: 'head',
        //     minify: {
        //         removeComments: false,
        //         removeAttributeQuotes: false,
        //         collapseWhitespace: false
        //     },
        //     chunks:['tpl2'],
        //     filename: 'tpl2.html'
        // }),
        new miniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin()
    ]
}