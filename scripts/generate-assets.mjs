/**
 * Genereert favicons, app-iconen en de standaard Open Graph-afbeelding uit SVG.
 * Draai opnieuw na een wijziging van naam of kleur: `npm run assets`.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const out = (f) => new URL(`../public/${f}`, import.meta.url);
const icon = readFileSync(out('favicon.svg'));

for (const [file, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512], ['logo.png', 512]]) {
  await sharp(icon, { density: 600 }).resize(size, size).png().toFile(out(file).pathname.replace(/^\/(\w:)/, '$1'));
}

// favicon.ico (PNG-in-ICO, 32×32) — door alle browsers ondersteund.
const png32 = await sharp(icon, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(out('favicon.ico'), Buffer.concat([header, png32]));

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F7F8FA"/>
  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#E6E8EC"/>
  <g transform="translate(96 96)">
    <rect width="64" height="64" rx="18" fill="#3350E0"/>
    <path d="M18 25h18M18 36h12" stroke="#fff" stroke-width="5.2" stroke-linecap="round"/>
    <path d="m37 39 5.2 5.2 8.8-10.4" fill="none" stroke="#fff" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="84" y="45" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#0E1726">AllesBerekenen</text>
  </g>
  <text x="96" y="330" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="92" font-weight="700" fill="#0E1726" letter-spacing="-3">Bereken het. Direct.</text>
  <text x="96" y="400" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="34" fill="#3D4757">Gratis calculators voor geld, gezondheid, wonen en meer.</text>
  <g font-family="Segoe UI, Inter, Arial, sans-serif" font-size="26" font-weight="600" fill="#2338A8">
    <rect x="96" y="470" width="150" height="56" rx="28" fill="#EEF1FD"/><text x="171" y="507" text-anchor="middle">BTW</text>
    <rect x="262" y="470" width="150" height="56" rx="28" fill="#EEF1FD"/><text x="337" y="507" text-anchor="middle">BMI</text>
    <rect x="428" y="470" width="210" height="56" rx="28" fill="#EEF1FD"/><text x="533" y="507" text-anchor="middle">Bruto-netto</text>
    <rect x="654" y="470" width="190" height="56" rx="28" fill="#EEF1FD"/><text x="749" y="507" text-anchor="middle">Hypotheek</text>
    <rect x="860" y="470" width="130" height="56" rx="28" fill="#EEF1FD"/><text x="925" y="507" text-anchor="middle">m²</text>
  </g>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('og-default.png').pathname.replace(/^\/(\w:)/, '$1'));
console.log('Assets gegenereerd.');
