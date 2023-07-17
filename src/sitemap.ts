import type { RO_Sitemap } from '$lib';

export const sitemap = (<const>{
   "/": true,
   "/[slug]": true,
   "/[slug]/claim": true,
   "/[slug]/order": false,
   "/coming-soon": false,
   "/order/[order_id]": false,
   "/order": true,
   "/privacy-policy": false
}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
