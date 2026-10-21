# PROMPT.md (paste this into Antigravity)

```
You are building my portfolio site. Read these in order: AGENTS.md, PORTFOLIO-SPEC.md (all parts A to J; PART J OVERRIDES earlier parts where they conflict), reference/artifact-index.html, owner-assets/ASSETS.md, owner-assets/poems/ (optional). The spec is the single source of truth. If this prompt and the spec disagree, stop and ask. Build the whole site in one run.

RULES (restated, binding):
- Confirm the folder is a git repo (git branch --show-current). If it is not, stop and tell me. Work only on branch portfolio-1 (git switch -c portfolio-1 if missing). The ONLY git writes allowed are git switch -c portfolio-1 and git switch portfolio-1. Never git init, commit, push, deploy or publish anything. Do not create .github/ or any deploy workflow. I do all repo setup, add, commit, push, merge and publishing.
- Never write, print, log or paste a real secret, key, password, token or code. Mask with ******. Never open .env. This site needs no secrets.
- Never use SHA-256, HMAC-SHA-256, HS256, MD5 or SHA-1. If you need a digest use blake2b512 via node:crypto.
- Every claim verified, else say "not verified". Paste real command output. Never write "works on all devices" or "fully accessible": report what was tested and what was not.
- Do not invent content. Missing facts become visible [OWNER: ...] placeholders and go in OWNER-TODO.md. No invented numbers, links, dates, metrics, poems, comic titles or authorship. Never write or edit my poems.
- Case-study text marked FROZEN is copied verbatim from reference/artifact-index.html. Prove it with a diff script against the BUILT html.
- Use only images in reference/assets-original/ and in owner-assets/to-add/ that are listed in owner-assets/ASSETS.md. Never use anything in owner-assets/candidates/. No stock photos, no generated images, no comic covers.
- No third-party requests at runtime (no Google Fonts, CDN, analytics, embeds). Self-host fonts from @fontsource packages (latin subset, include the OFL licence text), then remove them from dependencies.
- Stack (spec J1): Astro static build. Only astro and sharp as dependencies, exact pinned versions, package-lock committed, no UI frameworks, no hydrated components, no integrations. Disable Astro telemetry. Only ONE client script is allowed (spec J3, under 2 KB gzipped: dynamic title, aria-current, URL hash update). The page must work fully without it. Never run npm audit fix (report npm audit only).
- Colours and type are locked (spec section E). Do not change them.
- Node scripts go in files, never inline node -e. Windows paths: quote them. Never run docker compose down -v, docker volume rm, docker system prune.
- Do not edit PORTFOLIO-SPEC.md, .agents/ or reference/.
- Keep reports short, with evidence.

CONTENT FACTS TO FOLLOW EXACTLY (from the spec):
- LinkedIn: https://www.linkedin.com/in/solomonikharia (no tracking parameters; you cannot open it, report "not opened by the agent"). Never use the /in/solomon-ikharia-845121420 form.
- Sprint block: lead with c03, then c01 and c02 with the line "The device mockup and the photos in these screens are not mine. The screen designs are." (no photo-source tag; list "licence and source of the mockup template and photos not verified" in OWNER-TODO.md). Caption: "Onboarding and home screens for Sprint, a running and fitness app. Designed by me in Figma."
- Also built: APE-P-I (API) and Daily Meal (app), exactly as spec C8 (live links owner-confirmed, no tag; screenshots d01 and d02). Daily Meal caption: "Daily Meal on a phone: the filter, the list and the previous/next pages. Logo and interface designed by me. The restaurants are sample data from my API." with a small [OWNER: confirm interface design is yours too].
- Host is Vercel only (spec J25): docs/deploy-options.md has Vercel steps only (preset Astro, npm run build, output dir dist). No GitHub Pages file. Final URL unknown: canonical, og:url and JSON-LD url stay [OWNER: final URL].
- Rowta problem statement and Rowta numbers (timing ratios, concurrency tests) are supplied by me after the build: keep the placeholders and every [OWNER: confirm] tag; list them in OWNER-TODO.md.
- The alien logo was drawn in a chat from my reference and I approved it. Never call it hand-drawn by me. Footer (C7) reads exactly: "Solomon Ikharia. Designs and illustrations on this page are my own work. AntisocialWorld logo directed by me. Device mockups and photos not made by me are marked where shown." plus the no-cookies line. No tag.
- Rowta case study (C4) and logo process case study (C5) with visible placeholders. No load-test numbers. Tag agent-reported Rowta facts with [OWNER: confirm].
- ARIA and semantics per spec J23 (native HTML first; aria-label only where there is no visible text; no target=_blank). Logo files are approved and in owner-assets/to-add/ (J24).
- Titles: dynamic title format "<Section> | AntisocialWorld" and default "AntisocialWorld, Product Engineer" (spec J3, J20). Keep the real name Solomon Ikharia in hero, About, footer, JSON-LD name and description (J21). Path mapping in J19 (site/ means src/public sources and dist/ output).
- Lettering process block with the pen sketches s01 to s06 beside the finished Okada, Danfo and No Evil wordmarks (J17). Every caption exactly: "Pen sketch by me, then redrawn as vector and illustrated in Figma." Keep [OWNER: what changed between sketch and final]. Never use the full sketch sheet or its other drawings.
- New sections: What makes me different (J8), Open source (J9), About me (J10), Off the clock, exact owner text (J11), Lettering process (J17), Daily Meal screenshots (C8), Open to (J12). Draft wording (J8 points, J10 About, J4 description and keywords) stays tagged [OWNER: approve] until I reply "approved". Off the clock text is verbatim (J11). Also read spec J25.

DO:
1. Execute spec Part F (adapted by J1), Part H and Part J in order. Produce the Astro project, tools/ scripts (frozen diff, no-owner-tags, check-seo, script-size and no-extra-JS checks), docs/ui-matrix/ screenshots, docs/deploy-options.md (Vercel only, no GitHub Pages file), README.md, BUILD-NOTES.md and OWNER-TODO.md.
2. Page order per spec J7: hero, nav, work, Rowta and Also built, what makes me different, design, open source, about me with off the clock, contact.
3. SEO, Open Graph, Twitter, JSON-LD, keywords per J4. Dynamic title and zero reloads per J2 and J3. Accessibility per J5 and Part I. Navigation per J6.
4. Run the checks in F11 and the full device matrix in spec Part I against the BUILT dist/ (served with astro preview): every viewport from 280x653 to 3840x2160, every installed engine (Chromium, Firefox, WebKit), plus 200% text zoom, forced-colors, reduced-motion, print, script blocked. Run axe-core. Paste real output. Say plainly what was not tested (real devices, Android, screen readers, social previews).
5. Triple-pass audit (content vs spec, accessibility, performance). Fix real findings and list them.
6. Check against the Part G and J15 acceptance lists, tick or fail each item with evidence.

README (spec J26, written BEFORE I commit, as the last build step after all checks have run):
- Write README.md at the repo root from real files and real command output only. No invented numbers: every size, score or count is copied from a command you ran (say which). Anything not tested says "not verified".
- Do NOT write the literal text "[OWNER:" in README.md (the no-owner-tags check scans it). Point to OWNER-TODO.md instead.
- Structure, in this order: 1 Title and one-line description. 2 Live site (final URL not known yet, say "Not published yet"). 3 What this is (one-page portfolio, who it is for, what it shows). 4 Stack and why (Astro static, sharp, self-hosted fonts, one tiny script, no third-party requests). 5 Requirements (Node version from .nvmrc or engines, npm). 6 Quick start (npm ci, npm run dev, npm run build, npm run preview). 7 Commands table (every script in package.json, one line each). 8 Project structure (tree of real folders, one line each). 9 How to edit content (where text, case studies, images and alt text live; frozen text rule; how to add a poem file). 10 Design system (tokens from spec E, fonts, the one ornament). 11 Accessibility (target WCAG 2.2 AA; what was tested with real results; what was NOT tested). 12 Performance (measured page weight, request count, script size, from the build; "not verified" if not measured). 13 SEO and sharing (title map, description, OG, JSON-LD; social previews not verified). 14 Quality checks (each tools/ script and what it proves). 15 Deploy on Vercel (preset Astro, npm run build, output dir dist) and that the owner publishes. 16 Assets and licences (fonts OFL files, owner-made images, device mockup note, logo credit line as in the footer). 17 Known gaps (copy from OWNER-TODO.md headings, not the tags). 18 Credits. Keep it under 250 lines, plain language, no badges, no emoji.
- After writing it, run a script tools/check-readme.mjs that fails if README.md is missing, lacks any of the 18 headings, contains "[OWNER:", or contains a command not present in package.json scripts. Paste the output. Tell me it is ready; I commit after reading it.

STOP after building. Do not publish. Final summary format: done, files, evidence, decisions, not done, next.
```
