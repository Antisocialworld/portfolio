# Title and one-line description
Portfolio of Solomon Ikharia (AntisocialWorld) — personal one-page portfolio site for product engineer Solomon Ikharia based in Lagos, Nigeria.

## Live site
https://antisocialworld.vercel.app/

## What this is
A single-page personal portfolio built for job applications at early-stage startups in scheduling, workforce, fintech, and B2B SaaS. It presents proven engineering case studies, app interface systems, design processes from pen sketches to SVG, and verified contact details with WAT working hours.

## Stack and why
- Astro (static output): Generates fast, zero-JS HTML by default without runtime UI frameworks.
- Sharp: High-performance local image optimization converting assets to modern WebP.
- Self-hosted fonts: Bricolage Grotesque and Instrument Sans served locally as woff2 subsets to avoid third-party requests.
- Single client script: Exactly one tiny script (under 2 KB gzipped) for dynamic section title updates, hash state, and nav highlighting.
- Zero third-party requests: No external trackers, CDNs, analytics, cookies, or external font stylesheets.

## Requirements
- Node.js: v24.16.0 (verified with node -v)
- npm: 11.13.0 (verified with npm -v)

## Quick start
- Install dependencies: npm ci
- Start local development server: npm run dev
- Build static production distribution: npm run build
- Preview static build locally: npm run preview

## Commands table
| Script | Command | Description |
|---|---|---|
| dev | npm run dev | Starts the Astro development server |
| build | npm run build | Compiles static site into dist directory |
| preview | npm run preview | Serves built dist directory locally |
| check:frozen | npm run check:frozen | Diffs built case studies against reference HTML |
| check:links | npm run check:links | Verifies all internal anchors and asset file paths |
| check:contrast | npm run check:contrast | Computes WCAG contrast ratios for brand palette pairs |
| check:seo | npm run check:seo | Validates single H1, title, description, OG, and JSON-LD |
| check:owner | npm run check:owner | Scans built output for remaining owner placeholders |
| check:scripts | npm run check:scripts | Asserts single client script under 2 KB gzipped |
| check:readme | npm run check:readme | Validates README structure, headings, and scripts |

## Project structure
- dist/: Static production distribution output built by Astro.
- docs/: Documentation, including Vercel deployment options and test matrices.
- owner-assets/: Source assets and attribution records provided by the owner.
- public/: Static files served as-is (fonts, optimized images, favicons, nav script, robots.txt).
- reference/: Source reference files and frozen HTML copy.
- src/: Astro source code containing components, data, pages, and styles.
- tools/: Offline automated validation, checking, and asset conversion scripts.

## How to edit content
- Frozen case studies: Stored in src/data/frozen.js. Copied verbatim from reference/artifact-index.html; do not reword.
- Site content and sections: Main layout lives in src/pages/index.astro with components in src/components/.
- Adding poems: Add UTF-8 text files to owner-assets/poems/ (title on line 1, poem on subsequent lines). If empty, no block renders.
- Images and alt text: Place originals in owner-assets/to-add/ and run tools/convert-all-assets.mjs to generate WebP files. Update alt text directly in src/pages/index.astro figures.

## Design system
- Paper: #F9F7EB (cream brand background)
- Ink: #1B1B18 (primary text, borders, button outlines)
- Muted: #5A584E (secondary text, captions, metadata)
- Danfo: #FFD60A (Lagos bus yellow accent)
- Line: #1B1B18 (dividers and borders)
- Soft: #ECE8D3 (card background tint)
- Link: #1F4D17 (accessible forest green hyperlinks)
- Fonts: Bricolage Grotesque (display headings) and Instrument Sans (body text).
- Ornament: Single 22px yellow danfo stripe with a 4px black center line.

## Accessibility
Targeting WCAG 2.2 AA.
- Verified: Contrast ratios computed via tools/contrast-check.mjs all pass AA (ink on paper 16.05:1, muted on paper 6.64:1, link on paper 9.16:1, ink on danfo 12.23:1, muted on soft 5.80:1).
- Verified: Axe-core audit across all states (desktop, expanded details, mobile with reveal card focused) returned 0 violations.
- Verified: Device matrix (200% zoom, forced-colors, reduced-motion, scripts blocked, touch emulation) all pass. Visible focus ring, skip link, semantic landmarks, and valid heading hierarchy.
- Not verified: Physical screen reader output on iPhone VoiceOver or TalkBack (must be verified by the owner on device). Physical touch swipe feel on hardware touchscreens.

## Performance
Measured numbers from npm run build, node tools/size-report.mjs, and tools/measure-page.mjs:
- index.html: 39.2 KB (budget: < 60 KB)
- CSS (global): 11.1 KB (budget: < 20 KB)
- Client JavaScript (nav.js): 2,896 bytes raw, 1,214 bytes gzipped (budget: < 2 KB)
- Fonts: 69.8 KB combined (2 latin subset woff2 files)
- HTML + CSS + Fonts: 120.1 KB (budget: < 200 KB)
- Total dist weight: 1,103.5 KB / 1.08 MB across 58 total files (budget: < 2 MB)
- Page length (tools/measure-page.mjs):
  - 390x844: 18,753 px (22.22 screens, reduced from 27,806 px / 32.95 screens)
  - 1280x800: 19,759 px (24.70 screens)
- Network request count: 0 third-party requests at runtime.
- Load time on 4G: not verified by agent (run Lighthouse or DevTools throttle).

## SEO and sharing
- Title default: "AntisocialWorld, Product Engineer"
- Scroll title map: "<Section> | AntisocialWorld" updating via IntersectionObserver.
- Meta description: 187 chars (170 chars once pending approvals are applied).
- Open Graph & Twitter cards: 1200x630 og.png generated on paper background.
- Structured Data: JSON-LD Person schema linking legal name Solomon Ikharia with handle AntisocialWorld.
- Social preview rendering: not verified on live platforms (owner checks after deploy).

## Quality checks
- tools/extract-frozen.mjs: Asserts verbatim identity between reference case studies and built HTML.
- tools/check-links.mjs: Asserts all internal anchor targets exist and local asset paths resolve.
- tools/check-seo.mjs: Asserts presence of single H1, title, description, OG/Twitter tags, and JSON-LD.
- tools/check-scripts.mjs: Asserts exactly 1 client script under 2 KB gzipped.
- tools/contrast-check.mjs: Computes and asserts WCAG AA compliance across palette pairs.
- tools/no-owner-tags.mjs: Scans dist and README to enforce placeholder resolution before publishing.
- tools/check-readme.mjs: Verifies README structure, headings order, and documented commands.
- tools/measure-page.mjs: Measures document height, screens, and section heights via Playwright Chromium.
- tools/test-matrix-axe.mjs: Runs axe-core audit across states and validates device matrix.

## Deploy on Vercel
The owner publishes this site on Vercel:
1. Connect the repository in the Vercel dashboard.
2. Select the Astro framework preset.
3. Build command: npm run build
4. Output directory: dist
5. Set the final live domain in astro.config.mjs and src/components/Seo.astro (configured as https://antisocialworld.vercel.app/).

## Assets and licences
- Fonts: Bricolage Grotesque and Instrument Sans are licensed under the SIL Open Font License (OFL notices in public/fonts/).
- Owner-made images: The owner made the Danfo, Okada and No Evil lettering, the Sportsvill24 logo, the screen and interface designs for Sprint, Perfume Gallery and Daily Meal, and the Rowta logo supplied by the owner. EdgeKart and the fintech wallet are recreations of existing designs (not the owner's). The icons in the icon scene are not the owner's (only the composition is).
- Sprint: the device mockup and the photos in the screens are not made by the owner and their source is not recorded; the screen designs are the owner's.
- Logo credit: AntisocialWorld alien mark vector directed by the owner.
- If you own a design, photo or icon shown here and want it removed or credited, email aviewfromthe6ix@gmail.com.

## Known gaps
All pending owner confirmations and unverified items are tracked in OWNER-TODO.md:
- Content approvals needed
- Placeholders to fill
- Items not verified by the agent
- Owner real-device checklist

## Credits
- Designed, directed, and written by Solomon Ikharia (AntisocialWorld).
- Built with Astro and Sharp.
