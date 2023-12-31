import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import { defineConfig } from 'vitest/config';
import { sitemapPlugin } from './src/lib';

export default defineConfig({
	plugins: [
		sveltekit(),
		sitemapPlugin(),
		(() => {
			const sitemapRoute = './src/sitemap.ts';
			const update = () => {
				let body = fs.readFileSync(sitemapRoute).toString();
				if (!body.includes('@binsarjr/sveltekit-sitemap')) return;
				body = body.replace('@binsarjr/sveltekit-sitemap', '$lib');
				fs.writeFileSync(sitemapRoute, body);
			};

			return {
				name: 'replace-dependencies-in-sitemap.ts',
				configureServer(server) {
					server.watcher
						.add([sitemapRoute])
						.on('add', update)
						.on('ready', update)
						.on('change', update);
				}
			};
		})()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'test/**/*.{test,spec}.{js,ts}']
	}
});
