import fs from 'fs';
import type { ViteDevServer } from 'vite';
import type { SitemapPluginParams } from './types.ts';
import { getRoutes } from './utils.ts';

export const sitemapPlugin = ({
	routesDir = './src/routes',
	sitemapFile = './src/sitemap.ts'
}: SitemapPluginParams = {}) => {
	function updateSitemap() {
		if (/\.ts$/i.test(sitemapFile)) {
			fs.writeFileSync(
				sitemapFile,
				`import type { RO_Sitemap } from '@binsarjr/sveltekit-sitemap';

export const sitemap = (<const>${JSON.stringify(getRoutes(routesDir), null, 3).replace(
					/\uFFFF/g,
					'\\"'
				)}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
`
			);
		} else {
			fs.writeFileSync(
				sitemapFile,
				`
/** @type {import('@binsarjr/sveltekit-sitemap').RO_Sitemap} */
export const sitemap = ${JSON.stringify(getRoutes(routesDir), null, 3).replace(/\uFFFF/g, '\\"')}
`
			);
		}
	}
	updateSitemap();

	return {
		name: 'sveltekit-sitemap',
		configureServer(server: ViteDevServer) {
			server.watcher
				.add([routesDir])
				.on('add', updateSitemap)
				.on('unlink', updateSitemap)
				.on('unlinkDir', updateSitemap);
		}
	};
};
