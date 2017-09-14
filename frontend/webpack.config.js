const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
watch: true,
cache: true,
devtool: '#cheap-module-eval-source-map',
entry: {
    app: './src/app.js',
},
output: {
    filename: './dist/bundle.js',
},
devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 3001
},
resolve: {
    modules: ["node_modules"],
},
module: {
    loaders: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        // { test: /\.scss$/, use: [{
        //         loader: "style-loader" // creates style nodes from JS strings
        //     }, {
        //         loader: "css-loader" // translates CSS into CommonJS
        //     }, {
        //         loader: "sass-loader" // compiles Sass to CSS
        //     }]
        // },
        {
        test: /\.scss|\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                // resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader']
            })
        },
    ]
},
plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: './src/template.html',
        filename: './dist/index.html',
        inject: 'body'
      }),
    new ExtractTextPlugin('./dist/style.css')
]
};