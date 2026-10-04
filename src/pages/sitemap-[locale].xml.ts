import type { APIRoute } from "astro";
import { isIndexable, isLocale, locales, pathFor, publishedRoutes, site } from "../lib/site";
export function getStaticPaths() {
    return locales.map(locale => ({ params: { locale } }));
}
export const GET: APIRoute = ({ params }) => {
    if (!isLocale(params.locale)) {
        return new Response(null, { status: 404 });
    }
    const locale = params.locale;
    const urls = publishedRoutes[locale].filter(isIndexable).map(slug => site + pathFor(locale, slug));
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${url}</loc></url>`).join("")}</urlset>`,
        { headers: { "Content-Type": "application/xml; charset=utf-8" } }
    );
};
