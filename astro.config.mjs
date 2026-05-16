import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  site: 'https://covsight.github.io',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static',
  vite: {
    plugins: [yaml()],
  },
});
