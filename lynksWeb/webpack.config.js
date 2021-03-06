var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: sourcePath,
	entry: {
		main: './index.tsx',
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'redux'
		]
	},
	output: {
		path: outPath,
		publicPath: '/',
		filename: 'bundle.js',
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		mainFields: ['main']
	},
	module: {
		loaders: [
			// .ts, .tsx
			{
				test: /\.tsx?$/,
				use: isProduction
					? 'awesome-typescript-loader?module=es6'
					: [
						'react-hot-loader',
						'awesome-typescript-loader'
					]
			},
			// css
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				})
			},
			// static assets
			{ test: /\.html$/, use: 'html-loader' },
			{ test: /\.png$/, use: 'url-loader?limit=10000' },
			{ test: /\.jpg$/, use: 'file-loader' },
		],
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.bundle.js',
			minChunks: Infinity
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new ExtractTextPlugin({
			filename: 'styles.css',
			disable: !isProduction
		}),
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	],
	devServer: {
		contentBase: sourcePath,
		hot: true,
		stats: {
			warnings: false
		},
	},
	node: {
		fs: 'empty',
		net: 'empty'
	}
};
