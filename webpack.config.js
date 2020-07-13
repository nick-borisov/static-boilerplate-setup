/* eslint-disable */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./src/js/index.js', './src/styles/style.scss'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/assets/images/icons/sprite-simple'),
        use: [
          {
            loader: 'svg-sprite-loader',
            // For static sprite file
            // options: {
            //   extract: true,
            //   spriteFilename: 'assets/images/sprite.svg'
            // },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false},
                {removeAttrs: {attrs: '(fill)'}},
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/assets/images/icons/sprite-complex'),
        use: [
          {
            loader: 'svg-sprite-loader',
            // For static sprite file
            // options: {
            //   extract: true,
            //   spriteFilename: 'assets/images/sprite.svg'
            // },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertPathData: false},
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/style.css'
    }),
    new SpriteLoaderPlugin({
      // For static sprite file
      // plainSprite: true
    }),
    new CopyWebpackPlugin([
      './src/robots.txt',
      {
        from: 'src/assets',
        to: 'assets'
      }
    ])
  ]
};
