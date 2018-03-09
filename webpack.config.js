const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: './src/app.jsx',
    output: {
      path: path.join(__dirname, 'public', 'assets'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.jsx|js$/,
        exclude: /node_modules/
      }, {
        test: /\.s|css$/,
        exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
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
          })
       }, {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: 'assets/'
              }
            }
          ]
      }]
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new HTMLPlugin({
        title: 'React Boilerplate',
        filename: '../index.html',
        template: './src/templates/template.html',
        minify: {
          removeAttributeQuotes: isProduction,
          collapseWhitespace: isProduction,
          html5: isProduction,
          minifyCSS: isProduction,
          removeComments: isProduction,
          removeEmptyAttributes: isProduction,
        }
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      host: "0.0.0.0",
      publicPath: '/assets/',
      stats: {
        all: false,
        warnings: true,
        errors: true,
        errorDetails: true
      }
    }
  };
};
