// Moves a draft from /drafts into a category, then keeps each category's
// category.md capped at KEEP_COUNT posts by archiving the oldest overflow
// into archive_<category>/ + archive_<category>.md.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, unlinkSync, renameSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline/promises';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DRAFTS_DIR = join(ROOT, 'drafts');
const KEEP_COUNT = 6;
const DATE_RE = /<!--\s*date posted:\s*(\d{4}-\d{2}-\d{2})\s*-->/;

function findCategories() {
  const entries = readdirSync(ROOT, { withFileTypes: true });
  const dirNames = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name));
  return entries
    .filter((e) => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('archive_'))
    .map((e) => e.name.slice(0, -3))
    .filter((name) => dirNames.has(name))
    .sort();
}

function listMarkdown(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function pickFromList(rl, question, items, labelFn = (x) => x) {
  console.log(`\n${question}`);
  items.forEach((item, i) => console.log(`  ${i + 1}. ${labelFn(item)}`));
  while (true) {
    const answer = (await rl.question('> ')).trim();
    const idx = Number(answer);
    if (Number.isInteger(idx) && idx >= 1 && idx <= items.length) return items[idx - 1];
    const exact = items.find((item) => labelFn(item) === answer);
    if (exact) return exact;
    console.log(`Please enter a number 1-${items.length}.`);
  }
}

async function askDate(rl, defaultDate) {
  while (true) {
    const answer = (await rl.question(`Date posted [${defaultDate}]: `)).trim();
    if (!answer) return defaultDate;
    if (/^\d{4}-\d{2}-\d{2}$/.test(answer)) return answer;
    console.log('Please use YYYY-MM-DD format.');
  }
}

function ensureDatePosted(content, date) {
  if (DATE_RE.test(content)) return content;
  const lines = content.split('\n');
  const headingIdx = lines.findIndex((l) => l.trim().startsWith('# '));
  if (headingIdx === -1) {
    throw new Error('Could not find a "# " heading line to anchor the date posted comment.');
  }
  lines.splice(headingIdx, 0, `<!-- date posted: ${date} -->`);
  return lines.join('\n');
}

function datePostedOf(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const match = content.match(DATE_RE);
  if (!match) throw new Error(`${filePath} is missing a "<!-- date posted: YYYY-MM-DD -->" comment.`);
  return match[1];
}

function sortByDateDesc(dir, files) {
  return files
    .map((f) => ({ f, date: datePostedOf(join(dir, f)) }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map((x) => x.f);
}

function buildIncludeLine(prefix, files) {
  const paths = files.map((f) => `${prefix}/${f}`).join(', ');
  return `<!-- include: ${paths}, sort: "date posted:", sort_dir: desc -->`;
}

function replaceIncludeLine(content, newLine) {
  const includeRe = /<!--\s*include:[\s\S]*?-->/;
  if (!includeRe.test(content)) throw new Error('No <!-- include: ... --> line found to update.');
  return content.replace(includeRe, newLine);
}

function regenerateCategoryFile(category) {
  const dir = join(ROOT, category);
  const files = sortByDateDesc(dir, listMarkdown(dir));
  const mdPath = join(ROOT, `${category}.md`);
  const content = readFileSync(mdPath, 'utf8');
  const updated = replaceIncludeLine(content, buildIncludeLine(category, files));
  writeFileSync(mdPath, updated);
}

function regenerateArchiveFile(category) {
  const archiveDir = join(ROOT, `archive_${category}`);
  const archiveMdPath = join(ROOT, `archive_${category}.md`);
  const files = sortByDateDesc(archiveDir, listMarkdown(archiveDir));
  const includeLine = buildIncludeLine(`archive_${category}`, files);

  if (!existsSync(archiveMdPath)) {
    const template = [
      '<!-- Blog of Nathan Hoffman -->',
      '<!-- [Blog of Nathan Hoffman](main.md) -->',
      '<!-- themes: glacier -->',
      '',
      `# **${titleCase(category)} Archive**`,
      '',
      includeLine,
      '',
    ].join('\n');
    writeFileSync(archiveMdPath, template);
  } else {
    const content = readFileSync(archiveMdPath, 'utf8');
    writeFileSync(archiveMdPath, replaceIncludeLine(content, includeLine));
  }

  const categoryMdPath = join(ROOT, `${category}.md`);
  const categoryContent = readFileSync(categoryMdPath, 'utf8');
  const archiveLinkRe = new RegExp(`archive_${category}\\.md`);
  if (!archiveLinkRe.test(categoryContent)) {
    const footer = `\n---\n\n[See Older Posts](archive_${category}.md)\n`;
    writeFileSync(categoryMdPath, categoryContent.replace(/\n*$/, '') + '\n' + footer);
  }
}

async function main() {
  const drafts = listMarkdown(DRAFTS_DIR);
  if (drafts.length === 0) {
    console.log('No drafts found in /drafts.');
    return;
  }

  const categories = findCategories();
  if (categories.length === 0) {
    throw new Error('No category .md files with matching directories found.');
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const draft = await pickFromList(rl, 'Which draft do you want to publish?', drafts);
    const category = await pickFromList(rl, 'Which category does it belong to?', categories);

    const draftPath = join(DRAFTS_DIR, draft);
    let content = readFileSync(draftPath, 'utf8');

    const existingDate = content.match(DATE_RE)?.[1];
    const date = existingDate ?? (await askDate(rl, todayISO()));
    content = ensureDatePosted(content, date);

    const destDir = join(ROOT, category);
    const destPath = join(destDir, draft);
    if (existsSync(destPath)) {
      throw new Error(`${category}/${draft} already exists. Aborting.`);
    }

    writeFileSync(destPath, content);
    unlinkSync(draftPath);
    console.log(`\nMoved drafts/${draft} -> ${category}/${draft} (date posted: ${date})`);

    const files = sortByDateDesc(destDir, listMarkdown(destDir));
    const keep = files.slice(0, KEEP_COUNT);
    const overflow = files.slice(KEEP_COUNT);

    if (overflow.length > 0) {
      const archiveDir = join(ROOT, `archive_${category}`);
      if (!existsSync(archiveDir)) mkdirSync(archiveDir);
      for (const f of overflow) {
        renameSync(join(destDir, f), join(archiveDir, f));
        console.log(`Archived ${category}/${f} -> archive_${category}/${f}`);
      }
      regenerateArchiveFile(category);
    }

    regenerateCategoryFile(category);
    console.log(`\nUpdated ${category}.md${overflow.length ? ` and archive_${category}.md` : ''}.`);
    console.log('Nothing has been committed — review with `git status` / `git diff` and commit when ready.');
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
