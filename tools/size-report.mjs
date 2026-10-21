/**
 * tools/size-report.mjs
 * Measures and reports file sizes across dist/ directory.
 */
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
if (!existsSync(dist)) {
  console.error('dist does not exist');
  process.exit(1);
}

let totalBytes = 0;
const list = [];

function walk(dir, rel = '') {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const r = join(rel, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      walk(full, r);
    } else {
      totalBytes += s.size;
      list.push({ path: r, size: s.size });
    }
  }
}

walk(dist);

list.sort((a, b) => b.size - a.size);

console.log('=== Size Report for dist/ ===\n');
for (const item of list) {
  const kb = (item.size / 1024).toFixed(1);
  console.log(`  ${item.path.padEnd(45)} ${kb.padStart(8)} KB (${item.size} B)`);
}

console.log(`\nTotal files: ${list.length}`);
console.log(`Total dist weight: ${(totalBytes / 1024).toFixed(1)} KB (${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
