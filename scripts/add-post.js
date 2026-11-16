// Moves a draft from /drafts into a category. The post keeps that URL forever; the
// category page lists the newest posts and archive_<category>.md lists the older ones.
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { createInterface } from "readline/promises";
import {
  DATE_RE,
  DRAFTS_DIR,
  ROOT,
  findCategories,
  listMarkdown,
  pickFromList,
  regenerateArchiveFile,
  regenerateCategoryFile,
} from "./post_files.js";

const TITLE_RE = /<!--\s*title:[^>]*-->/;

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}


async function askDate(rl, defaultDate) {
  while (true) {
    const answer = (await rl.question(`Date posted [${defaultDate}]: `)).trim();

    if (!answer) return defaultDate;

    if (/^\d{4}-\d{2}-\d{2}$/.test(answer)) return answer;
    console.log("Please use YYYY-MM-DD format.");
  }
}

function ensureDatePosted(content, date) {
  if (DATE_RE.test(content)) return content;
  const lines = content.split("\n");
  const headingIdx = lines.findIndex((l) => l.trim().startsWith("# "));

  if (headingIdx === -1) {
    throw new Error('Could not find a "# " heading line to anchor the date posted comment.');
  }

  lines.splice(headingIdx, 0, `<!-- date posted: ${date} -->`);

  return lines.join("\n");
}

function ensureBoilerplate(content) {
  if (content.startsWith("<!-- Blog of Nathan Hoffman -->")) return content;

  return [
    "<!-- Blog of Nathan Hoffman -->",
    "<!-- [Blog of Nathan Hoffman](main.md) -->",
    "<!-- themes: glacier -->",
    "",
    content,
  ].join("\n");
}

function ensureTitle(content) {
  if (TITLE_RE.test(content)) return content;
  const lines = content.split("\n");
  const h1Idx = lines.findIndex((l) => /^# (.+)$/.test(l.trim()));

  if (h1Idx === -1) {
    throw new Error('Could not find a "# " heading line to derive the title from.');
  }

  const heading = lines[h1Idx].trim().replace(/^# /, "").replace(/\*\*/g, "").trim();
  const themesIdx = lines.findIndex((l) => /^<!-- themes:/.test(l));

  if (themesIdx === -1) {
    throw new Error('Could not find the "<!-- themes: ... -->" line to anchor the title comment.');
  }

  lines.splice(themesIdx + 1, 0, `<!-- title: ${heading} — Blog of Nathan Hoffman -->`);

  return lines.join("\n");
}

function ensureSelfLink(content, category, slug) {
  const url = `https://nathanhoffman.me/${category}/${slug}`;

  if (content.includes(url)) return content;

  return `${content.replace(/\n*$/, "")}\n\n>${url}\n`;
}


async function main() {
  const drafts = listMarkdown(DRAFTS_DIR);

  if (drafts.length === 0) {
    console.log("No drafts found in /drafts.");

    return;
  }

  const categories = findCategories();

  if (categories.length === 0) {
    throw new Error("No category .md files with matching directories found.");
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const draft = await pickFromList(rl, "Which draft do you want to publish?", drafts);
    const category = await pickFromList(rl, "Which category does it belong to?", categories);

    const draftPath = join(DRAFTS_DIR, draft);
    let content = readFileSync(draftPath, "utf8");

    const existingDate = content.match(DATE_RE)?.[1];
    const date = existingDate ?? (await askDate(rl, todayIso()));
    content = ensureBoilerplate(content);
    content = ensureDatePosted(content, date);
    content = ensureTitle(content);
    content = ensureSelfLink(content, category, draft.slice(0, -3));

    const destDir = join(ROOT, category);
    const destPath = join(destDir, draft);

    if (existsSync(destPath)) {
      throw new Error(`${category}/${draft} already exists. Aborting.`);
    }

    writeFileSync(destPath, content);
    unlinkSync(draftPath);
    console.log(`\nMoved drafts/${draft} -> ${category}/${draft} (date posted: ${date})`);

    regenerateCategoryFile(category);
    regenerateArchiveFile(category);
    console.log(`\nUpdated ${category}.md and archive_${category}.md (posts never change URL; only the lists do).`);
    console.log("Nothing has been committed — review with `git status` / `git diff` and commit when ready.");
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
