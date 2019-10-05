const { DEFAULT_EXTENSIONS } = require('@babel/core');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    context: path.resolve(__dirname, '../../'),
    entry: {
        "app": "./examples/ExampleApp.tsx",
    },
    output: {
        path: path.join(__dirname, "../dist")
    },
    devtool: "cheap-module-eval-source-map",
    resolve: {
        extensions: [...DEFAULT_EXTENSIONS, '.tsx', '.ts', '.js', '.jsx', '.mjs', '.ejs'],
        alias: {
            'openlayers-react': path.resolve(__dirname, '../../src'),
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
