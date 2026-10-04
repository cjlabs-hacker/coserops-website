import type {APIRoute} from "astro";
import {site} from "../lib/site";

export const GET: APIRoute = () => new Response(`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${site}/sitemap-zh-cn.xml</loc></sitemap><sitemap><loc>${site}/sitemap-en.xml</loc></sitemap></sitemapindex>`, {headers: {"Content-Type": "application/xml"}});
