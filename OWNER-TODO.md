# OWNER-TODO.md

Tasks, approvals, and placeholders to be reviewed and completed by the owner before publishing.
Do not publish while any `[OWNER: ...]` tags remain. The automated check `npm run check:owner` will fail until all are filled.

---

## 1. Placeholders to Fill Before Deploy (`[OWNER: ...]`)
- None remaining. All tags resolved. Final URL configured as `https://antisocialworld.vercel.app/`.

---

## 2. Add Back When Confirmed or Published

- [ ] **18 rate limits claim**: Confirm the count in the Rowta repo, then restore to the "What is built" list and the results table.
- [ ] **Concurrency tests claim**: Confirm concurrency test numbers (9 tests &times; 10 rounds with no double success) and restore to the results table.
- [ ] **Single-page sign-in fact**: Confirm Android-first app shell component kit and single-page sign-in, then restore to the "What is built" list.
- [ ] **Repository link and file links**: When the Rowta repository is public, restore the GitHub link in Links and link the evidence rows to repository files.
- [ ] **Dated milestones**: When dates are set, replace "No dates set yet." with the next three dated milestones.
- **Optional later**: Add process notes, the Rowta logo sketch photo, and original-designer credits if known.

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
