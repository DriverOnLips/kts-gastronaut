import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (
	paths: Record<string, string[]>,
): Record<string, string> => {
	const webpackConfigAliases: Record<string, string> = {};

	Object.entries(paths).forEach(([alias, paths]) => {
		const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

		webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
	});

	return webpackConfigAliases;
};

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	// base: '/kts-gastronaut',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
			manifest: {
				name: 'Food Client',
				short_name: 'FC',
				description: 'Food Client PWA',
				icons: [
					{
						src: 'https://driveronlips.github.io/kts-gastronaut/logo512.png', // Замените на путь к вашему значку
						// src: '/assets/logo512.png', // Замените на путь к вашему значку
						sizes: '512x512', // Указываем размеры значка
						type: 'image/png', // Тип файла
					},
					{
						src: 'https://driveronlips.github.io/kts-gastronaut/logo512.png',
						// src: '/assets/logo512.png', // Замените на путь к вашему значку
						sizes: '512x512',
						type: 'any',
					},
					{
						src: 'https://driveronlips.github.io/kts-gastronaut/logo512.png',
						// src: '/assets/logo512.png', // Замените на путь к вашему значку
						sizes: '512x512',
						type: 'maskable',
					},
				],
				theme_color: '#ffffff',
				background_color: '#000000',
				// display: 'standalone',
				// scope: '/',
				// start_url: '/',
			},
		}),
	],
	server: {
		port: 8000,
	},
	resolve: {
		alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
	},
});
