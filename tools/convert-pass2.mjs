/**
 * tools/convert-pass2.mjs
 * Converts and optimizes Pass 2 design assets into public/img/.
 * Phone screens: max 600px wide, quality 80.
 * Logos & illustrations: max 800px-1000px wide, quality 80.
 */
import sharp from 'sharp';
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DST = 'public/img';
mkdirSync(DST, { recursive: true });

const jobs = [
  // EdgeKart from candidates (phone screens: max 600px)
  { src: 'owner-assets/candidates/c15-edgekart-home.png', dst: 'c15-edgekart-home.webp', maxWidth: 600 },
  { src: 'owner-assets/candidates/c16-edgekart-workspace.png', dst: 'c16-edgekart-workspace.webp', maxWidth: 600 },

  // Perfume product screens (phone screens: max 600px)
  { src: 'owner-assets/pass2/p01-perfume-luxury-oil.webp', dst: 'p01-perfume-luxury-oil.webp', maxWidth: 600 },
  { src: 'owner-assets/pass2/p02-perfume-list.webp', dst: 'p02-perfume-list.webp', maxWidth: 600 },
  { src: 'owner-assets/pass2/p03-perfume-grid.webp', dst: 'p03-perfume-grid.webp', maxWidth: 600 },
  { src: 'owner-assets/pass2/p04-perfume-luxury-zara.webp', dst: 'p04-perfume-luxury-zara.webp', maxWidth: 600 },

  // Sportsvill24 logo (max 600px)
  { src: 'owner-assets/pass2/l01-sportsvill24-logo.webp', dst: 'l01-sportsvill24-logo.webp', maxWidth: 600 },

  // Fintech recreation (max 1000px)
  { src: 'owner-assets/pass2/f01-fintech-recreation.webp', dst: 'f01-fintech-recreation.webp', maxWidth: 1000 },

  // Icon scene (max 800px)
  { src: 'owner-assets/pass2/a01-icon-scene-assembled.webp', dst: 'a01-icon-scene-assembled.webp', maxWidth: 800 },
];

console.log('=== Optimizing Pass 2 Assets ===\n');

for (const job of jobs) {
  const img = sharp(job.src);
  const meta = await img.metadata();
  const width = meta.width > job.maxWidth ? job.maxWidth : meta.width;

  const outPath = join(DST, job.dst);
  const result = await img
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath);

  console.log(`CONVERTED: ${job.dst.padEnd(30)} ${result.width}x${result.height} (${Math.round(result.size / 1024)} KB)`);
}

console.log('\nPass 2 optimization complete.');
