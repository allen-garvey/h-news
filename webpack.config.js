const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: [
            `${__dirname}/js/index.js`, 
            `${__dirname}/sass/style.scss`,
        ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public_html/assets'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public_html'),
            watch: true,
        },
        devMiddleware: {
            publicPath: '/assets/'
        },
        port: 3000,
        historyApiFallback: true, //servers index.html if no route found
        open: true,
        client: {
            overlay: {},
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../assets/style.css',
        }),
    ],
};