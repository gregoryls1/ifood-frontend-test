const HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
var path = require("path");

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: "./public",
        hot: true,
        inline: true,
        quiet: false,
        noInfo: true,
        stats: { colors: true }
    },
    output: {
        path: path.join(__dirname, "./public"),
        filename: "./assets/js/bundle.js"
    },
    module: {
        rules: [

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use: {
                    loader: "babel-loader",
                    options: {
                        sourceMaps: true,
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-transform-runtime"],
                    },
                }
            },

            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },

            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ]
};