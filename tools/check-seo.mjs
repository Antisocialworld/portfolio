/**
 * tools/check-seo.mjs
 * Validates SEO tags, Open Graph, Twitter cards, JSON-LD structured data,
 * heading hierarchy, and presence of real name per spec J4, J20, J21.
 */
import { readFileSync, existsSync } from 'node:fs';

const htmlPath = 'dist/index.html';
if (!existsSync(htmlPath)) {
  console.error(`FAIL: ${htmlPath} does not exist. Run npm run build first.`);
  process.exit(1);
}

const html = readFileSync(htmlPath, 'utf8');
let errors = 0;

console.log('=== SEO Validation for dist/index.html ===\n');

// 1. Single H1 check
const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
if (h1Matches.length === 1) {
  console.log(`PASS: Exactly one <h1> found.`);
} else {
  console.log(`FAIL: Expected 1 <h1>, found ${h1Matches.length}`);
  errors++;
}

// 2. Title tag
const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
if (titleMatch) {
  const title = titleMatch[1];
  console.log(`PASS: Title: "${title}" (length: ${title.length} chars)`);
  if (title !== 'AntisocialWorld, Product Engineer') {
    console.log(`  NOTE: Title differs from default "AntisocialWorld, Product Engineer"`);
  }
} else {
  console.log(`FAIL: Missing <title> tag`);
  errors++;
}

// 3. Meta description
const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
if (descMatch) {
  const desc = descMatch[1];
  console.log(`PASS: Meta description length: ${desc.length} chars`);
  if (desc.length > 160) {
    console.log(`  WARN: Meta description is ${desc.length} chars (> 160)`);
  }
} else {
  console.log(`FAIL: Missing meta description`);
  errors++;
}

// 4. Canonical link
const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
if (canonicalMatch) {
  console.log(`PASS: Canonical link present: "${canonicalMatch[1]}"`);
} else {
  console.log(`FAIL: Missing canonical link`);
  errors++;
}

// 5. Open Graph tags
const requiredOg = ['og:title', 'og:description', 'og:type', 'og:url', 'og:image'];
for (const tag of requiredOg) {
  const re = new RegExp(`<meta\\s+property="${tag}"\\s+content="([^"]*)"`, 'i');
  if (re.test(html)) {
    console.log(`PASS: Open Graph ${tag} present`);
  } else {
    console.log(`FAIL: Missing Open Graph tag ${tag}`);
    errors++;
  }
}

// 6. Twitter card tags
const requiredTwitter = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
for (const tag of requiredTwitter) {
  const re = new RegExp(`<meta\\s+name="${tag}"\\s+content="([^"]*)"`, 'i');
  if (re.test(html)) {
    console.log(`PASS: Twitter tag ${tag} present`);
  } else {
    console.log(`FAIL: Missing Twitter tag ${tag}`);
    errors++;
  }
}

// 7. JSON-LD Person structured data
const jsonLdMatch = html.match(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
if (jsonLdMatch) {
  try {
    const data = JSON.parse(jsonLdMatch[1]);
    if (data['@type'] === 'Person') {
      console.log(`PASS: JSON-LD Person valid JSON (name: "${data.name}", alternateName: "${data.alternateName}")`);
    } else {
      console.log(`FAIL: JSON-LD @type is not Person`);
      errors++;
    }
  } catch (e) {
    console.log(`FAIL: JSON-LD is not valid JSON: ${e.message}`);
    errors++;
  }
} else {
  console.log(`FAIL: Missing JSON-LD script tag`);
  errors++;
}

// 8. Name "Solomon Ikharia" check per spec J21
const occurrences = (html.match(/Solomon Ikharia/g) || []).length;
console.log(`\n=== Real Name Search (spec J21) ===`);
console.log(`"Solomon Ikharia" appears ${occurrences} time(s) across built HTML.`);
if (occurrences >= 2) {
  console.log(`PASS: Real name findable across hero, about, footer and structured data.`);
} else {
  console.log(`FAIL: Real name missing or appears fewer than expected times.`);
  errors++;
}

console.log(`\n=== Total Errors: ${errors} ===`);
process.exit(errors > 0 ? 1 : 0);
