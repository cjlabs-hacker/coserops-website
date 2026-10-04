# CoserOps Website

Official bilingual information site for CoserOps (Coser Operations Center), built with Astro and deployed through Cloudflare Workers.

## Domain strategy

The only public official website and canonical origin is https://www.coser.eu.org. Site URLs, canonical URLs, sitemaps, and robots.txt use this origin.

Separate subdomains can isolate the product app, admin/control interface, API, assets, and preview environments. Their addresses and availability are not yet confirmed. Subdomains are not automatically public or indexable: alternate subdomains must use `noindex` unless intentionally public, with access controls for private apps and previews. Only indexable canonical pages on `www.coser.eu.org` belong in the website sitemaps.

The root domain `coser.eu.org` is out of scope for now. Do not configure or process it; no DNS, redirect, canonical, sitemap, or SEO assumption is made for it, and no root-domain redirect is planned.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
npm run build
```

The site is available locally at `http://localhost:4321`.

## Published routes

- `/` redirects to `/zh-cn/` with HTTP 302; visitors can switch languages in the header
- `/zh-cn/` and `/en/` localized home pages
- Localized `product`, `solutions`, `channels`, `resources`, `about`, `contact`, `privacy`, and `terms` routes
- Scenario detail routes under `solutions/` and channel detail routes under `channels/`
- `/sitemap.xml`, `/sitemap-zh-cn.xml`, `/sitemap-en.xml`, and `/robots.txt`

The contact form is deliberately unavailable until a verified delivery backend, owner, and privacy process are configured. Product and channel pages use published planning status and do not claim unverified availability.

### Localization

`src/lib/i18n.ts` defines the supported locale registry, HTML/Open Graph language tags,
self-names, and the typed `t(locale, key)` helper. Shared UI and page-body copy live
in `src/lib/translations/en.ts` and `zh-cn.ts`, with `nav`, `status`, `footer`,
`layout`, `navigation`, and `content` namespaces. English defines the key schema;
every locale must supply every key. Missing translations throw during the build,
without falling back to another language.

To add a language, register its metadata and complete translation resource in
`i18n.ts`, then supply its page metadata and published routes in `src/lib/site.ts`.
Homepage routes, language-switch links, and SEO language tags use the registry.
The root entry redirects to the Chinese homepage without browser-language detection. Homepage `x-default` points to `/zh-cn/`; other indexable pages retain their English equivalent as `x-default`.
