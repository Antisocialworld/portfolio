import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://antisocialworld.vercel.app',
  compressHTML: true,
  trailingSlash: 'ignore',
  devToolbar: {
    enabled: false,
  },
});
