import type { RequestEvent } from "@sveltejs/kit"
import type { ReadonlyDeep, SetOptional } from "type-fest"
export type RO_Sitemap = ReadonlyDeep<Sitemap>
export type Sitemap = Record<string, boolean>
export type Str<P> = P extends string ? P : never
export type Routes<S extends RO_Sitemap> = Str<keyof S>
export type DynamicRoutes<S extends RO_Sitemap, R extends Routes<S> = Routes<S>> = R extends `/${infer B}/[${infer P}]`
  ? `/${B}/[${P}]`
  : never
export type Folders<S extends RO_Sitemap> = Str<
  {
    [K in keyof S]: S[K] extends true ? (K extends string ? (K extends "/" ? "/" : `${K}/`) : never) : never
  }[keyof S]
>


/**
 * Check if route does not have [] format then is static route
 * 
 * @example true = /blog
 * @example false = /blog/[id]
 */
export type StaticRoutes<S extends RO_Sitemap, R extends Routes<S> = Routes<S>> = Str<
  R extends `${infer Prefix}[${infer _}]${infer Suffix}` ? never : R
>

export type Priority = "1.0" | "0.9" | "0.8" | "0.7" | "0.6" | "0.5" | "0.4" | "0.3" | "0.2" | "0.1" | "0.0"

export type Frequency = "Always" | "Hourly" | "Weekly" | "Monthly" | "Yearly" | "Never"
export type RouteDefinition<S extends boolean> = SetOptional<
  {
    path: string
    lastMod?: string
    /**
     * 1. Always
     * These page types are constantly changing and will include index pages on major news publications, Google News, stock market data, and social bookmarking categories.
     * 2. Hourly
     * These pages update every hour and will also include major news publications as well as weather services and forums.
     * 3. Daily
     * Pages updated on average once per day and include things like blog posts, smaller web forum pages, message boards, and classified ads.
     * 4. Weekly
     * Updates typically occur once per week, these pages will include website directories, product pricing pages, and smaller blogs.
     * 5. Monthly
     * These are updated once per month, give or take, and include category pages, FAQs, and sometimes Help Desk articles that change slightly. Refer to the section above for guidelines on what is considered to be a change frequency trigger.
     * 6. Yearly
     * Updates  on these pages happen on an annual basis and are typically your contact page, “About” page, login pages, and registration pages.
     * 7. Never
     * As the name suggests, these pages never ever get updates. These are really old blog posts, press releases, notifications about updates that never need updating, and completely static pages.
     */
    changeFreq?: Frequency
    /**
     * 1.0-0.8
     * Homepage, product information, landing pages.
     * 0.7-0.4
     * News articles, some weather services, blog posts, pages that no site would be complete without.
     * 0.3-0.0
     * FAQs, outdated info, old press releases, completely static pages that are still relevant enough to keep from deleting entirely.
     */
    priority?: Priority
    image?: RouteDefinitionImage
  },
  S extends true ? "path" : never
>
export type RouteDefinitionImage = {
  url: string
  title?: string | null
  altText?: string | null
}
export type Event = RequestEvent<Partial<Record<string, string>>, string | null>
export type PathDirectives<S extends Sitemap> = {
  [K in Routes<S> | Folders<S> | "/$"]?: K extends DynamicRoutes<S> ? { [K in string]?: boolean } : boolean
}

export type UserAgentDirective<S extends Sitemap> = {
  userAgent?: string | string[]
  /**
   * How many seconds a crawler should wait before loading and crawling page content. Note that Googlebot does not acknowledge this command, but crawl rate can be set in Google Search Console.
   */
  crawlDelay?: number
  paths: PathDirectives<S>
}
export type RouteDefinitions<S extends RO_Sitemap> = {
  [K in Routes<S>]?: K extends StaticRoutes<S> ? RouteDefinition<true> : RouteDefinition<false>[];
  // [K in Routes<S>]?: boolean | RouteDefinition<true> | RouteDefinition<false>[]
}

export type SitemapParams<S extends RO_Sitemap> = {
  getRobots?: (event: Event) => Promise<boolean | UserAgentDirective<S> | UserAgentDirective<S>[]>
  getRoutes?: (event: Event) => Promise<RouteDefinitions<S>>
}

export type SitemapPluginParams = {
  routesDir?: string
  sitemapFile?: string
}

export type ReplaceParams<
  S extends string,
  Delimiter extends string = "/"
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? Head extends `[${infer P}]`
  ? `${string}/${ReplaceParams<Tail, Delimiter>}`
  : `${Head}/${ReplaceParams<Tail, Delimiter>}`
  : S extends Delimiter
  ? ""
  : S extends `[${infer P}]`
  ? string
  : `${S}`