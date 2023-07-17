import type { Handle } from "@sveltejs/kit"
import type { RO_Sitemap, SitemapParams } from "./types.ts"
import { generateRobots, generateSitemap } from "./utils.ts"

export const sitemapHook =
  <S extends RO_Sitemap>(sitemap: S, params: SitemapParams<S> | undefined = {}): Handle =>
  async ({ event, resolve }) => {
    if (event.url.pathname === "/sitemap.xml") {
      // Get dynamic custom definition for app routes
      const routeDefinitions = params.getRoutes ? await params.getRoutes(event) : {};
      return new Response(generateSitemap(routeDefinitions, event.url.origin, sitemap), {
        status: 200,
        headers: {
          "Content-Type": "application/xml"
        }
      });
    }

    if (event.url.pathname === "/robots.txt") {
      // Get dynamic robots directives
      const robots = params.getRobots ? await params.getRobots(event) : true;

      // Build and return the robots.txt
      return new Response(generateRobots<S>(robots, event.url.origin), {
        headers: {
          "content-type": "text/plain",
          // Cache it for 24 hours
          "cache-control": `max-age=${60 * 60 * 24}`
        }
      });
    }

    return resolve(event);
  };