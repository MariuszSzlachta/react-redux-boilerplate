const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk',
];

module.exports = (env, argv) => {
  // Webpack mode is set in the npm `build` script (trough --mode=development/production).
  // Production mode assign 'production' to the `process.env.NODE_ENV` variable and
  // development mode assign 'development' to the `process.env.NODE_ENV` variable.
  const isProduction = argv.mode === 'production';

  return ({
    // Root files of application (files from which the Webpack will start reading code).
    // Thanks to babel-polyfill You can use new built-ins like Promise, Array.from,
    // Object.assign or Array.prototype.includes.
    entry: {
      bundle: ['babel-polyfill', './src/index.jsx'],
      // All vendors (like React, Redux, lodash) can go to separate bundle file
      // because we update it less often. User will need to download only smaller `bundle.js`
      // while `vendors.js` will be served from cache.
      vendors: VENDOR_LIBS,
    },
    output: {
      // Reference to directory (absolute path) where we want to save bundled files.
      // The `path.resolve()` resolves a sequence of path segments into an absolute path.
      // `__dirname` is Node.js variable which store current absolute path.
      path: path.resolve(__dirname, 'dist'),
      // `publicPath` specifies the base path for all the assets within application.
      // Assingment of `./` will generate e.g. `<script src="/assets/bundle.js">`
      // instead of `<script src="assets/bundle.js">`.
      publicPath: '/',
      // Name of output bundled file.
      filename: 'assets/js/[name].[hash:8].js',
      // Name of chunk files.
      chunkFilename: 'assets/js/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          // `oneOf` will traverse all following loaders until one will // match the requirements.
          // When no loader matches it will fall to the `file-loader` at the end of the loader list.
          oneOf: [
            // `url-loader` works like `file-loader` except that it embeds assets smaller than
            // limit specified bytes (10 kilobytes in our case) as data URLs to avoid requests.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              exclude: /favicon\.png/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'assets/media/[name].[hash:8].[ext]',
              },
            },
            // `svg-sprite-loader` creates SVG sprite (one SVG containig all SVG icons to avoid
            // HTTP request for each single icon).
            // This won't work without `MiniCssExtractPlugin` in `plugins`.
            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'assets/media/sprite.[hash:8].svg',
              },
            },
            // Process JavaScript files with Babel. `babel-loader` tells Babel how to work with
            // Webpack, `babel-core` knows how to parse code and generate output and
            // `babel-preset-env` is ruleset of how ES2015+ syntax looks like and how
            // to turn it into ES5 code.
            {
              test: /\.js|jsx$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  // This is a feature of `babel-loader` for Webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: isProduction,
                  // If this option is true, Babel will not include needless whitespace
                  // characters and line terminators.
                  compact: isProduction,
                },
              },
            },
            // Process CSS files with listed loaders. `style-loader` turns CSS into JS modules
            // and adds them to the HTML document by injecting <style> tags. `css-loader` knows
            // how to deal with CSS files, resolves paths in CSS and adds assets as dependencies.
            // `postcss-loader` applies autoprefixer to Your CSS. In production, we use a plugin
            // to extract that CSS to a file, but in development `style-loader` enables hot editing
            // of CSS.
            {
              test: /\.s|css$/,
              exclude: /node_modules/,
              use: [
                // If We are in production mode MiniCssExtractPlugin grabs the result CSS and
                // puts it into separate file in build process instead of injecting <style> tags.
                // This won't work without `new MiniCssExtractPlugin()` in `plugins`.
                isProduction ?
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // MiniCssExtractPlugin expects the build output to be flat (all files
                      // in one directory). However, our output is structured with `assets/*` folders.
                      // To have this structure working with relative paths, we have to use this
                      // custom option. Bu default paths in stylesheet will looks like `assets/media`
                      // so we have to add `../..` to get out from `css` folder.
                      publicPath: '../../',
                    },
                  } :
                  'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    // This option configures how many loaders before css-loader should be applied
                    // to imported resources (1 => postcss-loader; 2 => postcss-loader,sass-loader).
                    importLoaders: 2,
                    minimize: isProduction,
                    sourceMap: true,
                  },
                },
                // PostCSS configuration is located in postcss.config.js file.
                'postcss-loader',
                // This loader uses node-sass to compile SASS code.
                'sass-loader',
              ],
            },
            // When you import an asset, you get its (virtual) filename In production, they
            // would get copied to the `dist` folder. This loader doesn't use a `test` so
            // it will catch all modules that fall through the other loaders.
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
      // Enable Hot Module Replacement.
      new webpack.HotModuleReplacementPlugin(),
      // Generates an `index.html` file with the injected scripts and styles..
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/templates/index.html',
        // <title>
        title: 'Application name',
        // <meta name="description">
        description: 'Application description',
        // <meta name="theme-color">
        themeColor: '#ffffff',
        // <meta name="application-name">
        // <meta name="apple-mobile-web-app-title">
        applicationName: 'Application name',
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
      // This won't work without `svg-sprite-loader` in `loaders`.
      new MiniCssExtractPlugin({
        filename: 'assets/css/styles.[contenthash:8].css',
      }),
      // Generate Service Worker (`service-worker.js` by default)
      new GenerateSW({
        // Ability to publish a new service worker and control a web page as soon as possible.
        // These options encourage the Service Workers to get in there fast and not allow
        // any straggling "old" SWs to hang around.
        clientsClaim: true,
        skipWaiting: true,
        // Name of cache.
        cacheId: 'Application Name',
        runtimeCaching: [
          {
            urlPattern: /images/,
            handler: 'networkFirst',
          },
          {
            urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
            handler: 'networkFirst',
          },
          {
            urlPattern: /.*/,
            handler: 'networkFirst',
          },
        ],
      }),
      // This won't work without `MiniCssExtractPlugin.loader` in `loaders`.
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
      // Copy manifest.json and icons for iOS and Android to `dist` folder.
      new CopyWebpackPlugin([
        {
          from: './src/manifest.json',
          to: 'manifest.json',
        },
        {
          from: './src/assets/icons/ios/*.png',
          to: 'assets/icons/ios/[name].png',
        },
        {
          from: './src/assets/icons/android/*.png',
          to: 'assets/icons/android/[name].png',
        },
      ]),
    ],
    resolve: {
      // Extensions supported in imports.
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), './node_modules'],
    },
    // This will generate fast sourcemaps in development mode and slow (but with good results)
    // in production mode. You can exclude the *.map files from the build during deployment.
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    // Webpack Dev Server configuration.
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      // index.html page will be served on every URL.
      historyApiFallback: true,
      // Enable gzip compression of generated files.
      compress: true,
      // Enable Hot Reloading server.
      hot: true,
      // Enable HTTPS.
      // https: true,
      // In console You usually want to see only warnings and errors with its details.
      stats: {
        all: false,
        warnings: true,
        errors: true,
        errorDetails: true,
      },
    },
    // Enable optimization of our output files: bundle.js and vendors.js.
    // Webpack will remove packages listed in vendors entrypoint from bundle.js
    // and place them only in vendors.js.
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            // The name of the split chunk (same as entrypoint).
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
