import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const publishItems = [
  'index.html',
  '404.html',
  'favicon.svg',
  'robots.txt',
  '.nojekyll',
  'assets',
  'models',
  'dishes',
  'textures',
];

function removePath(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function copyPath(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.cpSync(src, dest, { recursive: true });
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function main() {
  if (!fs.existsSync(dist)) {
    console.error('✗ dist/ not found — run npm run build first');
    process.exit(1);
  }

  for (const item of publishItems) {
    const src = path.join(dist, item);
    if (!fs.existsSync(src)) {
      console.warn(`⚠ skipping missing dist/${item}`);
      continue;
    }

    const dest = path.join(root, item);
    removePath(dest);
    copyPath(src, dest);
    console.log(`✓ published ${item}`);
  }

  console.log('\nPublished production build to repository root for GitHub Pages.');
}

main();
