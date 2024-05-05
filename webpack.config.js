/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getSettingsForStyles = (withModules = false) => {
	// Заменяем в нашей функции style-loader на mini-css-extract-plugin
	return [
		isProd
			? {
					loader: MiniCssExtractPlugin.loader,
					options: {
						defaultExport: true,
					},
				}
			: 'style-loader',
		!withModules
			? 'css-loader'
			: {
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: !isProd
								? '[path][name]__[local]'
								: '[hash:base64]',
						},
					},
				},
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					plugins: ['autoprefixer'],
				},
			},
		},
		'sass-loader',
	];
};

module.exports = {
	entry: path.join(srcPath, 'index.tsx'),
	target: !isProd ? 'web' : 'browserslist',
	devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
	output: {
		path: buildPath,
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(srcPath, 'index.html'),
		}),
		!isProd && new ReactRefreshWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name]-[hash].css',
		}),
		new TsCheckerPlugin(),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.module\.s?css$/,
				use: getSettingsForStyles(true),
			},
			{
				test: /\.s?css$/,
				exclude: /\.module\.s?css$/,
				use: getSettingsForStyles(),
			},
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.(png|svg|jpg)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
			},
			{
				test: /\.(ico)$/,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		// теперь при импорте эти расширения файлов можно не указывать
		extensions: ['.tsx', '.jsx', '.js', '.ts'],
		alias: {
			assets: path.join(srcPath, 'assets'),
			components: path.join(srcPath, 'components'),
			hooks: path.join(srcPath, 'hooks'),
			pages: path.join(srcPath, 'pages'),
			stores: path.join(srcPath, 'stores'),
			styles: path.join(srcPath, 'styles'),
			types: path.join(srcPath, 'types'),
			utils: path.join(srcPath, 'utils'),
		},
	},
	devServer: {
		host: '127.0.0.1', // хост нашего сервера
		port: 8000, // порт, по которому к нему можно обращаться
		hot: true,
		client: { overlay: true },
		historyApiFallback: true,
	},
	performance: {
		maxAssetSize: 500 * 1024, // Увеличьте этот размер по вашему усмотрению
		maxEntrypointSize: 500 * 1024, // Увеличьте этот размер по вашему усмотрению
	},
};
