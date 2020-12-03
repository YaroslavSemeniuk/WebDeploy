const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';
const ROOT_DIR = fs.realpathSync(process.cwd());

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: '',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['autoprefixer'],
          //       // plugins: () => [
          //       //   autoprefixer({})
          //       // ]
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=10000&name=img/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      __DEV__: isDevMode,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: ROOT_DIR,
    publicPath: '',
    host: 'localhost',
    port: 8090,
    compress: true,
    clientLogLevel: 'silent',
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    stats: {
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      timings: true,
    },
    historyApiFallback: true,
    disableHostCheck: true,
  },
};
