# PROMPT-PASS2.md (paste into Antigravity ONLY after the first build report is reviewed)

```
PASS 2: add the owner's extra design work. Read owner-assets/pass2/ASSETS-PASS2.md first. All first-pass rules still apply (branch portfolio-1 only; never commit, push, deploy or publish; no secrets; no SHA-256; every claim verified; no invented content; no third-party requests; FROZEN text untouched; do not edit PORTFOLIO-SPEC.md, .agents/ or reference/; summary at the end: done, files, evidence, decisions, not done, next).

DO:
1. Copy the images listed in ASSETS-PASS2.md into the Astro assets (c15 and c16 come from owner-assets/candidates/, which is allowed for THIS block only). Optimise with sharp, width and height attributes, lazy loading below the fold, real alt text per the table.
2. Add ONE collapsed block "More design work" inside the Design section using native <details>/<summary> (zero JS, keyboard accessible, summary text visible and meaningful). Inside, groups with exact captions from the table: Logo (l01 Sportsvill24, first), Perfume Gallery product screens (p01 to p04), Icon scene (a01), Recreations (c15, c16, f01). Recreations come last and each shows its caption above the image.
3. Keep the page fast: closed <details> must not load images eagerly (loading="lazy", decoding="async"); re-measure page weight and report the before and after numbers from the build.
4. "What makes me different" (J8): add one short sentence to point 3 ("I design and build.") that links to #more-design-work: "More design work, including recreations I label as recreations." Keep the [OWNER: approve] tag on the J8 block.
5. The small tags [OWNER: original designer and link, to credit] appear under each recreation and go in OWNER-TODO.md. Never invent the original designer.
6. Footer: if any recreation is shown, the sentence "Recreations are labelled." is included (spec C7). Confirm it is present.
7. Re-run every check and the full device matrix on dist/ (axe-core included, details open and closed). Paste real output. Update README.md sections 8, 9, 12, 16 and 17 with real numbers, then re-run tools/check-readme.mjs.
STOP after building. Do not publish.
```
