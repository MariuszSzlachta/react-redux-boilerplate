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
  // Webpack mode is set in npm build script (trough --mode=development/production).
  // Production mode sets the process.env.NODE_ENV variable as 'production'.
  // Development mode sets the process.env.NODE_ENV variable as 'development'.
  const { mode } = argv;

  return ({
    // Root files of Your application; files from which the Webpack will start reading Your code.
    // Thanks to babel-polyfill You can use new built-ins like Promise, Array.from,
    // Object.assign or Array.prototype.includes.
    entry: {
      bundle: ['babel-polyfill', './src/index.jsx'],
      // All vendors (like React, Redux, lodash) should go to second bundle file
      // because we update it less ofter. User will need to download smaller bundle.js
      // while vendor.js will be served from cache becouse nothing changes in that.
      vendors: VENDOR_LIBS,
    },
    output: {
      // Reference to directory (absolute path) where we want to save bundled files.
      // The path.resolve() resolves a sequence path segments into an absolute path.
      // __dirname is Node.js variable which store current absolute path.
      path: path.resolve(__dirname, 'dist'),
      // Name of output bundled file.
      filename: 'assets/js/[name].[hash:8].js',
      chunkFilename: 'assets/js/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limitin bytes (10 kilobytes in our case) as data URLs to avoid requests.
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              exclude: /favicon\.png/,
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'assets/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'assets/media/sprite.[hash:8].svg',
              },
            },
            // Process JavaScript files with Babel.
            // babel-loader tells Babel how to work with Webpack;
            // babel-core knows how to parse code and generate output;
            // babel-preset-env ruleset of how ES2015+ syntax looks like and how to turn it into ES5 code;
            {
              test: /\.js|jsx$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  // This is a feature of `babel-loader` for Webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: mode === 'production',
                  // If this option is true, Babel will not include needless whitespace characters and line terminators.
                  compact: mode === 'production',
                },
              },
            },
            // Process CSS files with listed loaders.
            // style-loader turns CSS into JS modules and adds them to the HTML document by injecting <style> tags.
            // css-loader knows how to deal with CSS files, resolves paths in CSS and adds assets as dependencies.
            // postcss-loader applies autoprefixer to Your CSS.
            // In production, we use a plugin to extract that CSS to a file, but
            // in development "style" loader enables hot editing of CSS.
            {
              test: /\.s|css$/,
              exclude: /node_modules/,
              use: [
                // If We are in production configuration MiniCssExtractPlugin grabs
                // the result CSS and puts it into separate file in our build process
                // instead of injecting <style> tags.
                // This won't work without `new MiniCssExtractPlugin()` in `plugins`.
                // mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                mode === 'production' ?
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    // MiniCssExtractPlugin expects the build output to be flat (all files in one directory).
                    // However, our output is structured with assets + /js/css/media  folders.
                    // To have this structure working with relative paths, we have to use custom options.
                    // Webpack will add to image name `assets/media` so we have to add `../..`
                    // to get `../../assets/media`.
                      publicPath: '../../',
                    },
                  } :
                  'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    // This option configures how many loaders before css-loader should be applied to @imported resources.
                    // 1 => postcss-loader; 2 => postcss-loader, sass-loader
                    importLoaders: 2,
                    minimize: mode === 'production',
                    sourceMap: true,
                  },
                },
                // PostCSS configuration is located in postcss.config.js file.
                'postcss-loader',
                // This loader uses node-sass to compile SASS code.
                'sass-loader',
              ],
            },
            // When you import an asset, you get its (virtual) filename.
            // In production, they would get copied to the build folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
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
      // Generates an `index.html` file with the <script> injected.
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
          removeComments: mode === 'production',
          collapseWhitespace: mode === 'production',
          removeRedundantAttributes: mode === 'production',
          useShortDoctype: mode === 'production',
          removeEmptyAttributes: mode === 'production',
          removeStyleLinkTypeAttributes: mode === 'production',
          keepClosingSlash: mode === 'production',
          minifyJS: mode === 'production',
          minifyCSS: mode === 'production',
          minifyURLs: mode === 'production',
        },
      }),
      // This won't work without `MiniCssExtractPlugin.loader` in `loaders`.
      new MiniCssExtractPlugin({
        filename: 'assets/css/styles.[contenthash:8].css',
      }),
      // Generate Service Worker (service-worker.js by default)
      new GenerateSW({
        // Ability to publish a new service worker and control a web page as soon as possible.
        clientsClaim: true,
        skipWaiting: true,
        // Name of chache.
        cacheId: 'React Redux Boilerplate',
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
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
      // Copy manifest.json and icons for iOS and Android.
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
      modules: ['./src', './node_modules'],
    },
    // This will generate fast sourcemaps in development mode
    // and slow (but with good results) in production mode.
    // You can exclude the *.map files from the build during deployment.
    devtool: mode === 'production' ? 'source-map' : 'cheap-module-source-map',
    // Webpack Dev Server configuration.
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      // index.html page will be served on every URL.
      historyApiFallback: true,
      // Enable gzip compression of generated files.
      compress: true,
      // Enable hot reloading server.
      hot: true,
      // Enable HTTPS.
      https: true,
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
