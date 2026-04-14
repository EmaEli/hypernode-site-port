// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hypernode.com',
  integrations: [react(), mdx(), sitemap(), icon({ iconDir: 'src/icons' })],
  vite: {
    plugins: [tailwindcss()]
  }
});