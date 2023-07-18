import { sitemapHook } from './lib';
import { sitemap } from './sitemap';

export const handle = sitemapHook(sitemap, {
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
	}
});
