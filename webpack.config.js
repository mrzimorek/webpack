var webpack = require('webpack');
var glob = require('glob');
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PurifyCSSPlugin = require('purifycss-webpack');
var isProduction = (process.env.NODE_ENV === 'production')

module.exports = {
    entry: {
    	app: [
    		"./src/main.js",
    		"./src/app.js",
    		"./src/main.sass"
    	]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
    	rules: [{
           test: /\.sass$/,
	        use: ExtractTextPlugin.extract({
	          use: ['css-loader', 'sass-loader']
	        })
        }]
    },
    plugins: [
    	new ExtractTextPlugin('[name].css'),
    	 new PurifyCSSPlugin({
      		paths: glob.sync(path.join(__dirname, '*.html')),
    	}),
    	 new webpack.LoaderOptionsPlugin({
  			minimize: isProduction,
    	}),
    
    ]
};

if (isProduction) {
	module.exports.plugins.push(
    	new webpack.optimize.UglifyJsPlugin()
	);
}