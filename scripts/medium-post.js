// Turns a recent post into a clean HTML file you can open in a browser, select all,
// copy, and paste into Medium with the formatting intact. Output goes to medium/.
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import { createInterface } from "readline/promises";
import { ROOT, datePostedOf, findCategories, listMarkdown, pickFromList } from "./post_files.js";

const OUT_DIR = join(ROOT, "medium");
const RECENT_COUNT = 6;
const SITE_URL = JSON.parse(readFileSync(join(ROOT, "site.json"), "utf8")).url;
const ENGINE_DIR = join(ROOT, "engine", "build", "pkg");

async function loadRenderer() {
  const { initSync, render } = await import(pathToFileURL(join(ENGINE_DIR, "engine.js")).href);
  initSync({ module: readFileSync(join(ENGINE_DIR, "engine_bg.wasm")) });

  return render;
}

// newest posts across every category, so you can pick from a short list
function findRecentPosts() {
  const posts = findCategories().flatMap((category) =>
    listMarkdown(join(ROOT, category)).map((file) => {
      const path = join(ROOT, category, file);

      return { path, label: `${category}/${file}`, date: datePostedOf(path) };
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date)).slice(0, RECENT_COUNT);
}

// drops the site-only bits (HTML comments, the self link) that make no sense on Medium
function stripSiteOnlyLines(markdown) {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^>\s*https:\/\/nathanhoffman\.me\/\S*$/gm, "");
}

// Medium has no h1 in the body (the title is a separate field) and only two heading sizes
function simplifyHeadings(html) {
  return html
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, "")
    .replace(/<h([4-6])[^>]*>/g, "<h3>")
    .replace(/<\/h[4-6]>/g, "</h3>")
    .replace(/<h([23]) id="[^"]*">/g, "<h$1>");
}

// Medium can't load "/images/x.png" or "/coding.md", so point them at the live site
function makeLinksAbsolute(html) {
  return html
    .replace(/(src|href)="\/([^"]*?)\.md"/g, `$1="${SITE_URL}/$2"`)
    .replace(/(src|href)="\/(?!\/)/g, `$1="${SITE_URL}/`);
}

function pageAround(body) {
  return `<!doctype html>\n<meta charset="utf-8">\n<body>\n${body}\n</body>\n`;
}

async function main() {
  const posts = findRecentPosts();
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const post = await pickFromList(rl, "Which post do you want for Medium?", posts, (p) => `${p.label} (${p.date})`);
    const markdown = stripSiteOnlyLines(readFileSync(post.path, "utf8"));
    const title = markdown.match(/^# (.+)$/m)?.[1].replace(/\*\*/g, "") ?? post.label;
    const render = await loadRenderer();
    const html = makeLinksAbsolute(simplifyHeadings(render(markdown)));

    mkdirSync(OUT_DIR, { recursive: true });
    const outPath = join(OUT_DIR, post.label.split("/")[1].replace(/\.md$/, ".html"));
    writeFileSync(outPath, pageAround(html));
    console.log(`\nTitle (paste into Medium's title box): ${title}`);
    console.log(`Wrote ${outPath}\nOpen it in a browser, Ctrl+A, Ctrl+C, then paste into the Medium body.`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
