import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const photosDir = path.join(root, 'photos');
const outDir = path.join(root, 'public', 'menu');
const manifestPath = path.join(root, 'src', 'data', 'menu-photos.json');

const SOURCE_EXT = /\.(heic|jpg|jpeg|png|webp)$/i;
const TRY_ORDER = ['.heic', '.jpg', '.jpeg', '.png', '.webp'];

function uniqueBasenames(files) {
  const bases = new Set();
  for (const file of files) {
    if (!SOURCE_EXT.test(file)) continue;
    bases.add(path.basename(file, path.extname(file)).toLowerCase());
  }
  return [...bases].sort();
}

function candidatesForBase(baseName, files) {
  return files
    .filter((file) => {
      if (!SOURCE_EXT.test(file)) return false;
      return path.basename(file, path.extname(file)).toLowerCase() === baseName;
    })
    .sort(
      (a, b) =>
        TRY_ORDER.indexOf(path.extname(a).toLowerCase()) -
        TRY_ORDER.indexOf(path.extname(b).toLowerCase())
    );
}

async function convertWithSharp(inputPath, outputPath) {
  await sharp(inputPath, { failOn: 'none' })
    .rotate()
    .resize(1400, 1400, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);
}

function convertHeicWithSips(inputPath, tempJpg) {
  execSync(`sips -s format jpeg "${inputPath}" --out "${tempJpg}"`, {
    stdio: 'pipe',
  });
}

async function convertFile(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();

  if (ext === '.heic') {
    const tempJpg = path.join(outDir, `.tmp-${path.basename(inputPath, ext)}.jpg`);
    try {
      await convertWithSharp(inputPath, outputPath);
      return;
    } catch {
      /* sharp HEIC decode unavailable — try macOS sips */
    }

    try {
      convertHeicWithSips(inputPath, tempJpg);
      await convertWithSharp(tempJpg, outputPath);
      return;
    } finally {
      if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);
    }
  }

  await convertWithSharp(inputPath, outputPath);
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });

  if (!fs.existsSync(photosDir)) {
    console.warn('photos/ directory not found — writing empty manifest');
    fs.writeFileSync(manifestPath, JSON.stringify({ photos: [] }, null, 2));
    return;
  }

  const allFiles = fs.readdirSync(photosDir);
  const bases = uniqueBasenames(allFiles);
  const converted = [];
  let failures = 0;

  for (const baseName of bases) {
    const candidates = candidatesForBase(baseName, allFiles);
    const outputName = `${candidates[0] ? path.basename(candidates[0], path.extname(candidates[0])) : baseName}.webp`;
    const outputPath = path.join(outDir, outputName);
    let success = false;

    for (const file of candidates) {
      const inputPath = path.join(photosDir, file);
      try {
        await convertFile(inputPath, outputPath);
        converted.push(`/menu/${outputName}`);
        console.log(`✓ ${file} → public/menu/${outputName}`);
        success = true;
        break;
      } catch (err) {
        console.warn(`  ↳ ${file}: ${err.message}`);
      }
    }

    if (!success) {
      failures += 1;
      console.warn(`✗ Could not convert any source for "${baseName}"`);
    }
  }

  converted.sort();
  fs.writeFileSync(manifestPath, JSON.stringify({ photos: converted }, null, 2));

  console.log(`\nDone: ${converted.length} photo(s) in public/menu/`);

  if (failures > 0) {
    console.warn(`${failures} item(s) failed — menu cards will show fallbacks.`);
  }
}

main().catch((err) => {
  console.error('Photo conversion failed:', err);
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify({ photos: [] }, null, 2));
  process.exit(0);
});
