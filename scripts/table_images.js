// Medium can't show tables, so this swaps every <table> in a page of HTML for a PNG
// screenshot of that table, taken with a headless Chrome/Chromium.
import { execFileSync } from "child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { homedir, tmpdir } from "os";
import { join } from "path";

const TABLE_PATTERN = /<table[\s\S]*?<\/table>/g;
const PAGE_PADDING_PX = 16;
const MEASURE_WAIT_MS = 2000;
// headless Chrome's window is this much taller than the page area inside it (measured), so we ask for extra
const HEADLESS_FRAME_HEIGHT_PX = 87;
const CHROME_NAMES = ["google-chrome", "chromium", "chromium-browser"];
const TABLE_STYLE =
  "body{margin:0;padding:16px;background:#fff;font:16px Georgia,serif}" +
  "table{border-collapse:collapse}th,td{border:1px solid #bbb;padding:6px 12px;text-align:left}th{background:#f2f2f2}";

// finds a Chrome: CHROME_PATH, then one on the PATH, then the copy Playwright downloads
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  for (const name of CHROME_NAMES) {
    try {
      return execFileSync("which", [name], { encoding: "utf8" }).trim();
    } catch {
      // not installed under this name, try the next one
    }
  }

  const playwrightDir = join(homedir(), ".cache", "ms-playwright");
  const versions = existsSync(playwrightDir) ? readdirSync(playwrightDir).filter((n) => n.startsWith("chromium-")) : [];
  const newest = versions.sort().at(-1);

  if (!newest) throw new Error("No Chrome found. Install Chromium or set CHROME_PATH.");

  return join(playwrightDir, newest, "chrome-linux64", "chrome");
}

function runChrome(chrome, extraArgs, pageUrl) {
  const args = ["--headless=new", "--no-sandbox", "--disable-gpu", ...extraArgs, pageUrl];

  return execFileSync(chrome, args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
}

// the page records its own table size into the DOM so we can read it back with --dump-dom
function measuringPage(tableHtml) {
  const script = `document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector("table").getBoundingClientRect();document.body.dataset.size=Math.ceil(r.right+${PAGE_PADDING_PX})+","+Math.ceil(r.bottom+${PAGE_PADDING_PX})})`;

  return `<!doctype html><meta charset="utf-8"><style>${TABLE_STYLE}</style>${tableHtml}<script>${script}</script>`;
}

function screenshotTable(chrome, tableHtml, workDir, index) {
  const pagePath = join(workDir, `table-${index}.html`);
  const pngPath = join(workDir, `table-${index}.png`);
  writeFileSync(pagePath, measuringPage(tableHtml));

  const dom = runChrome(chrome, [`--virtual-time-budget=${MEASURE_WAIT_MS}`, "--dump-dom"], `file://${pagePath}`);
  const size = dom.match(/data-size="(\d+),(\d+)"/);

  if (!size) throw new Error(`Could not measure table ${index}.`);

  runChrome(chrome, ["--hide-scrollbars", `--screenshot=${pngPath}`, `--window-size=${size[1]},${Number(size[2]) + HEADLESS_FRAME_HEIGHT_PX}`], `file://${pagePath}`);

  return pngPath;
}

// returns the html with each table replaced by an image, plus the PNG files kept for dragging in by hand
export function replaceTablesWithImages(html, saveDir, baseName) {
  const tables = html.match(TABLE_PATTERN) ?? [];

  if (tables.length === 0) return { html, pngPaths: [] };

  const chrome = findChrome();
  const workDir = mkdtempSync(join(tmpdir(), "table-images-"));
  const pngPaths = [];

  try {
    let index = 0;
    const replaced = html.replace(TABLE_PATTERN, (tableHtml) => {
      index += 1;
      const png = screenshotTable(chrome, tableHtml, workDir, index);
      const bytes = readFileSync(png);
      const savedPath = join(saveDir, `${baseName}-table-${index}.png`);
      writeFileSync(savedPath, bytes);
      pngPaths.push(savedPath);

      return `<img alt="Table ${index}" src="data:image/png;base64,${bytes.toString("base64")}">`;
    });

    return { html: replaced, pngPaths };
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}
