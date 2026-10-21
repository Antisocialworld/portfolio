/**
 * tools/convert-assets.mjs
 * Converts owner-approved assets from owner-assets/to-add/ to webp in site/img/.
 * Phone screens: max 600px wide, quality 80.
 * Illustrations: max 1000px wide, quality 80.
 * Records width/height for each output file.
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = 'owner-assets/to-add';
const DST = 'site/img';
mkdirSync(DST, { recursive: true });

// Phone screen files (max 600px)
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
  'c17-perfume-shops',
  'c18-perfume-drawer',
];

// Illustrations (max 1000px)
const illustrations = [
  'c14-music-is-my-habitat-illustration',
];

const files = readdirSync(SRC);

for (const file of files) {
  const { name, ext } = parse(file);
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext.toLowerCase())) continue;

  const isPhone = phoneScreens.includes(name);
  const isIllustration = illustrations.includes(name);
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

  console.log(`OK: ${file} -> ${name}.webp  ${result.width}x${result.height}  ${Math.round(result.size / 1024)} KB`);
}

console.log('\nDone.');
