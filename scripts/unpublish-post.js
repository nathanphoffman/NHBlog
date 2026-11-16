// The reverse of add-post.js: moves a published post from a category back into /drafts,
// then pulls the newest archived post up into the category if there is room for it.
import { existsSync, renameSync } from "fs";
import { join } from "path";
import { createInterface } from "readline/promises";
import {
  DRAFTS_DIR,
  KEEP_COUNT,
  ROOT,
  findCategories,
  listMarkdown,
  pickFromList,
  regenerateArchiveFile,
  regenerateCategoryFile,
  sortByDateDesc,
} from "./post_files.js";

// refills the category from its archive so it keeps showing KEEP_COUNT posts; returns the file moved, if any
function pullNewestFromArchive(category) {
  const archiveDir = join(ROOT, `archive_${category}`);
  const archived = sortByDateDesc(archiveDir, listMarkdown(archiveDir));

  if (archived.length === 0) return null;

  renameSync(join(archiveDir, archived[0]), join(ROOT, category, archived[0]));

  return archived[0];
}

async function main() {
  const categories = findCategories().filter((name) => listMarkdown(join(ROOT, name)).length > 0);

  if (categories.length === 0) throw new Error("No published posts found.");

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const category = await pickFromList(rl, "Which category is the post in?", categories);
    const categoryDir = join(ROOT, category);
    const post = await pickFromList(rl, "Which post do you want to unpublish?", listMarkdown(categoryDir));
    const draftPath = join(DRAFTS_DIR, post);

    // refuse rather than overwrite a draft that already has this name
    if (existsSync(draftPath)) throw new Error(`drafts/${post} already exists. Aborting.`);

    renameSync(join(categoryDir, post), draftPath);
    console.log(`\nMoved ${category}/${post} -> drafts/${post}`);

    const promoted = listMarkdown(categoryDir).length < KEEP_COUNT ? pullNewestFromArchive(category) : null;

    if (promoted) {
      regenerateArchiveFile(category);
      console.log(`Moved archive_${category}/${promoted} -> ${category}/${promoted}`);
    }

    regenerateCategoryFile(category);
    console.log("Nothing has been committed — review with `git status` / `git diff` and commit when ready.");
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
