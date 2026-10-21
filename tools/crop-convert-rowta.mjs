import sharp from 'sharp';
import { statSync, existsSync } from 'node:fs';

const inputPath = 'owner-assets/rowta.png';
const outputPath = 'public/img/rowta-logo.webp';

if (!existsSync(inputPath)) {
  console.error(`ERROR: ${inputPath} does not exist!`);
  process.exit(1);
}

const image = sharp(inputPath);
const meta = await image.metadata();

console.log(`Input image: ${inputPath}`);
console.log(`Original dimensions: ${meta.width} x ${meta.height} px, channels: ${meta.channels}, format: ${meta.format}`);

// Get raw uncompressed pixel data
const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Detect non-white bounding box
// A pixel is considered white if R >= 250, G >= 250, B >= 250
function isWhite(r, g, b, a = 255) {
  if (channels === 4 && a < 10) return true; // transparent considered background
  return r >= 248 && g >= 248 && b >= 248;
}

let top = height;
let bottom = 0;
let left = width;
let right = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = channels >= 4 ? data[idx + 3] : 255;

    if (!isWhite(r, g, b, a)) {
      if (y < top) top = y;
      if (y > bottom) bottom = y;
      if (x < left) left = x;
      if (x > right) right = x;
    }
  }
}

console.log(`Detected non-white area:`);
console.log(`  x: ${left} to ${right}`);
console.log(`  y: ${top} to ${bottom}`);

const cropWidth = right - left + 1;
const cropHeight = bottom - top + 1;
console.log(`Crop box: left=${left}, top=${top}, width=${cropWidth}, height=${cropHeight}`);

// Extract the cropped region and convert to webp (quality 85 for sharp edges)
await sharp(inputPath)
  .extract({ left, top, width: cropWidth, height: cropHeight })
  .webp({ quality: 85, effort: 6 })
  .toFile(outputPath);

const outStat = statSync(outputPath);
console.log(`Saved: ${outputPath}`);
console.log(`Cropped WebP size: ${outStat.size} bytes (${(outStat.size / 1024).toFixed(1)} KB)`);
const croppedMeta = await sharp(outputPath).metadata();
console.log(`Final dimensions: ${croppedMeta.width} x ${croppedMeta.height} px`);
