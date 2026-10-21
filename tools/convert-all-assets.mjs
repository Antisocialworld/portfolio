/**
 * tools/convert-all-assets.mjs
 * Converts all owner-approved assets from owner-assets/to-add/ to webp in public/img/.
 * Phone screens: max 600px wide, quality 80.
 * Illustrations and sketches: max 1000px wide, quality 80.
 * Generates favicon-32.png, apple-touch-icon.png (180x180), and og.png (1200x630).
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync, copyFileSync, readFileSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = 'owner-assets/to-add';
const DST = 'public/img';
mkdirSync(DST, { recursive: true });
mkdirSync('public', { recursive: true });

// Phone screens: max 600px wide
const phoneScreens = [
  'c01-sprint-phone-mock-start',
  'c02-sprint-phone-mock-home',
  'c03-sprint-flat-home',
  'c04-perfume-login-error',
  'c05-perfume-register-empty',
  'c06-perfume-register-weak',
  'c07-perfume-reset',
  'c08-perfume-login-empty',
  'c09-perfume-login-strong',
  'c10-perfume-account-exists',
  'c11-perfume-register-fair',
  'c12-perfume-register-strong',
  'c13-perfume-password-mismatch',
  'c18-perfume-drawer',
  'd01-daily-meal-list',
  'd02-daily-meal-pagination',
];

// Illustrations and sketches: max 1000px wide
const illustrationsAndSketches = [
  'c14-music-is-my-habitat-illustration',
  's01-sketch-okada-bike',
  's02-sketch-okada-early',
  's03-sketch-danfo-wordmark',
  's04-sketch-danfo-bus',
  's05-sketch-noevil-faces',
  's06-sketch-noevil-word',
];

// Also convert reference assets if needed
const REF_SRC = 'reference/assets-original';
for (const file of readdirSync(REF_SRC)) {
  if (file.endsWith('.webp')) {
    copyFileSync(join(REF_SRC, file), join(DST, file));
    console.log(`COPIED REF: ${file}`);
  }
}

// Convert owner-assets/to-add
const files = readdirSync(SRC);

for (const file of files) {
  const { name, ext } = parse(file);
  const extLower = ext.toLowerCase();

  if (['.png', '.jpg', '.jpeg'].includes(extLower)) {
    const isPhone = phoneScreens.includes(name);
    const isIllustration = illustrationsAndSketches.includes(name);

    if (!isPhone && !isIllustration) {
      console.log(`SKIP: ${file} (not in approved list)`);
      continue;
    }

    const maxWidth = isPhone ? 600 : 1000;
    const srcPath = join(SRC, file);
    const dstPath = join(DST, name + '.webp');

    const img = sharp(srcPath);
    const meta = await img.metadata();

    const resizeWidth = meta.width > maxWidth ? maxWidth : meta.width;
    const result = await img
      .resize({ width: resizeWidth, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dstPath);

    console.log(`CONVERTED: ${file} -> ${name}.webp ${result.width}x${result.height} ${Math.round(result.size / 1024)} KB`);
  }
}

// Copy SVG logos and favicons
const svgFiles = ['logo-alien.svg', 'logo-alien-mono.svg', 'favicon-alien.svg'];
for (const svg of svgFiles) {
  const srcPath = join(SRC, svg);
  copyFileSync(srcPath, join('public', svg));
  copyFileSync(srcPath, join(DST, svg));
  console.log(`COPIED SVG: ${svg}`);
}
// Default favicon.svg is favicon-alien.svg
copyFileSync(join(SRC, 'favicon-alien.svg'), join('public', 'favicon.svg'));

// Generate 32px PNG favicon from favicon-alien.svg
await sharp(join(SRC, 'favicon-alien.svg'))
  .resize(32, 32)
  .png()
  .toFile(join('public', 'favicon-32.png'));
console.log('GENERATED: public/favicon-32.png (32x32)');

// Generate 180px apple-touch-icon.png with paper #F9F7EB background
// 180x180 square with alien head centered inside
const alien140Buffer = await sharp(join(SRC, 'favicon-alien.svg'))
  .resize(140, 140)
  .toBuffer();

await sharp({
  create: {
    width: 180,
    height: 180,
    channels: 4,
    background: { r: 0xF9, g: 0xF7, b: 0xEB, alpha: 1 }
  }
})
  .composite([{ input: alien140Buffer, top: 20, left: 20 }])
  .png()
  .toFile(join('public', 'apple-touch-icon.png'));
console.log('GENERATED: public/apple-touch-icon.png (180x180)');

// Generate OG image: 1200x630 PNG on paper #F9F7EB
// Using sharp SVG composite with Danfo / Alien mark & title
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F9F7EB"/>
  <!-- Danfo stripe at top -->
  <rect x="0" y="0" width="1200" height="28" fill="#FFD60A"/>
  <rect x="0" y="11" width="1200" height="6" fill="#1B1B18"/>
  
  <!-- Content -->
  <g transform="translate(100, 140)">
    <!-- Alien head logo mark -->
    <g transform="translate(0, 0) scale(0.3)">
      <path d="M256 40C150 40 80 118 84 218C88 300 150 404 256 474C362 404 424 300 428 218C432 118 362 40 256 40Z" fill="#FFD60A" stroke="#1B1B18" stroke-width="16" stroke-linejoin="round"/>
      <path d="M112 214C146 186 218 202 242 266C198 282 132 266 112 214Z" fill="#1B1B18"/>
      <path d="M400 214C366 186 294 202 270 266C314 282 380 266 400 214Z" fill="#1B1B18"/>
      <ellipse cx="170" cy="226" rx="17" ry="9" transform="rotate(24 170 226)" fill="#F9F7EB"/>
      <ellipse cx="342" cy="226" rx="17" ry="9" transform="rotate(-24 342 226)" fill="#F9F7EB"/>
      <path d="M228 376Q256 392 284 376" fill="none" stroke="#1B1B18" stroke-width="14" stroke-linecap="round"/>
    </g>
    
    <text x="180" y="55" font-family="'Instrument Sans', Arial, sans-serif" font-size="28" font-weight="600" fill="#5A584E">Solomon Ikharia &#8226; Lagos, Nigeria</text>
    <text x="180" y="110" font-family="'Bricolage Grotesque', Arial, sans-serif" font-size="52" font-weight="800" fill="#1B1B18" letter-spacing="-1">AntisocialWorld</text>
    <text x="180" y="155" font-family="'Instrument Sans', Arial, sans-serif" font-size="32" font-weight="500" fill="#1F4D17">Product Engineer</text>
  </g>
  
  <g transform="translate(100, 360)">
    <text x="0" y="0" font-family="'Bricolage Grotesque', Arial, sans-serif" font-size="32" font-weight="700" fill="#1B1B18">Web apps with secure sign-in, payments and background jobs.</text>
    <text x="0" y="44" font-family="'Instrument Sans', Arial, sans-serif" font-size="24" font-weight="400" fill="#5A584E">I check AI-written code before it ships, for early-stage startups.</text>
  </g>
  
  <!-- Bottom line -->
  <line x1="100" y1="530" x2="1100" y2="530" stroke="#1B1B18" stroke-width="2"/>
  <text x="100" y="570" font-family="'Instrument Sans', Arial, sans-serif" font-size="20" font-weight="500" fill="#5A584E">github.com/Antisocialworld &#8226; 11:00–19:00 WAT</text>
</svg>
`;

await sharp(Buffer.from(ogSvg))
  .png()
  .toFile(join(DST, 'og.png'));
console.log('GENERATED: public/img/og.png (1200x630)');

console.log('\nAll asset conversions completed successfully.');
