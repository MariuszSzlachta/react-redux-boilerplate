const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'assets/scripts/bundle.js',
      chunkFilename: 'chunk-[name]-[chunkhash].js',
    },
    module: {
      rules: [
        // JavaScript and JSX files loader
        {
          test: /\.jsx|js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },

        // Images loader
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/images/',
                name: '[name].[ext]',
              },
            },
            {
              loader: 'img-loader',
              options: {
                enabled: isProduction,
              },
            },
          ],
        },

        // SVG loader
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            spriteFilename: 'assets/images/sprite.svg',
          },
        },

        // Styles loader
        {
          test: /\.s|css$/,
          exclude: [/node_modules/, /\.svg$/],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/styles/utils/_variables.scss',
                  './src/styles/utils/_mixins.scss',
                  './src/styles/utils/_functions.scss',
                ],
              },
            },
          ],
        },
      ],
    },

    // Plugins
    plugins: [
      // Hot Module Replacement
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),

      new HTMLPlugin({
        filename: 'index.html',
        title: 'React-Redux Boilerplate',
        template: './src/templates/index.html',
        minify: {
          collapseWhitespace: isProduction,
        },
      }),
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/styles/styles.css',
        publicPath: '../../',
      }),
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 3000,
          proxy: 'http://localhost:8080/',
          notify: false,
          open: false,
        },
        {
          reload: false,
        },
      ),
    ],

    // Resolve extensions and modules paths
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['./src', './node_modules'],
      alias: {
        Components: path.join(__dirname, 'src', 'components'),
        Containers: path.join(__dirname, 'src', 'containers'),
        Reducers: path.join(__dirname, 'src', 'store', 'reducers'),
        Actions: path.join(__dirname, 'src', 'store', 'actions'),
      },
    },

    // Source maps
    devtool: isProduction ? 'source-map' : 'inline-source-map',

    // Webpack Dev Server configuration
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      hot: true, // Hot Module Replacement
      stats: {
        all: false,
        warnings: true,
        errors: true,
        errorDetails: true,
      },
    },
  };
};
