// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// TODO: replace with final production domain before publish.
const SITE_URL = 'https://suar.web.id';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact(), sitemap()],
  adapter: cloudflare()
});