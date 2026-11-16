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

export function regenerateCategoryFile(category) {
  const dir = join(ROOT, category);
  const files = sortByDateDesc(dir, listMarkdown(dir));
  const mdPath = join(ROOT, `${category}.md`);
  const content = readFileSync(mdPath, "utf8");
  const updated = replaceIncludeLine(content, buildIncludeLine(category, files));
  writeFileSync(mdPath, updated);
}

export function regenerateArchiveFile(category) {
  const archiveDir = join(ROOT, `archive_${category}`);
  const archiveMdPath = join(ROOT, `archive_${category}.md`);
  const files = sortByDateDesc(archiveDir, listMarkdown(archiveDir));
  const includeLine = buildIncludeLine(`archive_${category}`, files);

  if (!existsSync(archiveMdPath)) {
    const template = [
      "<!-- Blog of Nathan Hoffman -->",
      "<!-- [Blog of Nathan Hoffman](main.md) -->",
      "<!-- themes: glacier -->",
      "",
      `# **${titleCase(category)} Archive**`,
      "",
      includeLine,
      "",
    ].join("\n");

    writeFileSync(archiveMdPath, template);
  } else {
    const content = readFileSync(archiveMdPath, "utf8");
    writeFileSync(archiveMdPath, replaceIncludeLine(content, includeLine));
  }

  const categoryMdPath = join(ROOT, `${category}.md`);
  const categoryContent = readFileSync(categoryMdPath, "utf8");
  const archiveLinkRe = new RegExp(`archive_${category}\\.md`);

  if (!archiveLinkRe.test(categoryContent)) {
    const footer = `\n---\n\n[See Older Posts](archive_${category}.md)\n`;
    writeFileSync(categoryMdPath, categoryContent.replace(/\n*$/, "") + "\n" + footer);
  }
}
