// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.hypernode.com',
  integrations: [react(), sitemap(), icon({ iconDir: 'src/icons' })],
  vite: {
    plugins: [tailwindcss()]
  }
});