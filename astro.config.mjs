import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://eddlost.github.io',
  base: '/LOSPRO_WEB',
  trailingSlash: 'ignore',
  integrations: [tailwind()],
  output: 'static',
});
