const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');

const libraryCss = [
    require.resolve('ol/ol.css'),
];

module.exports = merge(baseConfig, {
    mode: "development",
    output: {
        crossOriginLoading: 'anonymous',
        filename: '[name].bundle.js',
        publicPath: '/dist/',
    },
    plugins: [
        new HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(css)$/,
                include: [...libraryCss],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: false,
                            importLoaders: 0,
                        }
                    }
                ],
            },
            {
                test: /\.(css)$/,
                exclude: [...libraryCss],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 0,
                        }
                    }
                ],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, '../'),
        openPage: '/index.html',
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        },
        port: 9090,
        https: false,
        historyApiFallback: true,
    },
});
