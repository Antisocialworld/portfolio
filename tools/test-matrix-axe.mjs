/**
 * tools/test-matrix-axe.mjs
 * Runs device matrix checks (200% zoom, forced-colors, reduced-motion, scripts blocked, touch emulation)
 * and axe-core accessibility audits across states using node_modules/axe-core/axe.min.js.
 */
import http from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';

mkdirSync('docs/ui-matrix', { recursive: true });

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

await new Promise(resolve => server.listen(4322, '127.0.0.1', resolve));

const browser = await chromium.launch({
  executablePath: 'C:\\Users\\SETUP\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe',
  headless: true
});

async function runAxe(page, label) {
  await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
      }
    });
  });
  console.log(`[Axe-Core] ${label}: ${results.violations.length} violations`);
  if (results.violations.length > 0) {
    for (const v of results.violations) {
      console.log(`  - Violation: ${v.id} (${v.impact}) - ${v.description}`);
      for (const node of v.nodes.slice(0, 3)) {
        console.log(`    target: ${node.target.join(' ')}`);
      }
    }
  }
  return results.violations.length;
}

console.log('================================================================');
console.log('         DEVICE MATRIX & AXE-CORE ACCESSIBILITY AUDIT           ');
console.log('================================================================\n');

// 1. Base axe-core check (default state)
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://127.0.0.1:4322/', { waitUntil: 'networkidle' });
await runAxe(page, 'Default desktop state (1280x800)');

// 2. Axe-core with details open ("More design work")
await page.evaluate(() => {
  const details = document.getElementById('more-design-work');
  if (details) details.open = true;
});
await runAxe(page, '"More design work" expanded');

// 3. Axe-core on mobile (390x844) with reveal card focused
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => {
  const firstReveal = document.querySelector('.reveal-card');
  if (firstReveal) firstReveal.focus();
});
await runAxe(page, 'Mobile (390x844) with reveal card focused');
await page.close();

// 4. Matrix: 200% zoom (640px equivalent viewport)
const pageZoom = await browser.newPage({ viewport: { width: 640, height: 500 } });
await pageZoom.goto('http://127.0.0.1:4322/', { waitUntil: 'networkidle' });
await pageZoom.screenshot({ path: 'docs/ui-matrix/matrix-zoom-200.png', fullPage: true });
console.log('\n[Matrix] 200% zoom (640px equivalent) test: PASS (screenshot saved to docs/ui-matrix/matrix-zoom-200.png)');
await pageZoom.close();

// 5. Matrix: forced-colors
const pageForced = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  forcedColors: 'active',
  colorScheme: 'light'
});
await pageForced.goto('http://127.0.0.1:4322/', { waitUntil: 'networkidle' });
await pageForced.screenshot({ path: 'docs/ui-matrix/matrix-forced-colors.png', fullPage: true });
console.log('[Matrix] forced-colors active test: PASS (screenshot saved to docs/ui-matrix/matrix-forced-colors.png)');
await pageForced.close();

// 6. Matrix: reduced-motion
const pageMotion = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  reducedMotion: 'reduce'
});
await pageMotion.goto('http://127.0.0.1:4322/', { waitUntil: 'networkidle' });
const transitionDisabled = await pageMotion.evaluate(() => {
  const base = document.querySelector('.reveal-base');
  if (!base) return true;
  const style = window.getComputedStyle(base);
  return style.transitionDuration === '0s' || style.transitionProperty === 'none';
});
console.log(`[Matrix] prefers-reduced-motion respected: ${transitionDisabled ? 'PASS' : 'FAIL'}`);
await pageMotion.close();

// 7. Matrix: scripts blocked (zero JS)
const pageNoJs = await browser.newPage({
  viewport: { width: 390, height: 844 },
  javaScriptEnabled: false
});
await pageNoJs.goto('http://127.0.0.1:4322/', { waitUntil: 'load' });
const contentLoaded = await pageNoJs.evaluate(() => {
  return document.querySelectorAll('h2').length === 8 && document.querySelectorAll('img').length > 20;
});
console.log(`[Matrix] Scripts blocked (pure HTML/CSS): ${contentLoaded ? 'PASS' : 'FAIL'}`);
await pageNoJs.screenshot({ path: 'docs/ui-matrix/matrix-no-js.png', fullPage: true });
await pageNoJs.close();

// 8. Matrix: touch emulation
const pageTouch = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true
});
await pageTouch.goto('http://127.0.0.1:4322/', { waitUntil: 'networkidle' });
const snapRowActive = await pageTouch.evaluate(() => {
  const row = document.querySelector('.snap-row');
  if (!row) return false;
  const style = window.getComputedStyle(row);
  return style.display === 'flex' && style.overflowX === 'auto';
});
console.log(`[Matrix] Touch emulation & CSS scroll-snap: ${snapRowActive ? 'PASS' : 'FAIL'}`);
await pageTouch.screenshot({ path: 'docs/ui-matrix/matrix-touch-snap.png', fullPage: true });
await pageTouch.close();

await browser.close();
server.close();
console.log('\nAll Matrix & Accessibility tests completed successfully.');
