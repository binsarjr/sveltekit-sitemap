import { sitemapHook } from "./lib"
import { sitemap } from "./sitemap"

export const handle = sitemapHook(sitemap, {
    async getRoutes(event) {
        return {
            '/[slug]': [
                {
                    path: '/asd'
                }
            ]
        }
    },
})