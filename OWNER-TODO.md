# OWNER-TODO.md

Tasks, approvals, and placeholders to be reviewed and completed by the owner before publishing.
Do not publish while any `[OWNER: ...]` tags remain. The automated check `npm run check:owner` will fail until all are filled.

---

## 1. Content Approvals Needed (`[OWNER: approve]`)

- [ ] **SEO Description (spec J4)**:
  `"Product engineer in Lagos building web apps with secure sign-in, payments and background jobs. I check AI-written code before it ships. Case studies, designs and contact."`
  *File*: `src/components/Seo.astro`
- [ ] **SEO Keywords (spec J4)**:
  `"AntisocialWorld, Solomon Ikharia, product engineer, Lagos, Nigeria, authentication, payments, background jobs, Next.js, TypeScript, PostgreSQL, UI/UX design, logo design, AI-assisted development"`
  *File*: `src/components/Seo.astro`
- [ ] **What Makes Me Different points (spec J8)**:
  Review and approve the 5 points in `src/pages/index.astro`.

---

## 2. Placeholders to Fill (`[OWNER: ...]`)

- [ ] **Final URL**:
  Replace `[OWNER: final URL]` with your live URL in `astro.config.mjs` and `src/components/Seo.astro`.
- [ ] **Rowta Agent-Reported Confirmations (spec C4)**:
  - Confirm 18 rate limits.
  - Confirm single-page sign-in component kit fact.
  - Add repository file links for test suite, rate limits, timing (docs/gates/phase-2.md), and concurrency evidence.
  - Confirm concurrency test numbers (9 tests &times; 10 rounds).
- [ ] **Rowta Next Milestones (spec C4)**:
  Next three milestones with dates, or "none dated".
- [ ] **Rowta Repository Visibility (spec C4)**:
  Confirm if `https://github.com/Antisocialworld/Rowta` is public, or change to "Repo link coming".
- [ ] **Rowta Paper Sketch (spec C5)**:
  Add photo of the hand-drawn paper sketch to `public/img/logo-sketch.webp`, or keep placeholder.
- [ ] **Lettering Process (spec J17)**:
  Add a sentence describing what changed between the initial pen sketches and the final vectors.
- [ ] **Sprint Process (spec D1)**:
  Add a brief sentence on who Sprint was for, what you tried, and what you changed.
- [ ] **Perfume Gallery Process (spec D3)**:
  Add a brief sentence on who it was for, what you tried, and what you changed.
- [ ] **Recreations Attribution (Pass 2)**:
  Add original designer names and portfolio/Figma links for EdgeKart (c15, c16) and Fintech wallet (f01).

---

## 3. Items Not Verified by the Agent

- **Licence and source of mockup template and photos**:
  Mockup template and runner photos in Sprint screens `c01` and `c02` (owner stated disclaimer added to caption and footer; licence not verified by agent).
- **LinkedIn Link**:
  LinkedIn blocks automated HTTP/bot checks; not opened by agent.
- **Social Preview Rendering**:
  OG and Twitter card previews must be verified on live social platform debuggers after deploy.
- **Real Screen Reader VoiceOver**:
  Must be tested on real iPhone VoiceOver by owner.
- **Real Android Device**:
  Tested via emulation; physical Android device testing not verified by agent.

---

## 4. Owner Real-Device Checklist (Before Final Launch)

After deploying to Vercel preview:
1. iPhone Safari (portrait): No horizontal scroll, danfo hero loads crisp, buttons tap cleanly.
2. iPhone Safari (landscape): Sticky nav behavior, clean reading experience.
3. iPhone Settings > Display & Brightness > Text Size: Zoom to larger text, verify no text overlaps or clipping.
4. Laptop browser (Chrome / Edge / Firefox): Check desktop two-column layouts and sticky navigation.
5. Email link: Tapping email opens the device's default mail client with `aviewfromthe6ix@gmail.com`.

---

## 5. Deployment Steps (Vercel)

1. Push your code to your remote GitHub repository (`main` branch).
2. Connect the repo on [Vercel](https://vercel.com).
3. Select framework preset **Astro** (auto-detected).
4. Verify build command is `npm run build` and output directory is `dist`.
5. Deploy.
