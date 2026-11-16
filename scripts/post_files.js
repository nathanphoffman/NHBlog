// Helpers shared by add-post.js and unpublish-post.js: where things live, plus the
// category/archive include-line bookkeeping.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
export const DRAFTS_DIR = join(ROOT, "drafts");
export const KEEP_COUNT = 6;
export const DATE_RE = /<!--\s*date posted:\s*(\d{4}-\d{2}-\d{2})\s*-->/;

export function findCategories() {
  const entries = readdirSync(ROOT, { withFileTypes: true });
  const dirNames = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name));

  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md") && !e.name.startsWith("archive_"))
    .map((e) => e.name.slice(0, -3))
    .filter((name) => dirNames.has(name))
    .sort();
}

export function listMarkdown(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

export function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function pickFromList(rl, question, items, labelFn = (x) => x) {
  console.log(`\n${question}`);
  items.forEach((item, i) => console.log(`  ${i + 1}. ${labelFn(item)}`));

  while (true) {
    const answer = (await rl.question("> ")).trim();
    const idx = Number(answer);

    if (Number.isInteger(idx) && idx >= 1 && idx <= items.length) return items[idx - 1];
    const exact = items.find((item) => labelFn(item) === answer);

    if (exact) return exact;
    console.log(`Please enter a number 1-${items.length}.`);
  }
}

export function datePostedOf(filePath) {
  const content = readFileSync(filePath, "utf8");

  const match = content.match(DATE_RE);

  if (!match) throw new Error(`${filePath} is missing a "<!-- date posted: YYYY-MM-DD -->" comment.`);

  return match[1];
}

export function sortByDateDesc(dir, files) {
  return files
    .map((f) => ({ f, date: datePostedOf(join(dir, f)) }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map((x) => x.f);
}

export function buildIncludeLine(prefix, files) {
  const paths = files.map((f) => `${prefix}/${f}`).join(", ");

  return `<!-- include: ${paths}, sort: "date posted:", sort_dir: desc -->`;
}

export function replaceIncludeLine(content, newLine) {
  const includeRe = /<!--\s*include:[\s\S]*?-->/;

  if (!includeRe.test(content)) throw new Error("No <!-- include: ... --> line found to update.");

  return content.replace(includeRe, newLine);
}

// Every post stays in <category>/ forever so its URL never changes. Only the include
// lists move: <category>.md shows the newest KEEP_COUNT posts, archive_<category>.md the rest.
function splitNewestFromOlder(category) {
  const dir = join(ROOT, category);
  const files = sortByDateDesc(dir, listMarkdown(dir));

  return { newest: files.slice(0, KEEP_COUNT), older: files.slice(KEEP_COUNT) };
}

export function regenerateCategoryFile(category) {
  const mdPath = join(ROOT, `${category}.md`);
  const content = readFileSync(mdPath, "utf8");
  const { newest } = splitNewestFromOlder(category);

  writeFileSync(mdPath, replaceIncludeLine(content, buildIncludeLine(category, newest)));
}

function archiveTemplate(category, includeLine) {
  return [
    "<!-- Blog of Nathan Hoffman -->",
    "<!-- [Blog of Nathan Hoffman](main.md) -->",
    "<!-- themes: glacier -->",
    "",
    `# **${titleCase(category)} Archive**`,
    "",
    includeLine,
    "",
  ].join("\n");
}

function ensureArchiveLink(category) {
  const categoryMdPath = join(ROOT, `${category}.md`);
  const content = readFileSync(categoryMdPath, "utf8");

  if (content.includes(`archive_${category}.md`)) return;

  const footer = `\n---\n\n[See Older Posts](archive_${category}.md)\n`;
  writeFileSync(categoryMdPath, content.replace(/\n*$/, "") + "\n" + footer);
}

// does nothing for a category with no older posts and no archive page yet
export function regenerateArchiveFile(category) {
  const archiveMdPath = join(ROOT, `archive_${category}.md`);
  const { older } = splitNewestFromOlder(category);

  if (older.length === 0 && !existsSync(archiveMdPath)) return;

  const includeLine = buildIncludeLine(category, older);
  const content = existsSync(archiveMdPath) ? replaceIncludeLine(readFileSync(archiveMdPath, "utf8"), includeLine) : archiveTemplate(category, includeLine);

  writeFileSync(archiveMdPath, content);
  ensureArchiveLink(category);
}
