var _ = require( "lodash" );
var webpackConfig = require( "@core/ui-build-scripts" ).getWebpackConfig( __dirname );
var webpack = require( 'webpack' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

var path = require( 'path' );
var argv = require( "yargs" )
.default( 'js-path', 'js/' )
.default( 'css-path', 'css/' )
.argv;

var watchMode = argv.watch || false;

webpackConfig.module = {
  loaders: [
    {
      test: /\.(js|jsx)$/,
      //exclude: /src\/components/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query: {
          presets: ['react','es2015'],
          plugins: ['syntax-dynamic-import']
      }
    },
    /*
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract( {
        fallback: "style-loader",
        use: "css-loader?-url&sourceMap!sass-loader?sourceMap=true&sourceMapContents=true&includePaths[]=" + path.resolve( __dirname, "./node_modules/compass-sass-mixins/lib" )
      })
    }
    */
    { // sass / scss loader for webpack
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary
        use: ['css-loader', 'sass-loader']
      })
    }
  ]
}

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

module.exports = webpackConfig;
