# PORTFOLIO-SPEC.md (PRD + AGENT RULES + SKILL, one file)

Owner: Ikharia Solomon ("AntisocialWorld"), Lagos, UTC+01:00 (WAT).
Version 1, 20 Oct 2026. This file is the single source of truth. If the prompt and this file disagree, stop and ask.

---------------------------------------------------------------------
## PART A. AGENT RULES (hard, restate in every report)
---------------------------------------------------------------------
R1  Never commit, push, deploy or publish (git, GitHub Pages, Vercel, anything). The ONLY git writes allowed: `git switch -c portfolio-1` and `git switch portfolio-1`. Always work on branch `portfolio-1`, never main/master. The owner does add, commit, push, merge.
R2  Never write, print, log or paste a real secret, key, password, token, code or database URL. Mask with ******. Never open `.env`. This site needs no secrets at all; if you think it does, stop.
R3  Never use SHA-256, HMAC-SHA-256, HS256, MD5 or SHA-1 in anything you write. (Not needed here. Use blake2b512 if you ever need a digest, e.g. asset checksums via node:crypto.)
R4  Every claim verified, else say "not verified". Report real command output, never paraphrase a pass.
R5  Do not invent content. Every sentence of copy comes from section C (Content) or from the owner. Missing facts become visible `[OWNER: ...]` placeholders, listed in OWNER-TODO.md. Never invent numbers, links, dates, employers, awards, testimonials, metrics, or authorship.
R6  Case-study text marked FROZEN is copied verbatim from `reference/artifact-index.html`. Do not "improve", shorten or reword it.
R7  Only use images the owner has placed in `site/img/` via `owner-assets/to-add/` (see section D). Never use stock photos or generate images. Never use anything from `owner-assets/candidates/` unless it was moved to `owner-assets/to-add/` by the owner.
R8  No third-party requests at runtime: no Google Fonts, no CDN scripts, no analytics, no trackers, no cookies, no embeds. Fonts are self-hosted.
R9  (Superseded by PART J1.) Client JavaScript: only the single tiny script allowed by J3; no hydrated components, no UI frameworks.
R10 Node scripts go in files (never inline `node -e`). Use node crypto, not Get-FileHash. No case-only renames. Windows paths: owner runs Windows; quote paths.
R11 Never run `npm audit fix`, `docker compose down -v`, `docker volume rm`, `docker system prune`.
R12 Do not edit `PORTFOLIO-SPEC.md`, `.agents/`, or `reference/`. Propose spec changes in the report.
R13 Colours and type are locked by section E. Do not change them.
R14 Summary after EVERY task: done, files, evidence, decisions, not done, next.
R15 Owner is a non-expert reviewer who checks everything. Keep reports short, with evidence, no padding.

---------------------------------------------------------------------
## PART B. PRD
---------------------------------------------------------------------
B1  Goal: one-page personal portfolio for job applications. Graduation task Part 1.6 checklist (verbatim): one-page site on own domain or free subdomain; positioning statement at the top; 3 case studies (problem, role, what built, key decisions, result, links); contact link and working hours in WAT; loads fast and works on a phone. Part 2.5 also asks for a case study per mobile app (problem, constraints, architecture, three hardest decisions, results with load test numbers, what next).
B2  Audience: hiring managers and founders at early-stage startups (scheduling, workforce, B2B SaaS, fintech). They give it 30 seconds on a phone.
B3  Positioning (FROZEN, top of page): "I am a product engineer who builds web apps with secure sign-in, payments and background jobs, and checks AI-written code before it ships, for early-stage startups."
B4  Output: static site in `site/`: `index.html`, `styles.css`, `img/`, `fonts/`, `favicon.svg`, `robots.txt`, `404.html`. Hosting target: GitHub Pages (owner publishes). Repo suggestion for the owner: `Antisocialworld.github.io`. Use RELATIVE paths only so it works at a root or a project path.
B5  One page. Anchor navigation only. No router, no multiple HTML pages except `404.html`.
B6  Page order (top to bottom):
    1. Danfo stripe, hero (name line, positioning, working hours, Email / GitHub / LinkedIn buttons, danfo wordmark image)
    2. "Three things I built": 3 FROZEN engineering case studies (job queue, payments, sign-in)
    3. "In progress: Rowta": the Rowta case study (section C4), honest status, then "Also built: Daily Meal" (C8)
    4. "Design process": Rowta logo from paper to SVG (section C5) [needs owner assets]
    5. "App screen design": Sprint block (D1) and Perfume Gallery states grid (D3, D4), owner-approved only
    6. "Drawing and clothing design": gallery (existing 5 images, plus the illustration c14 if approved)
    7. "Get in touch": hours, overlap, buttons
    8. Footer
B7  Small in-page jump links under the hero (Work, Rowta, Design, Contact) as plain anchors. Keep the existing skip link.
B8  Performance budget (targets, report measured numbers, mark "not verified" if not measured): HTML under 60 KB, CSS under 20 KB, zero JS, HTML+CSS+fonts under 200 KB (max 4 font files, latin subset only, only the weights used), each phone-screen image webp at max 600 px wide and under 60 KB, other images under 120 KB, total page weight under 2 MB on first scroll-through, each image `webp`, with width/height set, `loading="lazy"` below the fold, first image (danfo) eager with fetchpriority high, fonts `font-display: swap`, preload only the one display font file.
B9  Accessibility: WCAG 2.2 AA target. Visible focus, 44px touch targets, skip link, one h1, logical heading order, every image has meaningful alt (decorative = alt=""), no information by colour alone, `prefers-reduced-motion` respected, no motion beyond hover colour change. Language `lang="en"`. Verified contrast (owner-checked): ink #1B1B18 on paper #F9F7EB 16.05:1; muted #5A584E on paper 6.64:1; link #1F4D17 on paper 9.16:1; ink on danfo #FFD60A 12.23:1; muted on soft #ECE8D3 5.80:1.
B10 SEO and sharing: title "Solomon Ikharia, Product Engineer"; meta description (one sentence, from B3); canonical placeholder `[OWNER: final URL]`; Open Graph and Twitter tags using `img/og.png` 1200x630 (build it from the danfo wordmark on paper colour; if you cannot, leave a placeholder and say so); JSON-LD `Person` with name, jobTitle, url placeholder, sameAs (GitHub, LinkedIn). No phone number, no home address anywhere.
B11 Privacy: no cookies, no analytics. Add one line in the footer: "This site sets no cookies and loads nothing from other sites."
B12 Dark mode: NOT in scope (the cream paper is the brand). Set `color-scheme: light`.
B13 Print: simple print stylesheet (hide buttons, black on white, show URLs after links).
B14 Out of scope: blog, CMS, contact form, newsletter, chat widget, testimonials, Matinee case study (not built), any app screenshots not owned by the owner.

---------------------------------------------------------------------
## PART C. CONTENT
---------------------------------------------------------------------
C1  Contact (FROZEN): email aviewfromthe6ix@gmail.com. GitHub https://github.com/Antisocialworld . LinkedIn https://www.linkedin.com/in/solomonikharia (the owner supplied this share link on 21 Oct 2026; strip the tracking parameters). LinkedIn blocks automated checks, so the agent cannot open it: say "not opened by the agent". Do NOT use the older /in/solomon-ikharia-845121420 form. Working hours: 11:00 to 19:00 WAT (UTC+1). Overlap: UK 6 to 7 hours, US East 4 to 5 hours. Based in Lagos, Nigeria.
C2  Hero image: `danfo.webp`, caption "Danfo wordmark, drawn by me."
C3  The three engineering case studies: copy FROZEN from `reference/artifact-index.html` (section id="work"), including links and the ordering. Keep the Problem / My role / What I built / Key decisions / Result / Links structure.
    Note for the report: the payments case study text mentions a webhook HMAC-SHA256 signature check. That text is FROZEN and describes the payment provider's scheme as built in that old slice. Do not change it. Do not copy that algorithm into any new code.
C4  ROWTA case study (new). Status chip at top: "In progress. Not launched." Structure same as the others, plus "Not built yet".
    Title: "Rowta, shift scheduling for small teams". Stack line: "Expo (React Native), Android first, Node, TypeScript, Hono, PostgreSQL, Redis, BullMQ, Prisma".
    Problem: [OWNER: one or two sentences on who schedules shifts today and what goes wrong]. Do not invent.
    My role: "Solo. I wrote the product spec, the design system and the rules for the AI coding agent, directed it phase by phase, and review and test what it produces. I make every git commit myself."
    What is built and checked so far (owner-approved facts only):
      - Android-first app shell with a component kit and a single-page sign-in (sign in, create account, forgot password) with one logo across screens. [agent-reported, owner to confirm]
      - A static web surface with landing page and draft legal pages. Drafts, not lawyer-reviewed, marked as drafts on the site.
      - An auth server: Argon2id password hashing, 15-minute access tokens, refresh tokens that rotate and revoke the whole family on reuse, emailed one-time codes (5 minutes, 5 attempts), reset and magic-link sign-in that works once and expires in 5 minutes.
    Key decisions (three hardest, FROZEN wording to be confirmed by owner):
      1. Unknown-email and wrong-password paths do the same amount of work, so response time does not reveal which emails have accounts. Found and fixed a real leak: verify-code and reset-code ratio was 1.27 and 1.36 before the fix.
      2. Sign-in link token travels in the URL fragment and is consumed only by a POST, so mail scanners that open links cannot use it up.
      3. Refresh tokens rotate on every use, and reuse of an old one revokes the whole token family, so a stolen token stops working as soon as the real user refreshes.
    (Do NOT mention sharding, team isolation, billing or any feature in "Not built yet" as if built.)
    Result so far (agent-reported, owner to confirm before publishing; show a visible `[OWNER: confirm]` tag next to every agent-reported fact and number until the owner removes it): timing ratios after the fix 1.00 / 1.17 / 1.17 (`[OWNER: define the three pairs measured; 1.00 means equal response time]`); 9 concurrency tests x 10 rounds with no double success. Show them as a small table with the column "Evidence" linking to the repo path `[OWNER: file link]`.
    Not built yet (must be shown, plain): teams and roles, shifts, swaps, billing, push notifications, offline mode, load test, deployed backend, development build, demo video.
    Next: [OWNER: next three milestones with dates, or "none dated"].
    Links: Code https://github.com/Antisocialworld/Rowta (repo may be private; if private show "Repo link coming" instead, `[OWNER: confirm public]`). Do not link anything that does not exist.
    Load test numbers: NOT AVAILABLE. Write "Load test not run yet" in the "Not built yet" list. Never fill in numbers.
C5  DESIGN PROCESS case study (new): "The Rowta logo, from paper to SVG".
    Facts (owner-stated): the logo is a closed book with R O W over T A in cells. The owner drew the concept by hand on paper. The final SVG files were generated from the sketches with AI assistance following the owner's direction, refined over many rounds of the owner's feedback. The owner approved every proportion, colour and size rule. Locked rules: lettered book at 160 px and up; letterless at 48 px and below (favicon, notification icon); a white silhouette for the notification icon. Colours: tile #292da3, spine #1e227b, pages #d6d7f5, ribbon and tint #7f82dc.
    Show: (1) photo of the paper sketch `[OWNER: add img/logo-sketch.webp]`, (2) the final lettered logo SVG, (3) the letterless small version at 48 px and the mono silhouette, (4) a rules list. SVG sources are in the owner's Rowta repo at `brand-source/`; the owner copies them to `owner-assets/to-add/`.
    If `logo-sketch` is not provided, still render the section with a visible `[OWNER: sketch photo]` placeholder box. Never draw a fake sketch.
    Credit line (verbatim): "The concept was drawn by hand on paper by me. The final SVG files were generated from my sketches with AI assistance, following my direction, and refined over many rounds of my feedback. I approved every proportion, colour and size rule."
C6  DESIGN GALLERY: existing five images with their existing alt text and captions (FROZEN), unchanged: Okada (colour + line), No Evil, Spooky Man tech pack, two character illustrations. Intro line FROZEN: "I draw too. All of this is my own work, and the spiral signature is mine."
    Additions ONLY if the owner moves files to `owner-assets/to-add/` AND writes a line in `owner-assets/ASSETS.md` saying "own work" or "recreation": 
      - Perfume Gallery sign-in states (see D). Caption: "Sign-in and registration states for a perfume shop app: empty, error, password strength, account exists, passwords do not match." Process text `[OWNER: who it was for, what you tried, what you changed]`.
      - Sprint screens (D1), with the photo line.
      - "Music is my habitat" illustration.
    Recreations (if included at all) get the visible label "Recreation of an existing design, for practice".
C7  Footer: "Solomon Ikharia. Designs and illustrations on this page are my own work. AntisocialWorld logo directed by me. Device mockups and photos not made by me are marked where shown." If any recreation is shown, add "Recreations are labelled." Add the no-cookies line (B11). Gallery intro (C6) stays FROZEN: "I draw too. All of this is my own work, and the spiral signature is mine." (That intro covers only the drawing and clothing gallery, not the Sprint block.)
C8  APE-P-I and DAILY MEAL (new, small "Also built" block after Rowta; facts from the two repo READMEs, read 21 Oct 2026; default branch of both is main).
    Title: "A food-delivery API, and an app that proves it works from outside".
    APE-P-I: a REST API serving realistic food-delivery data (restaurants, menu items, orders, customers). Next.js 15, Prisma 6, PostgreSQL 16. Seeded with about 40 restaurants, 300 customers and 500 orders. Endpoints: list restaurants (paginated, filterable, sortable), get a restaurant, get its menu, create, get, update status and delete an order. No auth, no admin panel: the endpoints are the product.
    Daily Meal: Next.js 16 (App Router, React 19), no database, a pure API client. Lists restaurants from the live API, filters by cuisine, paginates with previous/next (offset and limit), handles loading, empty and error states, and calls the API across a real domain boundary (a separate project making real cross-origin requests).
    Links: API code https://github.com/Antisocialworld/APE-P-I ; API live https://ape-p-i.vercel.app ; API write-up https://github.com/Antisocialworld/APE-P-I/blob/main/DOCUMENTATION.md ; App code https://github.com/Antisocialworld/Daily-Meal ; App live https://daily-meal-one.vercel.app ; App write-up https://github.com/Antisocialworld/Daily-Meal/blob/main/DOCUMENTATION.md .
    Owner confirmed on 21 Oct 2026 that both live sites open: no tag. The agent did not open them ("not opened by the agent"). Show the two owner screenshots `d01`, `d02` (Daily Meal list and pagination) in this block with alt text describing what is shown, caption "Daily Meal on a phone: the filter, the list and the previous/next pages. Logo and interface designed by me. The restaurants are sample data from my API." (owner said 21 Oct 2026 he designed the Daily Meal logo; `[OWNER: confirm interface design is yours too, else change to "Logo designed by me."]`) Do not claim the data is real. Do not add numbers or claims beyond this list. "No auth" is stated plainly, as the README states it.

---------------------------------------------------------------------
## PART D. ASSET AUDIT (what the owner showed, decided 20 Oct 2026)
---------------------------------------------------------------------
Candidates are in `owner-assets/candidates/` (c01 to c18). The agent uses a candidate only after the owner moves it to `owner-assets/to-add/` and states "own work" in `owner-assets/ASSETS.md`.
D1  c01, c02, c03 (Sprint screens): INCLUDE. Owner stated 20 Oct 2026: everything was designed by them in Figma; only the phone-in-hand device mockup (c01, c02) is not theirs. Block "Sprint, a running and fitness app": lead with c03 (flat screen, no mockup), then c01 and c02. Caption: "Onboarding and home screens for Sprint, a running and fitness app. Designed by me in Figma." Under c01 and c02 add: "The device mockup and the photos in these screens are not mine. The screen designs are." (owner decision 21 Oct 2026: images stay, disclaimer instead of a source) Process text [OWNER: who it was for, what you tried, what you changed]. Photo line: the runner photos sit inside the owner's design; their original source is not recorded. NO [OWNER: photo source] tag any more (owner cannot recall the source and chose the disclaimer). List in OWNER-TODO.md as "not verified: licence and source of the mockup template and the photos in c01, c02". Never write "all photos are mine".
D2  c15, c16 (EdgeKart home and workspace): EXCLUDE from the "own work" gallery. Memory: this was a recreation of an existing design. If the owner insists, label as recreation (C6).
D3  c04 to c13 (Perfume Gallery login, register, reset, strength meter, error, account exists, mismatch): RECOMMENDED. Best UI/UX evidence, because it shows states and error handling. Build a compact "states" grid of 6 frames max: login empty (c08), login error (c04), register empty (c05), strength weak/fair/strong (one frame, c06, c11, c12 in a 3-up strip), account exists (c10), password mismatch (c13). Needs owner confirmation that it is own work. The typed email on the screens is the owner's public handle; acceptable.
D4  c17, c18 (Perfume shops list and drawer): OPTIONAL, add two frames beside D3 if confirmed.
D5  c14 ("Music is my habitat" illustration, yellow blob, radio, runner): OPTIONAL. Fits the danfo yellow. Add to gallery if confirmed own work.
D6  Convert any added PNG/JPG to webp (quality 80) with a script kept in `tools/`, outside `site/`: phone screens max 600 px wide, illustrations max 1000 px. Use `sharp` (dev only) or Python Pillow; if neither installs, say "not verified" and stop for the owner. Record width/height. Keep originals in `owner-assets/`.
D7  Alt text for every new image written plainly (what is shown, not "image of"). For UI screens, include the visible state and key on-screen text (for example: "Login screen with a red error under the password field: Your password is incorrect").

---------------------------------------------------------------------
## PART E. DESIGN SYSTEM (locked, from the published page)
---------------------------------------------------------------------
Colours: paper #F9F7EB, ink #1B1B18, muted #5A584E, danfo #FFD60A, line #1B1B18, soft #ECE8D3, link #1F4D17.
Type: display "Bricolage Grotesque" 500/700/800 (self-host woff2, latin subset); body "Instrument Sans" 400/500/600. Fallbacks: Arial Narrow/Arial for display, system-ui for body. Get the woff2 files once from the `@fontsource/bricolage-grotesque` and `@fontsource/instrument-sans` npm packages (latin subset), copy into `site/fonts/`, then delete node_modules. Include each font's OFL licence text in `site/fonts/` (OFL requires the notice). Record package names, versions and licence in the report. If `@fontsource-variable/*` files are smaller for the weights used, they are allowed. Do not add a package.json dependency to `site/`.
Ornament: ONE only, the danfo stripe (22 px yellow band with a 4 px black line). Nothing else decorative.
Layout: max width 1120, gutter 16 px (32 px from 760 px up), sections separated by a 2 px ink rule, case studies in two columns from 760 px (title left, details right), gallery on a 6-column grid from 760 px. Buttons: pill, 2 px ink border, 44 px min height, primary filled ink, hover danfo.
Rowta status chip: soft background, ink text, 2 px ink border, text "In progress".
Rowta logo colours are used ONLY inside the logo images, never as site accents.
Motion: none, except link/button colour change. 
Copy tone: plain, first person, short sentences, sentence case, no hype, no emojis.
Do not use: gradients, shadows, cards with rounded identical boxes, tracked all-caps eyebrows, numbered markers, "scroll" arrows.

---------------------------------------------------------------------
## PART F. SKILL (how to build this, step by step)
---------------------------------------------------------------------
F1  `git switch portfolio-1` (create if missing). Confirm with `git branch --show-current`.
F2  Read this file fully, then `reference/artifact-index.html`.
F3  Make folders: `site/`, `site/img/`, `site/fonts/`, `tools/`. Write OWNER-TODO.md and BUILD-NOTES.md at repo root.
F4  Copy `reference/assets-original/*.webp` to `site/img/`.
F5  Fonts per section E. Write `@font-face` with `font-display: swap`.
F6  Build `index.html` and `styles.css` (external stylesheet, no inline style blocks except none). Reuse the reference CSS values; add the new sections.
F7  Extract FROZEN copy by script: write `tools/extract-frozen.mjs` that reads the reference HTML and prints the case-study blocks; diff your `index.html` blocks against them to prove they are verbatim. Report the diff result (expected: identical text).
F8  Build `favicon.svg` (the danfo stripe: yellow rect with a black line, 32x32), `robots.txt` (allow all, no sitemap needed for one page), `404.html` (same styles, one line and a link home).
F9  Add Rowta case study (C4) and logo case study (C5) with placeholders visible.
F10 Handle assets per section D (only owner-approved).
F11 Checks, run and paste real output: (a) HTML validity with a validator you can run offline, or say not verified; (b) link check script `tools/check-links.mjs` for local anchors and files, plus a list of external links (do not fetch them), (c) grep proving no `http` to third-party hosts for fonts/scripts, no `<script src`, no `cookie`, no `localStorage`; (d) grep proving no phone numbers; (e) size report of `site/` by file; (f) a headless-browser screenshot at 360, 390, 768, 1280 px widths into `docs/ui-matrix/` (Playwright is allowed as a dev tool outside `site/`); (g) Lighthouse run if available (performance, accessibility, best practices, SEO), else "not verified"; (h) keyboard path: tab order listed from the DOM; (i) contrast numbers of the palette pairs recomputed by a script file.
F12 Triple pass: audit your own output three times (content vs spec, accessibility, performance), fix real findings, list them.
F13 Write BUILD-NOTES.md (decisions, measured numbers, deviations) and OWNER-TODO.md (every `[OWNER: ...]`, every "not verified", asset confirmations needed, LinkedIn check, final URL, repo visibility, favicon/og check, publish steps for GitHub Pages in plain words, which the owner performs).
F14 Stop. Do not publish. Give the summary (R14).

---------------------------------------------------------------------
## PART G. ACCEPTANCE CHECKLIST
---------------------------------------------------------------------
[ ] One page, positioning in the first screen, hours in WAT, contact link
[ ] 3 engineering case studies verbatim, with links
[ ] Rowta case study honest: In progress, Not built list, no load-test numbers, placeholders visible
[ ] Logo process case study with credit line, sketch placeholder if missing
[ ] No third-party requests, no JS, no cookies
[ ] Works at 360 px with no horizontal scroll
[ ] All images webp, sized, lazy except hero
[ ] Alt text on all images
[ ] OWNER-TODO.md lists every placeholder
[ ] Nothing committed, pushed or published by the agent

---------------------------------------------------------------------
## PART H. GAPS FOUND IN AUDIT (decided 20 Oct 2026)
---------------------------------------------------------------------
H1  Repo setup: the folder must be a git repo before the agent starts. The owner runs `git init`, `git add .`, `git commit` once (see SETUP.md) on the default branch; then the agent runs `git switch -c portfolio-1`. If `git branch --show-current` shows no repo, stop and tell the owner. The agent never runs `git init`.
H2  `.gitignore` already provided: node_modules, tools/out, .DS_Store, Thumbs.db.
H3  Preview: serve `site/` locally with `python -m http.server` or `npx serve` (dev only, outside `site/`). Test at the root path AND from a subpath to prove relative links work.
H4  `404.html` is served by GitHub Pages from the site root; use links valid at the root (`/`), and say so in BUILD-NOTES.md.
H5  OG image: build `site/img/og.png` (1200x630) by screenshotting a small HTML file in `tools/` with Playwright (dev only). If it fails, leave the placeholder and say "not verified".
H6  Add `<meta name="theme-color" content="#F9F7EB">`, `<meta name="color-scheme" content="light">`, favicon link, and a `README.md` at repo root (one paragraph: what this is, `site/` is the deployable folder, the owner publishes; all rights reserved on images).
H7  Overlap claims in C1 were checked against UTC offsets: 11:00 to 19:00 WAT is 10:00 to 18:00 UTC; UK 6 hours (BST) or 7 hours (GMT), US East 5 hours (EDT) or 4 hours (EST), for a 09:00 to 17:00 local day. Keep as written.
H8  Known risks to keep visible in OWNER-TODO.md: LinkedIn link supplied by the owner, not openable by the agent; Sprint photo licence; Rowta facts are agent-reported until the owner confirms; the HMAC-SHA256 wording in the frozen payments case study; the page is a draft until all `[OWNER: ...]` tags are gone. Do not publish with any `[OWNER:` text visible; add a check script `tools/no-owner-tags.mjs` that fails if any remain, and report its output (expected: fails until the owner fills them in).

---------------------------------------------------------------------
## PART I. ALL-DEVICE REQUIREMENTS AND TEST MATRIX (added 21 Oct 2026)
---------------------------------------------------------------------
"Perfect on all devices" cannot be proven for every device. The target is: no broken layout, no horizontal scroll, readable and usable from 280 px to 3840 px wide, portrait and landscape, in current Chrome, Safari, Firefox and Edge engines. Report what was tested and what was NOT tested. Never write "works on all devices".

I1  Build rules
 - Mobile-first CSS. Content never depends on hover. No fixed pixel widths on containers; use max-width, `min()`, `clamp()`, grid `minmax(0, 1fr)`.
 - Viewport meta: `width=device-width, initial-scale=1, viewport-fit=cover`. Do NOT disable zoom.
 - Safe areas: gutters use `max(var(--gutter), env(safe-area-inset-left/right))`; top and bottom padding use `env(safe-area-inset-*)`.
 - Use `min-height: 100svh` only if needed, never `100vh` for layout. No full-screen hero heights.
 - Text: base 17 px (1.0625rem), line-height 1.6; `overflow-wrap: anywhere` on long strings (emails, URLs); `text-wrap: balance` for headings with graceful fallback; allow text resize to 200% without loss; `-webkit-text-size-adjust: 100%`.
 - Layout breakpoints: base (to 759 px) one column; 760 px two columns for case studies and gallery grid; 1120 px max content width, centred, also fine at 1920 and 2560.
 - Tiny screens: at 280 to 320 px the hero buttons wrap, the gallery is one column, images shrink with `max-width: 100%; height: auto`, nothing overflows.
 - Landscape phones (height under 500 px): no sticky or fixed elements at all (this page has none).
 - Images: width and height attributes set (no layout shift), `loading="lazy"` below the fold, `decoding="async"`; phone-screen images capped at 320 px display width on mobile via CSS, not stretched full width.
 - Font loading: `font-display: swap`; fallback stacks with matching metrics (`size-adjust`/`ascent-override` via `@font-face` fallback) so swap does not shift layout; if not done, report layout shift as not measured.
 - Inputs: the page has none. Links and buttons min 44x44 px, spaced at least 8 px apart.
 - Media queries to honour: `prefers-reduced-motion`, `forced-colors: active` (keep borders and focus rings visible; do not rely on background colour alone), `print`, `(hover: hover)` for hover styles only.
 - Works with JavaScript disabled (the page uses none), with cookies blocked, and on a slow connection (throttle to "Slow 4G" and report load time).
 - Right-to-left and other languages are out of scope; the page is English only.
I2  Test matrix (use Playwright, dev only, outside `site/`; run all three engines if installable: Chromium, Firefox, WebKit; if one fails to install, say "not verified" for that engine)
 | Class | Viewport (CSS px) |
 | Small phone | 320x568 |
 | Foldable folded | 280x653 |
 | Phone | 360x800, 390x844, 430x932 |
 | Phone landscape | 844x390 |
 | Tablet | 768x1024, 1024x768 |
 | Laptop | 1280x800, 1440x900 |
 | Desktop | 1920x1080, 2560x1440 |
 | Ultra-wide and 4K | 3440x1440, 3840x2160 (content stays centred at max 1120 px; root font-size scales up with `clamp(100%, 0.45vw + 0.6rem, 125%)` above 1920 px so text is not tiny) |
 For EVERY viewport and engine: (a) no horizontal scroll: assert `document.documentElement.scrollWidth <= innerWidth`; (b) no element overflows the viewport: script lists any element whose right edge exceeds the viewport; (c) screenshot saved to `docs/ui-matrix/<engine>-<width>x<height>.png`; (d) all images loaded (`naturalWidth > 0`); (e) no console errors; (f) no failed network requests.
 Extra runs: 200% text zoom (set root font-size to 200% and re-check a, b); forced-colors emulation; reduced-motion emulation; print emulation to PDF (check no cut-off); JS disabled; offline after load (page still reads).
 Emulation caveat: Playwright device emulation is not a real device. Say so in the report.
I3  Accessibility checks, report output: keyboard tab order list; every interactive element focus-visible; heading outline; image alt audit; contrast script (palette pairs); `lang`; skip link works. Use axe-core via Playwright if installable (dev only), else say "not verified".
I4  Performance: Lighthouse mobile run if available (report the four scores and LCP, CLS, TBT), else "not verified".
I5  Owner real-device checklist (the agent writes it into OWNER-TODO.md; the owner does it after publishing to a preview URL): iPhone Safari (portrait, landscape, text size larger via Settings), the owner's other phone if any, a laptop browser, a Windows browser other than Chrome (Edge or Firefox). Check: no sideways scroll, hero image visible, buttons tappable, case studies readable, images load, email link opens the mail app. The owner has an iPhone and no Android phone: Android is covered by emulation only (Chromium at phone sizes) and must be reported as "emulated, not on a real device".
I6  Acceptance additions (Part G): the matrix in I2 passes on every viewport and every installed engine, with the output pasted, and the not-tested list is stated.

---------------------------------------------------------------------
## PART J. VERSION 2 CHANGES (21 Oct 2026). Where Part J conflicts with Parts A to I, PART J WINS.
---------------------------------------------------------------------
J1  Stack change: ASTRO, static output. Overrides R9, B4, B8 (zero JS) and F3/F6/F8 paths.
 - Astro project at repo root: `src/pages/index.astro`, `src/components/*.astro`, `src/data/*` (case studies, links, poems as data/markdown), `src/styles/*.css`, `public/` (fonts, images, favicon, robots.txt, og image), `astro.config.mjs`, `package.json`, `package-lock.json`. The deployable folder is `dist/` (build output). Every check in Parts F, H and I runs against the BUILT `dist/` served with `astro preview`, not the dev server.
 - Config: `output: 'static'`, `site: '[OWNER: final URL]'`, `base` configurable (root by default), `compressHTML: true`, `trailingSlash: 'ignore'`. Disable Astro telemetry (`astro telemetry disable`) and report `astro telemetry status` output, or "not verified".
 - Allowed dependencies: `astro` and `sharp` only (plus `@fontsource*` once for font files, then removed). No React, Vue, Svelte, Tailwind, UI kits, icon packs, analytics or any other integration. NO hydrated components (no `client:*` directives). Pin exact versions (no ^ or ~), commit `package-lock.json`, install with `npm ci`, set `ignore-scripts=true` in `.npmrc` if the build still works (else report). Run `npm audit` and REPORT only, never `npm audit fix`. Record Astro, Node and sharp versions in BUILD-NOTES.md; the agent picks the current stable Astro and states the version (not verified by the owner).
 - Reusable components: `Hero`, `Nav`, `CaseStudy`, `Figure`, `Section`, `Seo`. FROZEN case-study text lives in `src/data/` copied verbatim; the diff proof (F7) compares the BUILT HTML text against the reference file.
 - Images use Astro's image optimisation (webp, width/height emitted, lazy below fold). Fonts: self-hosted in `public/fonts/` as before (no Astro fonts API, no Google Fonts).
 - Do NOT create `.github/` or any deploy workflow. For the owner, write `docs/deploy-options.md`: Vercel ONLY (owner decision 21 Oct 2026): import the repo, framework preset Astro, build command `npm run build`, output directory `dist`, no environment variables. Do NOT write a GitHub Pages file or `docs/deploy-github-pages.yml.txt`. The final URL is not known: keep canonical, og:url and JSON-LD url as `[OWNER: final URL]`. The owner publishes.
 - `dist/` is git-ignored by default; say so in README.md.
J2  Zero page reloads: one page, in-page anchor links only, no full-page navigation except external links and mailto. Smooth scrolling only inside `@media (prefers-reduced-motion: no-preference)`. Use `scroll-padding-top` so headings are not hidden. Do not add a client router or view transitions (single page, not needed).
J3  Tiny enhancement script (the ONLY client JS): one file, under 2 KB gzipped, no libraries, loaded with `defer`/module, page fully usable and every title/description correct without it. It does three things: (1) DYNAMIC TITLE: as the visitor scrolls, set `document.title` to "<Section> | AntisocialWorld" using an IntersectionObserver (example: "Work | AntisocialWorld"); back at the top it restores "AntisocialWorld, Product Engineer"; (2) mark the current nav link with `aria-current="location" (J23)`; (3) update the URL hash with `history.replaceState` (no reload, no scroll jump, no extra history entries). Handle `hashchange`, direct loads on a hash, and no-IntersectionObserver browsers (do nothing). Never touch the DOM beyond those three things. No cookies, storage, network, or tracking.
J4  SEO and sharing (one `Seo` component):
 - `<title>` "AntisocialWorld, Product Engineer" (owner decision 21 Oct 2026: the real name is NOT in the title; it stays in the hero name line, About, and JSON-LD `name`). Hero name line: "Solomon Ikharia, also known as AntisocialWorld. Lagos, Nigeria." (replaces the old name line; FROZEN positioning below it is unchanged). Meta description (under 160 chars, plain): "Product engineer in Lagos building web apps with secure sign-in, payments and background jobs. I check AI-written code before it ships. Case studies, designs and contact." [OWNER: approve].
 - `<link rel="canonical">` using `site`; `meta name="robots" content="index,follow"`; `theme-color`; favicon; `lang="en"`.
 - Open Graph: og:title, og:description, og:type (website), og:url, og:image (1200x630 PNG, with `og:image:alt`, width, height), og:site_name, og:locale en_NG [OWNER: confirm]. Twitter: `twitter:card` summary_large_image, title, description, image, image alt.
 - JSON-LD `Person`: name "Solomon Ikharia", alternateName "AntisocialWorld", jobTitle "Product Engineer", url, image, email-free (do not put the email in structured data), sameAs [GitHub, LinkedIn], address {addressLocality: "Lagos", addressCountry: "NG"} (no street), knowsAbout [only skills proven on the page].
 - KEYWORDS: add `<meta name="keywords">` (comma list, under 12 terms) because the owner asked, but state in BUILD-NOTES.md that major search engines are widely reported to ignore it, so it is harmless and not relied on. Real search value comes from the visible text, headings, title and description. Terms (only true ones): AntisocialWorld, Solomon Ikharia, product engineer, Lagos, Nigeria, authentication, payments, background jobs, Next.js, TypeScript, PostgreSQL, UI/UX design, logo design, AI-assisted development. [OWNER: approve].
 - Check script `tools/check-seo.mjs` over the built HTML: one h1, title length, description length, canonical present, all OG/Twitter tags present, JSON-LD parses as JSON, image URLs resolve to files. Paste output. Social preview rendering on real platforms is NOT verified (owner checks after publishing).
J5  Accessibility (WCAG 2.2 AA target, all users): everything in B9 and I3, plus: landmarks (`header`, `nav` with `aria-label="Sections"`, `main`, `footer`); each section has an `aria-labelledby` heading; link text makes sense out of context (no "click here"); external links say so in text or `aria-label` only where needed; target sizes 44 px; focus never obscured by sticky UI; text spacing override test (line-height 1.5, paragraph spacing 2x, letter spacing .12em, word spacing .16em) without clipped text; `prefers-contrast: more` makes borders and text darker; poems are real text (never images of text) with `lang` and visible line breaks; images of UI screens have the alt rule D7; no content conveyed by colour alone; no auto-playing media; page readable at 400% zoom (320 CSS px equivalent) without two-way scrolling; consistent navigation order. Run axe-core via Playwright on the built page at 3 widths and report violations (expect zero; if it cannot run say "not verified"). The owner does a real screen reader pass: VoiceOver on iPhone (OWNER-TODO checklist). Do not claim "fully accessible": claim only what was tested.
J6  Navigation: `Nav` under the hero listing Work, Rowta, What makes me different, Design, About, Contact. At 760 px width and up and 600 px height and up it is sticky at the top (44 px tall, paper background, 2 px ink bottom border); below that it is not sticky and wraps. Each section ends with a plain "Back to top" link. Skip link stays. A visible focus ring everywhere.
J7  New page order (replaces B6):
 1. Danfo stripe, hero (name line, positioning FROZEN, one-line "what I do differently" under it, hours, Email / GitHub / LinkedIn, danfo image)
 2. Nav
 3. "Three things I built" (3 FROZEN case studies)
 4. "In progress: Rowta" (C4), then "Also built" (C8)
 5. "What makes me different" (J8)
 6. "Design" (C5 logo process, app screen block per D1 and D3, drawing and clothing gallery C6)
 7. "Open source" (J9)
 8. "About me" with "Off the clock" (J10, J11)
 9. "Get in touch" with "Open to" (J12)
 10. Footer
J8  WHAT MAKES ME DIFFERENT. Max 5 short points, each tied to evidence already on the page; draft below, tagged `[OWNER: approve wording]` visibly until approved:
 - "I prove behaviour, not just features." Each case study lists the tests I broke it with and what they showed.
 - "I write down what went wrong." Every project has a write-up with the bugs I found and what is not built.
 - "I design and build." Wordmarks, a tech pack, app screens, and a logo taken from a paper sketch to SVG.
 - "I direct AI agents and check their work." I write the spec, the agent builds, I read, test and break the result, and I make every commit myself.
 - "Made in Lagos." Okada and danfo lettering, naira pricing in the payments work, and a merged pull request adding a Nigeria list to an open source tool.
 No claim beyond what the page proves. No superlatives ("best", "expert", "passionate").
J9  OPEN SOURCE (small block): "Merged pull request: added a Nigeria import list to MyIP (jason5ng32/MyIP, PR #471, merged 5 September 2026)." Link https://github.com/jason5ng32/MyIP/pull/471 . Owner confirmed the link on 21 Oct 2026: no tag. The agent did not open it ("not opened by the agent").
J10 ABOUT ME. Draft (owner approves; all facts owner-stated): "I am Solomon Ikharia, also known as AntisocialWorld, a product engineer in Lagos. I build web apps with secure sign-in, payments and background jobs. I also design: I draw by hand, work in Figma, and designed the logo for my own app. I work with an AI coding agent: I write the spec and direct it, then read, test and break what it builds. I work 11:00 to 19:00 WAT." Tag `[OWNER: approve or rewrite in your own voice]`. Optional photo of the owner: only if the owner adds `owner-assets/to-add/portrait.*` and states it in ASSETS.md; otherwise none (no placeholder box needed). No age, no phone, no street address, no education claims.
J11 OFF THE CLOCK (owner-written, 21 Oct 2026; render EXACTLY, same words, same lowercase "i" and "its", no tag needed): "Outside work I write poems and I read and watch a lot of comics, series, i love music too, its therapy for my soul." Second line, owner's words with only a capital letter and punctuation added: "The cape crusader, you know him as batman, seems to be my favorite super hero." Never rewrite, polish or "fix" either line. No Batman images, logos or comic art (copyright): text only. Poems are OPTIONAL: if the owner adds files to `owner-assets/poems/`, render each as real semantic text (title + lines, line breaks kept, `lang`, max 38 ch measure, no images); if none, render NO poem block and NO placeholder. Never write or edit a poem. No comics list is needed (do not render one, do not invent titles).
J12 OPEN TO + CONTACT: "Open to: product engineer (main), design engineer, UI/UX design, logo and brand design, AI engineer." Location line (owner-confirmed 21 Oct 2026, no tag): "Based in Lagos, Nigeria. Open to remote work." Hours and overlap as C1. No phone number.
J13 Optional extras (build only if the owner adds the files; otherwise do not render): CV PDF download (owner supplies `cv.pdf` WITHOUT phone number; link text "CV (PDF)" with file size); skills line (max 10 skills, all proven on the page); training line ("Product Design and Engineering Bootcamp, since Feb 2026"; owner-stated, `[OWNER: confirm]`); Rowta demo GIF/video when it exists. Do NOT add: testimonials (none exist), visitor counters, chat widgets, newsletter, dark mode toggle, animations, cookie banner (no cookies).
J14 Owner inputs still open (agent lists in OWNER-TODO.md): approve or rewrite J4 description and keywords, J8 points, J10 About; Rowta problem statement; what changed between sketch and final (J17); optional: poems, Rowta paper logo sketch, CV PDF without phone, portrait, a line on what AntisocialWorld means, final URL. CONFIRMED by owner (no tags): Off the clock text, Batman line, location line, MyIP link, APE-P-I and Daily Meal live links, LinkedIn link.
J15 Acceptance additions: Astro build passes with zero warnings or each warning explained; `dist/` has no JS other than the one tiny script (assert with a script); that script is under 2 KB gzipped; page works with the script blocked; titles update on scroll in a Playwright test (assert `document.title` per section) and revert at the top; `tools/check-seo.mjs` passes; axe violations zero or listed; OWNER tags check still fails until the owner fills them.

J16 Nickname: "AntisocialWorld" appears in the title format (J3, J4), hero name line, JSON-LD alternateName, keywords and About. Legal name first everywhere. No explanation line about the nickname unless the owner supplies one: `[OWNER: optional one line on what AntisocialWorld means to you]` (do not write it).

J17 LETTERING PROCESS (new, inside the Design section, uses real owner pen sketches; satisfies the task's "designers show process"): block "From pen sketch to final wordmark" with three pairs, each a sketch next to the final: (1) Okada: `s02`, `s01` then `okada-colour` and `okada-line`; (2) Danfo: `s03`, `s04` then `danfo.webp`; (3) No Evil: `s05`, `s06` then `no-evil.webp`. Caption (owner-stated facts only): "Pen sketch by me, then redrawn as vector and illustrated in Figma." Process text beyond that: `[OWNER: what you changed between sketch and final]`. Sketches are small crops; show them at their natural size, never upscaled beyond 2x. The full sketch sheet is NOT used. This block can sit beside the Rowta logo case study (C5); if the owner never supplies the Rowta paper sketch, keep C5 with its placeholder and still show J17.
J18 Owner decisions 21 Oct 2026 recorded: title has no real name (J3, J4); Off the clock text and Batman line verbatim (J11); location line fixed (J12); MyIP, APE-P-I and Daily Meal links confirmed; comics list not needed; poems optional. Still tagged `[OWNER: approve]` until the owner approves: the five "different" points (J8), About (J10), the meta description (J4), keywords (J4). Still open: Rowta problem statement, Rowta paper logo sketch, "what changed between sketch and final".

J19 Path and check mapping (resolves old text): wherever Parts A to I say `site/`, read: sources in `src/` and `public/`, the deployable output in `dist/`. `site/fonts/` = `public/fonts/`; `site/img/` = `public/img/` (static) or `src/assets/` (optimised); every check in F11, H and I runs on `dist/` via `astro preview`. F11(c) and G "no JS": exactly ONE script file is allowed (J3); assert that `dist/` contains exactly one JS file, under 2 KB gzipped, with no `src` to another host. G "no third-party requests" and "no cookies" stand. B8 "zero JS" is replaced by J3.
J20 Dynamic title map (J3): Hero/top = "AntisocialWorld, Product Engineer"; Work = "Work | AntisocialWorld"; Rowta = "Rowta | AntisocialWorld"; What makes me different = "What makes me different | AntisocialWorld"; Design = "Design | AntisocialWorld"; Open source = "Open source | AntisocialWorld"; About = "About | AntisocialWorld"; Contact = "Contact | AntisocialWorld". og:title and twitter:title = "AntisocialWorld, Product Engineer".
J21 SEO note (owner chose a title without the real name): to keep the real name findable, "Solomon Ikharia" must appear in the visible hero name line, the About text, the footer, the JSON-LD `name`, and the meta description or keywords. Report this check in `tools/check-seo.mjs` output. Search ranking for the name is not verified.
J22 Sketch provenance: owner stated on 21 Oct 2026 that they sketched the lettering and logo themselves on paper. Use the wording "pen sketch by me" in captions.

J23 ARIA AND SEMANTICS (owner asked 21 Oct 2026: "apply aria label anywhere needed"). First rule of ARIA: native HTML first; add ARIA only where no native element or visible text does the job; never duplicate what the element already says. Apply exactly:
 - Landmarks: `header`, `nav aria-label="Sections"`, `main`, `footer` (no redundant `role=` attributes). Any landmark type used twice gets a unique label.
 - Every `section` and `article` uses `aria-labelledby` pointing to its visible heading id.
 - Logo: inline SVG. Standalone (no visible name beside it): `role="img"` and `aria-label="AntisocialWorld logo"` (or `<title>` with `aria-labelledby`). Beside the visible text "AntisocialWorld" (the nav brand link): the SVG gets `aria-hidden="true"` and `focusable="false"`, and the link text is the name (no double reading). The brand link has `aria-label` only if it has no visible text.
 - Any link or button WITHOUT visible text must have `aria-label` (describing the action or destination). Links with visible text get no `aria-label` (it would override the visible text). Do not add `title` attributes as a substitute.
 - Do not use `target="_blank"`. Links open in the same tab, so no "opens in new tab" text is needed.
 - Current section in the nav (J3): `aria-current="location"` (replaces "true" in J3). Remove it when none is current.
 - Decorative images and the danfo stripe: `alt=""` or `aria-hidden="true"`. Meaningful images keep alt per D7. Figures use `figure` and `figcaption`.
 - Status chip "In progress" is plain text (not colour only). The case-study `dl`, lists and tables use native elements.
 - Poems: `article aria-labelledby` with the title as the heading, `lang`, real text with `<br>` or `white-space: pre-line` so line breaks are preserved for screen readers.
 - Visually hidden text uses a `.sr-only` class (never `display:none` for content meant to be read). The skip link stays visible on focus.
 - No `aria-live` regions: the page has no dynamic messages. Note in BUILD-NOTES.md that screen readers may not announce the `document.title` change on scroll; this is expected, the title update is a sighted/tab-bar convenience.
 - No `aria-hidden` on focusable elements. No `role="presentation"` on meaningful content. No empty `aria-label`.
 - Verify: axe-core (zero violations or listed), plus Playwright ARIA snapshot (`locator.ariaSnapshot()`) of the full page pasted into `docs/aria-snapshot.txt`, plus a script that fails if any `aria-label` is empty, any `aria-labelledby` id is missing, any `target="_blank"` exists, or any `role` duplicates a native role. Real screen-reader check by the owner on iPhone VoiceOver is NOT verified by the agent.
J24 LOGO: the AntisocialWorld alien-head mark (`logo-alien.svg`, `logo-alien-mono.svg`, `favicon-alien.svg`) is APPROVED (21 Oct 2026, files are in `owner-assets/to-add/`; plain smile, no letters in the face). Use: nav brand mark at 32 px beside the text "AntisocialWorld" (J23 rules); favicon from `favicon-alien.svg` (letterless, no highlights, readable at 16 px) plus a 32 px PNG and an 180 px apple-touch-icon on paper colour, built by a script in `tools/`; og image may include the mark. Colours are the locked palette (yellow #FFD60A, ink #1B1B18, paper #F9F7EB), no new colours. Credit in ASSETS.md and in the About text only if the owner asks. Never describe it as hand-drawn by the owner.
J25 Owner decisions 21 Oct 2026 (late): host is Vercel only (see Part H deploy bullet); Rowta problem statement and Rowta agent-reported facts are supplied by the owner AFTER the build (keep placeholders and `[OWNER: confirm]` tags, list in OWNER-TODO.md); J8, J10, J4 description and keywords stay `[OWNER: approve]` until the owner replies "approved"; lettering caption for Okada, Danfo and No Evil sketches is exactly "Pen sketch by me, then redrawn as vector and illustrated in Figma."; Daily Meal caption per C8; the full sketch sheet and its other drawings (6ix, +234, cap man, Police hates me) are NOT used. The alien logo was drawn in a chat from the owner's reference and approved by him: never describe it as hand-drawn by the owner; footer wording decided: "AntisocialWorld logo directed by me." (inserted in C7, no tag).
J26 README: written by the agent before the owner commits, from real files and command output, 18 headings in the order given in PROMPT.md, no literal "[OWNER:" text, checked by tools/check-readme.mjs.
