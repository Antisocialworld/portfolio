/**
 * tools/extract-frozen.mjs
 * Reads reference/artifact-index.html and prints the FROZEN case-study text blocks.
 * Then reads site/index.html, extracts the same blocks, and diffs them.
 */
import { readFileSync } from 'node:fs';

function extractCaseStudyText(html) {
  // Extract text content from the three case study articles in section#work
  const workSectionMatch = html.match(/<section id="work"[\s\S]*?<\/section>/);
  if (!workSectionMatch) return '';

  const articles = workSectionMatch[0].match(/<article class="case"[\s\S]*?<\/article>/g) || [];
  let combined = articles.join(' ');

  // Strip HTML tags, normalise whitespace
  let text = combined
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&times;/g, 'x')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

const refHtml = readFileSync('reference/artifact-index.html', 'utf8');
const siteHtml = readFileSync('dist/index.html', 'utf8');

const refText = extractCaseStudyText(refHtml);
const siteText = extractCaseStudyText(siteHtml);

console.log('=== Reference text length:', refText.length);
console.log('=== Site text length:', siteText.length);
console.log();

if (refText === siteText) {
  console.log('PASS: FROZEN case-study text is identical.');
} else {
  console.log('DIFF FOUND:');
  // Find first difference
  for (let i = 0; i < Math.max(refText.length, siteText.length); i++) {
    if (refText[i] !== siteText[i]) {
      const start = Math.max(0, i - 40);
      const end = Math.min(Math.max(refText.length, siteText.length), i + 40);
      console.log(`First difference at position ${i}:`);
      console.log(`  REF:  ...${refText.slice(start, end)}...`);
      console.log(`  SITE: ...${siteText.slice(start, end)}...`);
      console.log(`  REF char:  '${refText[i]}' (${refText.charCodeAt(i)})`);
      console.log(`  SITE char: '${siteText[i]}' (${siteText.charCodeAt(i) || 'EOF'})`);
      break;
    }
  }
}
