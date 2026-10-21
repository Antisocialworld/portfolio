# Deploy Options (Vercel)

This site is built as a static Astro project. The output directory is `dist/`.

## Vercel Deployment (Owner Publishes)

1. Import the repository into your Vercel account via the Vercel Dashboard or Vercel CLI.
2. Vercel automatically detects Astro. Confirm the following build settings:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`
3. Environment variables: None required. This site uses zero secrets, tokens, or backend database URLs.
4. Custom Domain / Final URL:
   - Once assigned by Vercel (or on your own custom domain), update the `site` configuration in `astro.config.mjs` and replace `[OWNER: final URL]` in `src/components/Seo.astro`.
   - Run `npm run build` to regenerate the canonical, Open Graph, Twitter, and JSON-LD structured data with the final live URL.
