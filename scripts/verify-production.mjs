import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const required = [
  'index.html',
  'favicon.svg',
  'models/santa-muerte-skull.glb',
  'models/candles.glb',
  'dishes',
];

function exists(relPath) {
  return fs.existsSync(path.join(dist, relPath));
}

function main() {
  if (!fs.existsSync(dist)) {
    console.error('✗ dist/ not found — run npm run build first');
    process.exit(1);
  }

  const missing = required.filter((item) => !exists(item));

  if (missing.length > 0) {
    console.error('✗ Production build verification failed. Missing:');
    missing.forEach((item) => console.error(`  - dist/${item}`));
    process.exit(1);
  }

  const dishesDir = path.join(dist, 'dishes');
  const dishFiles = fs.readdirSync(dishesDir).filter((f) => f.endsWith('.webp'));

  if (dishFiles.length === 0) {
    console.warn('⚠ No dish photos in dist/dishes/ — food cards will use fallbacks');
  }

  const indexHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

  if (indexHtml.includes('/src/main.tsx')) {
    console.error('✗ dist/index.html is a dev entry — production build did not run');
    process.exit(1);
  }

  if (!indexHtml.includes('/assets/') && !indexHtml.includes('./assets/')) {
    console.error('✗ dist/index.html does not reference bundled assets');
    process.exit(1);
  }

  if (!fs.existsSync(path.join(dist, '404.html'))) {
    fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
    console.log('✓ created dist/404.html for GitHub Pages SPA routing');
  }

  const distSize = getDirSize(dist);
  console.log(`✓ Production build verified (${formatBytes(distSize)})`);
  console.log(`  - ${dishFiles.length} dish photo(s)`);
  console.log(`  - 3D models present`);
}

function getDirSize(dir) {
  let size = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) size += getDirSize(full);
    else size += fs.statSync(full).size;
  }
  return size;
}

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

main();
