const { DEFAULT_EXTENSIONS } = require('@babel/core');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        "app": "./ExampleApp.tsx",
    },
    context: path.resolve(__dirname, '..'),
    output: {
        path: path.join(__dirname, "../dist")
    },
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    resolve: {
        extensions: [...DEFAULT_EXTENSIONS, '.tsx', '.ts', '.js', '.jsx', '.mjs', '.ejs'],
        alias: {
            'openlayers-react': path.resolve(__dirname, '../../'),
            react: path.resolve('./node_modules/react'),
            ol: path.resolve('./node_modules/ol'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs|ts|tsx)$/,
                use: [
                    {
                        loader: "babel-loader?cacheDirectory=",
                        options: {
                            babelrc: false,
                            presets: [
                                ["@babel/preset-env", {
                                    targets: {
                                        edge: "12",
                                        ie: "11",
                                        chrome: "33",
                                        safari: "10",
                                        samsung: "9"
                                    },
                                    modules: false,
                                    useBuiltIns: false,
                                }],
                                "@babel/preset-react",
                                "@babel/preset-typescript"
                            ],
                            plugins: [
                                "react-hot-loader/babel",
                                "@babel/plugin-syntax-dynamic-import",
                            ],
                        }
                    }
                ]
            }
        ]
    }
};
