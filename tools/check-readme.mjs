/**
 * tools/check-readme.mjs
 * Validates README.md per spec J26:
 * - Checks existence
 * - Checks presence and order of all 18 required headings
 * - Asserts no literal "[OWNER:" text
 * - Asserts every documented command matches package.json scripts
 */
import { readFileSync, existsSync } from 'node:fs';

const requiredHeadings = [
  'Title and one-line description',
  'Live site',
  'What this is',
  'Stack and why',
  'Requirements',
  'Quick start',
  'Commands table',
  'Project structure',
  'How to edit content',
  'Design system',
  'Accessibility',
  'Performance',
  'SEO and sharing',
  'Quality checks',
  'Deploy on Vercel',
  'Assets and licences',
  'Known gaps',
  'Credits'
];

if (!existsSync('README.md')) {
  console.error('FAIL: README.md does not exist.');
  process.exit(1);
}

const content = readFileSync('README.md', 'utf8');
const lines = content.split('\n');
let errors = 0;

console.log('=== Checking README.md ===\n');

// Line count check (< 250 lines)
console.log(`Line count: ${lines.length} lines`);
if (lines.length > 250) {
  console.log(`FAIL: README.md exceeds 250 lines (${lines.length} > 250)`);
  errors++;
} else {
  console.log('PASS: Under 250 lines.');
}

// Check for literal "[OWNER:"
if (content.includes('[OWNER:')) {
  console.log('FAIL: README.md contains literal "[OWNER:" text.');
  errors++;
} else {
  console.log('PASS: No literal "[OWNER:" text found.');
}

// Check headings
let lastIndex = -1;
for (const heading of requiredHeadings) {
  // Look for markdown heading matching the title
  const regex = new RegExp(`^#+\\s+.*${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'im');
  const match = content.match(regex);
  if (!match) {
    console.log(`FAIL: Missing required heading: "${heading}"`);
    errors++;
  } else {
    const idx = content.indexOf(match[0]);
    if (idx < lastIndex) {
      console.log(`FAIL: Heading "${heading}" is out of order.`);
      errors++;
    } else {
      console.log(`PASS: Found heading: "${heading}"`);
      lastIndex = idx;
    }
  }
}

// Check commands against package.json scripts
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const validScripts = Object.keys(pkg.scripts || {});
const commandMatches = content.match(/npm run ([a-zA-Z0-9:-]+)/g) || [];
const checkedCommands = new Set();

for (const cmd of commandMatches) {
  const scriptName = cmd.replace('npm run ', '').trim();
  checkedCommands.add(scriptName);
  if (!validScripts.includes(scriptName)) {
    console.log(`FAIL: README mentions "npm run ${scriptName}" which is not in package.json scripts.`);
    errors++;
  }
}
console.log(`PASS: Verified ${checkedCommands.size} npm run command(s) against package.json scripts.`);

console.log(`\n=== Total Errors: ${errors} ===`);
process.exit(errors > 0 ? 1 : 0);
