import { dev } from '$app/environment';
import { sitemapHook } from './lib';
import { sitemap } from './sitemap';

export const handle = sitemapHook(sitemap, {
	devMode: dev,
	getRoutes: async (event) => {
		return {
			'/coming-soon': false,
			'/order': false,
			'/[slug]': [
				{
					path: '/slugify'
				}
			],
			'/order/[order_id]': [
				{
					path: '/order/BK000000',
					priority: '0.2'
				}
			]
		};
	},
	getRobots: async () => {
		return {
			userAgent: ['*'],
			paths: {
				'/$': true,
				'/order': false,
				'/coming-soon': false
			}
		};
	}
});
