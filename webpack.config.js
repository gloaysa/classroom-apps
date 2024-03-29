const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

const outputDirectory = 'dist/public';

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	entry: ['babel-polyfill', './src/client/index.tsx'],
	performance: {
		assetFilter: (assetFilename) => assetFilename.endsWith('.png'),
	},
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: `js/[name].bundle.js`,
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json'],
	},
	devServer: {
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'/api/**': {
				target: 'http://localhost:8050',
				secure: false,
				changeOrigin: true,
			},
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `css/[name].min.css`,
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.DefinePlugin(envKeys),
		new CopyPlugin({ patterns: [{ from: 'assets', to: '../assets' }] }),
		new CopyPlugin({ patterns: [{ from: 'public/manifest.json', to: 'manifest.json' }] }),
	],
};
