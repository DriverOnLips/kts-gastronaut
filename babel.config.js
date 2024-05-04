module.exports = (api) => {
	api.cache.using(() => process.env.NODE_ENV);

	const plugins = [
		'@babel/plugin-proposal-optional-chaining',
		process.env.NODE_ENV === 'development' && 'react-refresh/babel',
		['@babel/plugin-transform-class-properties', { loose: true }],
		['@babel/plugin-transform-private-methods', { loose: true }],
		['@babel/plugin-transform-private-property-in-object', { loose: true }],
	].filter(Boolean);

	const presets = [
		'@babel/preset-env',
		'@babel/preset-react',
		'@babel/preset-typescript',
		'mobx',
	];

	return {
		presets,
		plugins,
	};
};
