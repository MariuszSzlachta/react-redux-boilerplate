const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const VENDOR_LIBS = [
  'react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk',
];

module.exports = (env, argv) => {
  // Webpack mode is set in the npm 'build' script - mode sets 'process.env.NODE_ENV' value to 'development' or
  // 'production' and tells webpack to use its built-in optimizations
  const isProduction = argv.mode === 'production';

  return ({
    // Entries are the root files from which the webpack will start reading code - each entry generates separate bundle
    entry: {
      // 'vendors' bundle constains packages listed in 'VENDOR_LIBS' - they can go to separate bundle because
      // the are usually update less often and application user in case on app update will need to download
      // less data ('vendors.js' will be served from cache)
      vendors: VENDOR_LIBS,
      // 'bundle' bundle contains 'babel-polyfill' (new built-ins like 'Promise', 'Array.from' or
      // 'Object.assign' will be polyfilled) and the rest of the application code and packages
      bundle: ['babel-polyfill', './src/index.jsx'],
    },
    // Output bundle settings
    output: {
      // Absolute path to directory where bundles will be saved
      path: path.resolve(__dirname, 'dist'),
      // 'publicPath' specifies the base path for all the assets within application (e.g. assignment
      // of '/' will generate '/assets/bundle.js' instead of 'assets/bundle.js')
      publicPath: '/',
      // Name of generated bundles ('[name]' is just bundle entry name e.g. 'vendors')
      filename: 'assets/js/[name].[hash:8].js',
      // Name of generated chunks
      chunkFilename: 'assets/js/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          // 'oneOf' will traverse all following loaders until one will match the requirements - when
          // no loader matches it will fall to the 'file-loader' at the end of the loaders list
          oneOf: [
            // 'url-loader' works like 'file-loader' except that it embeds assets smaller than limit specified
            // in bytes (10 kilobytes in this case) as base64 URLs to limit the number of HTTP requests
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
            // 'svg-sprite-loader' creates SVG sprite (one file containing all SVG icons) to limit the number
            // of HTTP requests (this won't work without 'SpriteLoaderPlugin' in 'plugins')
            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'assets/media/sprite.[hash:8].svg',
              },
            },
            // 'babel-loader' Processes JavaScript files with Babel (Babel configration is located in '/.babelrc' file)
            {
              test: /\.js|jsx$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  // This feature of 'babel-loader' enables caching results in './node_modules/.cache/babel-loader/'
                  // directory for faster rebuilds
                  cacheDirectory: !isProduction,
                  // This feature will not include needless whitespace characters and line terminators
                  compact: isProduction,
                },
              },
            },
            // Process CSS and SCSS files with listed loaders
            {
              test: /\.s|css$/,
              exclude: /node_modules/,
              use: [
                // In 'production' mode 'MiniCssExtractPlugin' grabs the result CSS and
                // puts it into separate file in the build process (this won't work without
                // 'MiniCssExtractPlugin' in 'plugins') and in 'development' mode 'style-loader'
                // turns CSS into JS modules, adds them to the HTML document by injecting
                // '<style>' tags and enables hot editing of CSS
                isProduction
                  ? {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // TODO:
                      // MiniCssExtractPlugin expects the build output to be flat (all files
                      // in one directory). However, our output is structured with `assets/*`
                      // folders. To have this structure working with relative paths, we have to
                      // use this custom option. Bu default paths in stylesheet will looks like
                      // `assets/media` so we have to add `../..` to get out from `css` folder.
                      publicPath: '../../',
                    },
                  }
                  : 'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    // This option configures how many loaders before 'css-loader' should be applied
                    // to imported resources (1 => postcss-loader; 2 => postcss-loader,sass-loader)
                    importLoaders: 2,
                    sourceMap: true,
                  },
                },
                // PostCSS configuration is located in '/postcss.config.js' file
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: true,
                  },
                },
                // 'sass-loader' uses node-sass to compile Sass code
                {
                  loader: 'sass-loader',
                  options: {
                    // // Content of this files will be available in every SASS file.
                    // data: '@import "variables"; @import "functions"; @import "mixins";',
                    // includePaths: [
                    //   path.join(__dirname, 'src', 'styles'),
                    // ],
                    sourceMap: true,
                  },
                },
              ],
            },
            // 'file-loader' doesn't use a 'test' so it will catch all modules that fall through
            // the other loaders and copy them to the 'dist' folder
            {
              exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
              loader: 'file-loader',
              options: {
                name: 'assets/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      // Enable Hot Module Replacement
      new webpack.HotModuleReplacementPlugin(),
      // Generate an 'index.html' file with the injected scripts and styles
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/templates/index.html',
        // Content of '<title>' tag
        title: 'Application name',
        // Content of '<meta name="description">' tag
        description: 'Application description',
        // Content of '<meta name="application-name">' tag
        applicationName: 'Application name',
        // favicon: './src/assets/favourites-icons/favicon.png',
        minify: {
          removeComments: isProduction,
          collapseWhitespace: isProduction,
          removeRedundantAttributes: isProduction,
          useShortDoctype: isProduction,
          removeEmptyAttributes: isProduction,
          removeStyleLinkTypeAttributes: isProduction,
          keepClosingSlash: isProduction,
          minifyJS: isProduction,
          minifyCSS: isProduction,
          minifyURLs: isProduction,
        },
      }),
      // This won't work without 'MiniCssExtractPlugin.loader' in 'loaders'
      new MiniCssExtractPlugin({
        filename: 'assets/css/styles.[contenthash:8].css',
      }),
      // Generate sourcemaps for external CSS files
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false, annotation: true,
          },
        },
      }),
      // Generate Service Worker (`service-worker.js` by default).
      new WorkboxWebpackPlugin.GenerateSW({
        // Ability to publish a new service worker and control a web page as soon as possible.
        // These options encourage the Service Workers to get in there fast and not allow
        // any straggling "old" SWs to hang around.
        clientsClaim: true,
        skipWaiting: true,
        // Name of cache.
        cacheId: 'Application Name',
        runtimeCaching: [
          {
            urlPattern: /.*/,
            handler: 'networkFirst',
          },
        ],
      }),
      // This won't work without 'svg-sprite-loader' in 'loaders'
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
      // Generate 'manifest.json' file
      new WebpackPwaManifest({
        name: 'Application name',
        short_name: 'App',
        description: 'Application description',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        fingerprints: false,
        inject: true,
        ios: true,
        icons: [
          {
            src: path.resolve('src/assets/app-icons/icon-android.png'),
            destination: path.join('assets', 'icons', 'android'),
            sizes: [36, 48, 72, 96, 144, 192, 512],
          },
          {
            src: path.resolve('src/assets/app-icons/icon-ios.png'),
            destination: path.join('assets', 'icons', 'ios'),
            sizes: [57, 72, 144, 120, 144, 152, 167, 180],
            ios: true,
          },
        ],
      }),
    ],
    resolve: {
      // Extensions that can be omitted when importing files
      extensions: ['.js', '.jsx'],
      // Mark '/src' directory as modules directory to avoid '../../../../'
      modules: [path.resolve(__dirname, 'src'), './node_modules'],
    },
    // Generate fast sourcemaps in development mode and slow but with good results in production mode
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    // Webpack DevServer configuration
    devServer: {
      // Tell the server where to serve content from
      contentBase: path.join(__dirname, 'dist'),
      // Enables visiting page on other devices connected to the same network
      host: '0.0.0.0',
      // Response with 'index.html' on every URL
      historyApiFallback: true,
      // Enable 'gzip' compression of generated files
      compress: true,
      // Enable Hot Reloading
      hot: true,
      // // Enable HTTPS
      // https: true,
      // // Proxying URLs can be useful when you have a separate API backend development server
      // // and you want to send API requests on the same domain.
      // proxy: {
      //   '/api/*': {
      //     target: 'http://localhost:5000',
      //   },
      // },
      // Configure console output (in this case only warnings and errors with its details will be shown)
      stats: {
        all: false,
        warnings: true,
        errors: true,
        errorDetails: true,
      },
    },
    // TODO:
    // Enable optimization of our output files: bundle.js and vendors.js.
    // Webpack will remove packages listed in vendors entry point from bundle.js
    // and place them only in vendors.js.
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            // The name of the split chunk (same as entry point).
            name: 'vendors',
            chunks: 'initial',
            // Select only modules from /node_modules/ directory.
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
  });
};
