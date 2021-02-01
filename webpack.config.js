const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ROOT_DIR = __dirname;
const CLIENT_CONFIGS_DIR = path.resolve(ROOT_DIR, './config');
const CONFIG_NAME = (process.env.CONFIG_NAME = process.env.CONFIG_NAME.trim());
const isDevelopment = process.env.WEBPACK_DEV_SERVER === 'true';
function getJSONConfig() {
  let commonConfig = require(CLIENT_CONFIGS_DIR + '/common.json');
  let configPath = require(CLIENT_CONFIGS_DIR + '/' + CONFIG_NAME + '.json');
  return Object.assign(commonConfig, configPath);
}
const JSON_CONFIG = getJSONConfig();
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(ROOT_DIR, '/dist'),
    publicPath: JSON_CONFIG.publicPath,
    filename: 'bundle.js?time' + +new Date(),
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                require('@babel/plugin-proposal-optional-chaining'),
                require('@babel/plugin-syntax-dynamic-import'),
                require('@babel/plugin-proposal-object-rest-spread'),
                [
                  require('@babel/plugin-proposal-decorators'),
                  { legacy: true },
                ],
                [
                  require('@babel/plugin-proposal-class-properties'),
                  { loose: true },
                ],
              ],
            },
          },
        ],
        include: [/node_modules\/sbx-.+/, /src/, /sbx_modules/],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/assets/sass/common.scss'],
            },
          },
        ],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.pdf$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: 'file-loader?name=[name].[ext]',
        use: [
          {
            loader: 'file-loader?name=[name].[ext]',
            options: {
              outputPath: 'media',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /jsx/,
            use: ['@svgr/webpack'],
          },
          {
            resourceQuery: /url/,
            use: 'file-loader?name=[name].[ext]',
          },
          {
            use: 'svg-inline-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: ROOT_DIR + '/src/app/components',
      containers: ROOT_DIR + '/src/app/containers',
      actions: ROOT_DIR + '/src/app/actions',
      core: ROOT_DIR + '/src/app/core',
    },
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: './src/favicon.svg',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      config: JSON.stringify(JSON_CONFIG),
      title: JSON_CONFIG.name,
    }),
  ],
};
