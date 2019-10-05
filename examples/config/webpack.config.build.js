const path = require('path');
const merge = require('webpack-merge');
const TerserJsPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base.js');

const devMode = process.env.NODE_ENV !== 'production'

const libraryCss = [
    require.resolve('ol/ol.css'),
];

module.exports = merge(baseConfig, {
    devtool: "source-map",
    mode: "production",
    output: {
        filename: '[name].[chunkhash].entry.js',
        chunkFilename: '[name].[chunkhash].entry.js',
        publicPath: "/",
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
                            ident: 'postcss',
                            sourceMap: true,
                            map: true,
                            plugins: () => ([
                                autoprefixer({ browsers: ['last 5 versions', '> 1%'] }),
                                postcssPresetEnv(),
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
                            config: { path: './build/postcss.config.js' },
                            ident: "postcss",
                            sourceMap: true,
                            map: true,
                            plugins: () => ([
                                autoprefixer({ browsers: ['last 5 versions', '> 1%'] }),
                                postcssPresetEnv(),
                                cssnano()
                            ]),
                        }
                    },
                ]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
    optimization: {
        minimizer: [
            new TerserJsPlugin({
                sourceMap: true,
                cache: true,
                parallel: true
            })
        ],
    },
});
