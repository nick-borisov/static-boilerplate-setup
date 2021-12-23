/* eslint-disable */

const path = require('path');
const fs = require('fs');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views')

const config = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      overlay: true,
    }
  },
  entry: ['./src/js/index.js', './src/styles/style.scss'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, url: false }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
        ],
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/assets/images/icons/sprite'),
        use: [
          // {
          //   loader: 'svg-sprite-loader',
          //   // For static sprite file
          //   options: {
          //     extract: true,
          //     spriteFilename: 'assets/images/sprite.svg',
          //     // symbolId: filePath => `icon-${path.basename(filePath)}`,
          //     // publicPath: '/public/assets/images/icon/'
          //   },
          // },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
                { removeAttrs: { attrs: ['fill', 'fill-rule', 'path:fill', 'path:class'] } },
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/html/includes'),
        use: ['raw-loader']
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/style.css'
    }),
    // new SpriteLoaderPlugin({
    //   // For static sprite file
    //   plainSprite: true
    // }),
    new CopyWebpackPlugin({
      patterns: [
        './src/robots.txt',
        { from: 'src/assets', to: 'assets' },
      ],
    })
  ].concat(htmlPlugins)
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.push(new CleanWebpackPlugin());
  }
  return config;
};
