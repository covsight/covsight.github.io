import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  // dvkit.org owns all documentation, and an <org>.github.io repo lands at
  // dvkit.org/<org>/ -- see ~/Documents/dvkit-docs-publishing-design.md 5.9.
  // `base` matters as much as `site`: without it Astro emits root-absolute
  // URLs that 404 under a subpath, which is finding F8 in that design ("Sphinx
  // output is subpath-portable; a site build is not"). Anything hand-written as
  // href="/..." is NOT rewritten by `base` and has to use BASE_URL explicitly.
  site: 'https://dvkit.org',
  base: '/covsight',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static',
  vite: {
    plugins: [yaml()],
  },
});
