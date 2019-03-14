const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';
const postcssNesting = require("postcss-nesting");

module.exports = {
	devServer: {
		historyApiFallback: true,
	},

	mode: isProduction ? 'production' : 'development',
	devtool: isProduction ? false : 'cheap-module-eval-source-map',
	entry  : './app.js',

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	context: path.resolve(__dirname, '../app'),

	output: {
		filename: isProduction ? '[name]-[chunkhash].bundle.js' : '[name].bundle.js',
		path      : path.join(__dirname, '..', 'dist'),
		pathinfo  : !isProduction,
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				},
			},

			{
				test: /\.css$/,

				use: isProduction
					? [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',

							options: {
								importLoaders: 1,
								modules: 'global',
								localIdentName: "[local]__[hash:base64:5]"
							}
						},

						{ loader: 'postcss-loader' }
					]
					
					: [
						{ loader: 'style-loader' },

						{
							loader: 'css-loader',

							options: {
								sourceMap: true,
								importLoaders: 1,
								modules: 'global',
								localIdentName: "[local]__[hash:base64:5]"
							}
						},

						{ loader: 'postcss-loader' }
					],

					include: path.resolve(__dirname, '../app')
			},

			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
				],
			},
		]
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			}),

			// new OptimizeCSSAssetsPlugin({})
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css',
			chunkFilename: '[name].[contenthash:8].chunk.css',
		}),

		new HtmlWebpackPlugin(
			isProduction
				? {
					template: '../app/index.html',
					minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
					},
					inject: true,
				}

				: { template: '../app/index.html' }
		),
	],

	resolve: {
		extensions: ['.json', '.js'],

		modules: [
			path.resolve(__dirname, '..', 'app'),
			path.resolve(__dirname, '..', 'node_modules'),
		],
	},

	performance: {
		hints: false,
	},

	
}