// Injects site-wide metadata (title, description, Open Graph/Twitter tags,
// favicon) into index.html's <head>. index.html is a runtime file overwritten
// by `npm run update`, so this reads from site.json (which update.js never
// touches) and re-applies the tags. Run as part of the build step on deploy.
import { readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(dirname(fileURLToPath(import.meta.url)));
const START = '<!-- site-meta:start -->';
const END = '<!-- site-meta:end -->';

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function buildBlock(site) {
  const lines = [START];
  if (site.title) lines.push(`  <meta property="og:title" content="${escapeAttr(site.title)}">`);
  if (site.description) {
    lines.push(`  <meta name="description" content="${escapeAttr(site.description)}">`);
    lines.push(`  <meta property="og:description" content="${escapeAttr(site.description)}">`);
    lines.push(`  <meta name="twitter:description" content="${escapeAttr(site.description)}">`);
  }
  if (site.url) {
    lines.push(`  <link rel="canonical" href="${escapeAttr(site.url)}">`);
    lines.push(`  <meta property="og:url" content="${escapeAttr(site.url)}">`);
  }
  lines.push('  <meta property="og:type" content="website">');
  if (site.title) lines.push(`  <meta name="twitter:title" content="${escapeAttr(site.title)}">`);
  lines.push(`  <meta name="twitter:card" content="${site.image ? 'summary_large_image' : 'summary'}">`);
  if (site.image) {
    lines.push(`  <meta property="og:image" content="${escapeAttr(site.image)}">`);
    lines.push(`  <meta name="twitter:image" content="${escapeAttr(site.image)}">`);
  }
  if (site.favicon) lines.push(`  <link rel="icon" href="${escapeAttr(site.favicon)}">`);
  lines.push(END);
  return lines.join('\n');
}

async function run() {
  const site = JSON.parse(await readFile(join(dir, 'site.json'), 'utf8'));
  let html = await readFile(join(dir, 'index.html'), 'utf8');

  if (site.title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(site.title)}</title>`);
  }

  const block = buildBlock(site);
  const markerRe = new RegExp(`${START}[\\s\\S]*?${END}`);
  if (markerRe.test(html)) {
    html = html.replace(markerRe, block);
  } else {
    html = html.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      `<meta name="viewport" content="width=device-width, initial-scale=1">\n${block}`
    );
  }

  await writeFile(join(dir, 'index.html'), html);
  console.log('site-meta: injected into index.html');
}

run().catch((err) => {
  console.error('site-meta injection failed:', err.message);
  process.exit(1);
});
