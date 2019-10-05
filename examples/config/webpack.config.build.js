const path = require('path');
const merge = require('webpack-merge');
const TerserJsPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const baseConfig = require('./webpack.config.base.js');

const libraryCss = [
    require.resolve('ol/ol.css'),
];

module.exports = merge(baseConfig, {
    devtool: "source-map",
    mode: "production",
    output: {
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: "/dist/",
    },
    module: {
        rules: [
            {
                test: /\.(css)$/i,
                include: [...libraryCss],
                exclude: [],
                use: [
                    { loader: MiniCssExtractPlugin.loader, },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: false,
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => ([
                                postcssPresetEnv({ browsers: [
                                    'edge >= 12',
                                    'ie >= 11',
                                    'chrome >= 33',
                                    'safari >= 10',
                                    'samsung > 9'
                                ] }),
                                cssnano()
                            ]),
                        },
                    },
                ],
            },
            {
                test: /\.(css)$/,
                exclude: [...libraryCss],
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => ([
                                postcssPresetEnv({ browsers: [
                                    'edge >= 12',
                                    'ie >= 11',
                                    'chrome >= 33',
                                    'safari >= 10',
                                    'samsung > 9'
                                ] }),
                                cssnano()
                            ]),
                        }
                    },
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].chunk.css',
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            new TerserJsPlugin({
                sourceMap: true,
                cache: true,
                parallel: true,
                extractComments: 'some',
            })
        ],
    },
});
