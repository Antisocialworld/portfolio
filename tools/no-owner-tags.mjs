/**
 * tools/no-owner-tags.mjs
 * Fails if any [OWNER: ...] tags remain in dist/*.html or README.md.
 * Per spec H8: the page is a draft until all such tags are gone.
 * (Expected to report remaining tags and exit 1 until owner fills them).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = existsSync('dist') ? 'dist' : 'site';
const htmlFiles = existsSync(distDir)
  ? readdirSync(distDir).filter(f => f.endsWith('.html')).map(f => join(distDir, f))
  : [];

const filesToCheck = [...htmlFiles];
if (existsSync('README.md')) {
  filesToCheck.push('README.md');
}

let totalFound = 0;

for (const file of filesToCheck) {
  const content = readFileSync(file, 'utf8');
  const matches = content.match(/\[OWNER:[^\]]*\]/g);
  if (matches && matches.length > 0) {
    console.log(`${file}: ${matches.length} OWNER tag(s):`);
    for (const m of matches) {
      console.log(`  ${m}`);
    }
    totalFound += matches.length;
  } else {
    console.log(`${file}: 0 OWNER tags`);
  }
}

console.log(`\nTotal: ${totalFound} OWNER tag(s) remaining.`);
if (totalFound > 0) {
  console.log('FAIL: Do not publish until all [OWNER: ...] tags are filled in.');
  process.exit(1);
} else {
  console.log('PASS: No OWNER tags remain.');
  process.exit(0);
}
