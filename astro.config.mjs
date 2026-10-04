// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://www.coser.eu.org",
	trailingSlash: "always",
	integrations: [mdx()],
	adapter: cloudflare(),
});
