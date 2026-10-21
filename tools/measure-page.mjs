/**
 * tools/measure-page.mjs
 * Measures length, section heights, word counts, and captures full screenshots per task requirements.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';

mkdirSync('docs/ui-matrix', { recursive: true });

// 1. Static file server for dist/
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = join('dist', urlPath);

  if (existsSync(filePath) && !statSync(filePath).isDirectory()) {
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise(resolve => server.listen(4321, '127.0.0.1', resolve));

const browser = await chromium.launch({
  executablePath: 'C:\\Users\\SETUP\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe',
  headless: true
});

const viewports = [
  { width: 390, height: 844, name: 'mobile' },
  { width: 1280, height: 800, name: 'desktop' }
];

const results = {};

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });

  // Document total height
  const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const screens = (docHeight / vp.height).toFixed(2);

  // Section heights and offsets
  const sections = await page.evaluate(() => {
    const ids = ['hero', 'work', 'rowta', 'different', 'design', 'opensource', 'about', 'off-the-clock', 'contact'];
    const data = [];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        data.push({
          id,
          top: Math.round(top),
          height: Math.round(rect.height)
        });
      }
    }
    const footer = document.querySelector('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      data.push({
        id: 'footer',
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height)
      });
    }
    return data;
  });

  // Screenshot
  const shotPath = `docs/ui-matrix/chromium-${vp.width}x${vp.height}.png`;
  await page.screenshot({ path: shotPath, fullPage: true });

  results[`${vp.width}x${vp.height}`] = {
    docHeight,
    screens,
    sections,
    shotPath
  };

  await page.close();
}

// Check navigation after hero and Back to top links in built HTML
const html = readFileSync('dist/index.html', 'utf8');

// Nav check
const heroIdx = html.indexOf('id="hero"');
const navIdx = html.indexOf('<nav');
const workIdx = html.indexOf('id="work"');
const navAfterHero = (heroIdx < navIdx && navIdx < workIdx);

// Back to top links check
const sectionIds = ['work', 'rowta', 'different', 'design', 'opensource', 'about', 'off-the-clock', 'contact'];
const backToTopPerSection = {};
for (const id of sectionIds) {
  const secRegex = new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`, 'i');
  const secMatch = html.match(secRegex);
  if (secMatch) {
    backToTopPerSection[id] = secMatch[0].includes('href="#hero"') && secMatch[0].includes('Back to top');
  } else {
    backToTopPerSection[id] = false;
  }
}

// Word counts per section (visible text only)
function getVisibleText(htmlSnippet) {
  return htmlSnippet
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8226;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const wordCounts = {};
let totalWords = 0;

for (const id of ['hero', ...sectionIds, 'footer']) {
  let snippet = '';
  if (id === 'hero') {
    const m = html.match(/<header id="hero"[\s\S]*?<\/header>/i);
    snippet = m ? m[0] : '';
  } else if (id === 'footer') {
    const m = html.match(/<footer[\s\S]*?<\/footer>/i);
    snippet = m ? m[0] : '';
  } else {
    const m = html.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?<\\/section>`, 'i'));
    snippet = m ? m[0] : '';
  }

  const text = getVisibleText(snippet);
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  wordCounts[id] = words;
  totalWords += words;
}

await browser.close();
server.close();

// Print Report
console.log('================================================================');
console.log('           LENGTH AUDIT REPORT (Playwright Chromium)            ');
console.log('================================================================\n');

for (const key of ['390x844', '1280x800']) {
  const r = results[key];
  console.log(`=== Viewport ${key} ===`);
  console.log(`Document full height : ${r.docHeight} px`);
  console.log(`Screen count         : ${r.screens} screens`);
  console.log(`Screenshot saved to  : ${r.shotPath}`);
  console.log('Section breakdown:');
  for (const s of r.sections) {
    console.log(`  - ${s.id.padEnd(14)} : top ${String(s.top).padStart(5)} px | height ${String(s.height).padStart(5)} px`);
  }
  console.log();
}

console.log('=== Sections starting below first 3 screens at 390x844 ===');
const threshold390 = 3 * 844; // 2532 px
console.log(`Threshold (3 screens * 844px) = ${threshold390} px`);
for (const s of results['390x844'].sections) {
  if (s.top > threshold390) {
    console.log(`  - Starts below screen 3: #${s.id} (top: ${s.top} px, screen ${(s.top / 844).toFixed(1)})`);
  }
}

console.log('\n=== Word Count (Visible Text Only) ===');
for (const [id, count] of Object.entries(wordCounts)) {
  console.log(`  - ${id.padEnd(14)} : ${count} words`);
}
console.log(`  TOTAL WORDS    : ${totalWords} words\n`);

console.log('=== Nav and Back to Top Verification ===');
console.log(`  Nav immediately follows hero in DOM : ${navAfterHero ? 'PASS' : 'FAIL'}`);
let allBackToTop = true;
for (const [id, ok] of Object.entries(backToTopPerSection)) {
  console.log(`  Section #${id.padEnd(13)} has "Back to top" : ${ok ? 'PASS' : 'FAIL'}`);
  if (!ok) allBackToTop = false;
}
console.log(`  Overall Back to top verification    : ${allBackToTop ? 'PASS' : 'FAIL'}`);
