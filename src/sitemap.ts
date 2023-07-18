import type { RO_Sitemap } from '$lib';

export const sitemap = (<const>{
	'/': true,
	'/[slug]': false,
	'/[slug]/claim': false,
	'/[slug]/order': false,
	'/blogs': true,
	'/coming-soon': true,
	'/order/[order_id]': false,
	'/order': true,
	'/privacy-policy': true
}) satisfies RO_Sitemap;

export type Sitemap = typeof sitemap;
