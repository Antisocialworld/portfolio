/**
 * tools/check-links.mjs
 * Checks local anchor links and file references in site/index.html.
 * Lists external links (does not fetch them).
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const html = readFileSync('dist/index.html', 'utf8');
const siteDir = 'dist';

// Extract all href and src values
const linkPattern = /(?:href|src)="([^"]+)"/g;
let match;
const localAnchors = [];
const localFiles = [];
const externalLinks = [];
let errors = 0;

while ((match = linkPattern.exec(html)) !== null) {
  const val = match[1];
  if (val.startsWith('#')) {
    localAnchors.push(val);
  } else if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('mailto:')) {
    externalLinks.push(val);
  } else if (!val.startsWith('data:') && !val.startsWith('{') && !val.startsWith('[OWNER:')) {
    localFiles.push(val);
  }
}

// Check anchors
const idPattern = /id="([^"]+)"/g;
const ids = new Set();
while ((match = idPattern.exec(html)) !== null) {
  ids.add(match[1]);
}

console.log('=== Anchor links ===');
for (const anchor of localAnchors) {
  const id = anchor.slice(1);
  if (ids.has(id)) {
    console.log(`  OK: ${anchor}`);
  } else {
    console.log(`  FAIL: ${anchor} — no element with id="${id}"`);
    errors++;
  }
}

console.log('\n=== Local file references ===');
for (const file of localFiles) {
  const fullPath = join(siteDir, file);
  if (existsSync(fullPath)) {
    console.log(`  OK: ${file}`);
  } else {
    console.log(`  FAIL: ${file} — file not found at ${fullPath}`);
    errors++;
  }
}

console.log('\n=== External links (not fetched) ===');
for (const link of externalLinks) {
  console.log(`  ${link}`);
}

console.log(`\n=== Result: ${errors} error(s) ===`);
process.exit(errors > 0 ? 1 : 0);
