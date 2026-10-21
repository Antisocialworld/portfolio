/**
 * tools/contrast-check.mjs
 * Recomputes WCAG 2.x contrast ratios for the locked palette pairs (spec B9).
 */

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2), 16), parseInt(h.slice(2,4), 16), parseInt(h.slice(4,6), 16)];
}

function relativeLuminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const pairs = [
  { fg: '#1B1B18', bg: '#F9F7EB', label: 'ink on paper' },
  { fg: '#5A584E', bg: '#F9F7EB', label: 'muted on paper' },
  { fg: '#1F4D17', bg: '#F9F7EB', label: 'link on paper' },
  { fg: '#1B1B18', bg: '#FFD60A', label: 'ink on danfo' },
  { fg: '#5A584E', bg: '#ECE8D3', label: 'muted on soft' },
];

console.log('=== Contrast ratios (WCAG 2.x) ===');
for (const { fg, bg, label } of pairs) {
  const ratio = contrastRatio(fg, bg);
  const pass = ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA-large' : 'FAIL';
  console.log(`  ${label}: ${ratio.toFixed(2)}:1 (${pass})`);
}
