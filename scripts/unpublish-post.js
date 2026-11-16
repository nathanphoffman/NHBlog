// The reverse of add-post.js: moves a published post from a category back into /drafts
// and updates the category and archive lists.
import { existsSync, renameSync } from "fs";
import { join } from "path";
import { createInterface } from "readline/promises";
import {
  DRAFTS_DIR,
  ROOT,
  findCategories,
  listMarkdown,
  pickFromList,
  regenerateArchiveFile,
  regenerateCategoryFile,
} from "./post_files.js";

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

    regenerateCategoryFile(category);
    regenerateArchiveFile(category);
    console.log("Nothing has been committed — review with `git status` / `git diff` and commit when ready.");
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
