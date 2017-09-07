var _ = require( "lodash" );
var webpackConfig = require( "@core/ui-build-scripts" ).getWebpackConfig( __dirname );
var webpack = require( 'webpack' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var path = require( 'path' );
var argv = require( "yargs" )
.default( 'js-path', 'js/' )
.default( 'images-path', 'images/' )
.default( 'css-path', 'css/' )
.argv;

//var watchMode = argv.watch || false;
webpackConfig.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      //exclude: /src\/components/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
          presets: ['react','es2015'],
          plugins: ['syntax-dynamic-import']
      }
    }
    /*
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract( {
        fallback: "style-loader",
        use: "css-loader?-url&sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&includePaths[]=" + path.resolve( __dirname, "./node_modules/compass-sass-mixins/lib" )
      })
    })
    */
    /*
    { // sass / scss loader for webpack
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary
        use: ['css-loader', 'sass-loader']
      })
    }*/
  );

webpackConfig.resolve.modules.push(
    path.resolve(__dirname + '/node_modules/react/node_modules'),
    path.resolve(__dirname + '/node_modules/react'),
    path.resolve(__dirname + '/node_modules/react-dom/node_modules'),
    path.resolve(__dirname + '/node_modules/react-dom'),
    path.resolve(__dirname + '/node_modules/react-router/node_modules'),
    path.resolve(__dirname + '/node_modules/react-router/'),
    path.resolve(__dirname + '/node_modules/react-router/node_modules/path-to-regexp/node_modules'),
    path.resolve(__dirname + '/node_modules/react-router/node_modules/path-to-regexp'),
    path.resolve(__dirname + '/node_modules/react-router/node_modules/history/node_modules'),
    path.resolve(__dirname + '/node_modules/react-router/node_modules/history'),
    path.resolve(__dirname + '/node_modules/react-router/node_modules/value-equal/node_modules'),
    path.resolve(__dirname + '/node_modules/react-router/node_modules/value-equal'),
    path.resolve(__dirname + '/node_modules/axios'),
    path.resolve(__dirname + '/node_modules/axios/node_modules'),
    path.resolve(__dirname + '/node_modules/redux'),
    path.resolve(__dirname + '/node_modules/redux/node_modules')
);

webpackConfig.plugins.push(
  new BundleAnalyzerPlugin({
  // Can be `server`, `static` or `disabled`.
  // In `server` mode analyzer will start HTTP server to show bundle report.
  // In `static` mode single HTML file with bundle report will be generated.
  // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
  analyzerMode: 'static',
  //analyzerMode: 'server',
  // Host that will be used in `server` mode to start HTTP server.
  //analyzerHost: '127.0.0.1',
  // Port that will be used in `server` mode to start HTTP server.
  //analyzerPort: 8888,
  // Path to bundle report file that will be generated in `static` mode.
  // Relative to bundles output directory.
  reportFilename: 'report.html',
  // Module sizes to show in report by default.
  // Should be one of `stat`, `parsed` or `gzip`.
  // See "Definitions" section for more information.
  defaultSizes: 'parsed',
  // Automatically open report in default browser
  openAnalyzer: false,
  //openAnalyzer: true,
  // If `true`, Webpack Stats JSON file will be generated in bundles output directory
  generateStatsFile: false,
  // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
  // Relative to bundles output directory.
  statsFilename: 'stats.json',
  // Options for `stats.toJson()` method.
  // For example you can exclude sources of your modules from stats file with `source: false` option.
  // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
  statsOptions: null,
  // Log level. Can be 'info', 'warn', 'error' or 'silent'.
  logLevel: 'info'
})
);

module.exports = webpackConfig;
