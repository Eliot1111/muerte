import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const dirs = {
  models: path.join(root, 'public', 'models'),
  hdr: path.join(root, 'public', 'hdr'),
  metal: path.join(root, 'public', 'textures', 'metal'),
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ ${path.basename(dest)}`);
  }
}

function extractZip(zipPath, filePattern, destDir, rename) {
  if (!fs.existsSync(zipPath)) return;
  ensureDir(destDir);
  execSync(`unzip -o -j "${zipPath}" "${filePattern}" -d "${destDir}"`, { stdio: 'pipe' });
  if (rename) {
    const extracted = path.join(destDir, path.basename(filePattern.replace('*', '')));
    const alt = path.join(destDir, filePattern.split('/').pop());
    const src = [extracted, alt, path.join(destDir, 'model.glb')].find(fs.existsSync);
    if (src && rename) {
      fs.renameSync(src, path.join(destDir, rename));
    }
  }
}

ensureDir(dirs.models);
ensureDir(dirs.hdr);
ensureDir(dirs.metal);

// Skull model
extractZip(
  path.join(root, 'asset-sources', 'models', 'black-mexican-skull-with-flower-pattern.zip'),
  'source/model.glb',
  dirs.models,
  'santa-muerte-skull.glb'
);

// Optional models — copy if user adds them to models/
const optionalModels = [
  'mezcal-bottle.glb',
  'agave.glb',
  'taco.glb',
  'lime.glb',
  'chili.glb',
  'mexican-ornament.glb',
  'santa-muerte-skull.glb',
];

for (const name of optionalModels) {
  copyIfExists(path.join(root, 'asset-sources', 'models', name), path.join(dirs.models, name));
}

// HDR — skip by default (22MB, unused). Set INCLUDE_HDR=1 to copy.
const hdrFile = path.join(dirs.hdr, 'studio-dark.exr');
if (process.env.INCLUDE_HDR === '1') {
  copyIfExists(
    path.join(root, 'shaders', 'studio_country_hall_4k.exr'),
    hdrFile
  );
} else if (fs.existsSync(hdrFile)) {
  fs.unlinkSync(hdrFile);
  console.log('✓ removed unused HDR from public/ (saves ~22MB in deploy)');
}

// Metal textures
const metalZip = path.join(root, 'asset-sources', 'textures', 'Metal042B_1K-JPG.zip');
if (fs.existsSync(metalZip)) {
  execSync(`unzip -o -j "${metalZip}" "*.jpg" -d "${dirs.metal}"`, { stdio: 'pipe' });
  console.log('✓ metal PBR textures');
}

console.log('Assets prepared in public/');
