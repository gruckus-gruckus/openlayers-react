/**
 * This config is to build dist/react-openlayers.umd.js
 */
var path = require("path");
var webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "lib/[name].umd.js",
    sourceMapFilename: "lib/[name].umd.js.map",
    libraryTarget: "umd"
  },
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin({
      cache: true,
      sourceMap: true,
      parallel: true,
    })]
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    disableHostCheck: true,
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    isProduction ? new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }) : null
  ].filter(Boolean),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.html'],
    alias: {
      'react-openlayers': path.join(__dirname, 'src', 'index.ts')
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      { test: /\.html/, use: 'html-loader' },
      {
        test: /\.(js|ts)x?$/,
        use: [{
          loader: 'babel-loader?cacheCompression=false&cacheDirectory=true',
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
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread"
            ],
          }
        }]
      }
    ]
  }
};
