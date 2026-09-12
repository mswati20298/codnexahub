// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://codnexahub.com',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  // Site is hosted on Cloudflare Workers, not Vercel — this adapter must
  // match the actual host or `wrangler deploy` fails trying to auto-fix it.
  adapter: cloudflare({
    // No pages on this site use Astro's <Image>/astro:assets component,
    // so skip Cloudflare Images entirely rather than requiring a binding.
    imageService: 'passthrough'
  })
});