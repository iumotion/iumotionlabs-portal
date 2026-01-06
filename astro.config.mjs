// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://iumotionlabs.com',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CO'
        }
      }
    })
  ],
  build: {
    assets: 'assets'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
