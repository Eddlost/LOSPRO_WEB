import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://lospro.github.io',
  base: '/',
  integrations: [tailwind()],
  output: 'static',
});
