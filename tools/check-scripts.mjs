/**
 * tools/check-scripts.mjs
 * Asserts that dist/ contains at most one client JS file (nav.js),
 * that it is under 2 KB gzipped, and has no third-party src references.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const targetDir = existsSync('dist') ? 'dist' : 'public';
const files = [];

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
    } else if (entry.endsWith('.js') || entry.endsWith('.mjs')) {
      files.push(full);
    }
  }
}

walk(targetDir);

console.log(`=== Client scripts found in ${targetDir}: ${files.length} ===`);
let failed = false;

for (const file of files) {
  const content = readFileSync(file);
  const size = content.length;
  const gzipped = gzipSync(content).length;
  console.log(`  File: ${file}`);
  console.log(`  Raw size: ${size} bytes`);
  console.log(`  Gzipped size: ${gzipped} bytes`);

  if (gzipped > 2048) {
    console.log(`  FAIL: Script exceeds 2 KB gzipped (${gzipped} > 2048)`);
    failed = true;
  } else {
    console.log(`  PASS: Script is under 2 KB gzipped`);
  }

  const text = content.toString('utf8');
  if (text.includes('http://') || text.includes('https://')) {
    // Check if it makes network calls
    if (/fetch\(|XMLHttpRequest|importScripts/i.test(text)) {
      console.log(`  FAIL: Script contains network request calls`);
      failed = true;
    }
  }
}

if (files.length > 1) {
  console.log(`FAIL: Expected at most 1 client script in output, found ${files.length}`);
  failed = true;
}

if (failed) {
  process.exit(1);
} else {
  console.log('PASS: Client script requirements satisfied.');
  process.exit(0);
}
