const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const cssExtract = new ExtractTextPlugin('styles.css');

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
        use: cssExtract.extract({
          use: [
            { 
              loader: 'css-loader',
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
      }]
    },
    plugins: [
      cssExtract
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      host: "0.0.0.0",
      publicPath: '/assets/'
    }
  };
};
