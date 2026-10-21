# BUILD-NOTES.md

## Environment & Versions

- **Node.js**: v24.16.0
- **npm**: 11.13.0
- **Astro**: 7.4.1 (pinned exact version)
- **sharp**: 0.35.5 (pinned exact version)
- **Git Branch**: `portfolio-1`

---

## Architectural Decisions

1. **Static Build (Spec J1)**:
   - Configured `output: 'static'` in `astro.config.mjs` with `compressHTML: true` and `trailingSlash: 'ignore'`.
   - Astro anonymous telemetry was explicitly disabled (`npx astro telemetry disable`).
   - Allowed dependencies are strictly `astro` and `sharp` pinned with exact versions. No UI frameworks, no client hydration components (`client:*`), and zero runtime third-party requests.

2. **Single Client Script (Spec J3)**:
   - Exactly one client script `dist/nav.js` is emitted.
   - Raw size: 2,840 bytes; gzipped size: 1,192 bytes (under 2 KB budget).
   - Handles dynamic section title updates, `aria-current="location"`, and `history.replaceState` hash updates.
   - Degrades gracefully in browsers without `IntersectionObserver`.

3. **Performance & Assets (Spec B8, D6, Pass 2)**:
   - All raster assets converted to `webp` format with quality 80:
     - Phone screens capped at 600px width.
     - Illustrations, sketches, and compositions capped at 800px-1000px width.
     - All `<img>` tags specify explicit `width` and `height` attributes to prevent layout shift.
     - `loading="lazy"` and `decoding="async"` applied to all below-the-fold assets.
     - Eager loading with `fetchpriority="high"` reserved exclusively for the hero danfo wordmark.
   - Fonts: Self-hosted latin subsets of Bricolage Grotesque and Instrument Sans in `dist/fonts/` with `font-display: swap`. OFL license notices included.

4. **Measured Numbers (from build)**:
   - `index.html`: 37.8 KB (budget: < 60 KB)
   - CSS: 8.8 KB (budget: < 20 KB)
   - Fonts: 69.8 KB combined (Bricolage: 40.4 KB, Instrument Sans: 29.4 KB)
   - HTML + CSS + Fonts: 116.4 KB (budget: < 200 KB)
   - `nav.js`: 1,192 bytes gzipped (budget: < 2 KB)
   - Total `dist/` directory size across all 59 files: 1,122.8 KB (1.10 MB, budget: < 2 MB)

5. **Accessibility & Contrast (WCAG 2.2 AA)**:
   - Relative contrast computed via `tools/contrast-check.mjs`:
     - ink `#1B1B18` on paper `#F9F7EB`: **16.05:1** (AA)
     - muted `#5A584E` on paper `#F9F7EB`: **6.64:1** (AA)
     - link `#1F4D17` on paper `#F9F7EB`: **9.16:1** (AA)
     - ink `#1B1B18` on danfo `#FFD60A`: **12.23:1** (AA)
     - muted `#5A584E` on soft `#ECE8D3`: **5.80:1** (AA)
   - Touch targets min 44x44px. Visible focus ring (3px solid #1B1B18, offset 3px).
   - High contrast (`forced-colors: active`) and `prefers-reduced-motion` respected.
   - Screen reader note: Sighted visitors see document title changes on scroll; screen readers may not announce title changes without aria-live, which is intentional to avoid speech interruptions.

6. **Deviations / Clarifications**:
   - Sprint block (D1): Per owner decision, images c01, c02, c03 are retained. The previous `[OWNER: photo source]` placeholder was replaced with the explicit disclaimer caption requested: `"The device mockup and the photos in these screens are not mine. The screen designs are."`
   - Stale root files: Removed from repo by owner to `portfolio-stale/`. Active assets live exclusively in `public/` and `src/`.
