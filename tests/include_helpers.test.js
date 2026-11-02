import assert from "node:assert/strict";
import { test } from "node:test";

import { escapeHtml, parseIncludeDirective, splitIntoEntries, toRootRelative } from "../include_helpers.js";

test("toRootRelative keeps absolute paths and URLs, and roots relative ones", () => {
  assert.equal(toRootRelative("/a.md"), "/a.md");
  assert.equal(toRootRelative("https://example.com/a.md"), "https://example.com/a.md");
  assert.equal(toRootRelative("posts/a.md"), "/posts/a.md");
});

test("parseIncludeDirective reads files, sort, direction and limit", () => {
  const directive = parseIncludeDirective('a.md, b.md, sort: "date:", sort_dir: DESC, limit_to: 3');

  assert.deepEqual(directive, { files: ["a.md", "b.md"], sortMarker: "date:", sortDir: "desc", limitTo: 3 });
});

test("parseIncludeDirective ignores a limit that is not a number", () => {
  assert.equal(parseIncludeDirective("a.md, limit_to: many").limitTo, null);
});

test("splitIntoEntries splits on single-# headings only", () => {
  const entries = splitIntoEntries("# One\ntext\n## Sub\n# Two\nmore", "#");

  assert.deepEqual(entries, [
    { key: "One", text: "# One\ntext\n## Sub" },
    { key: "Two", text: "# Two\nmore" },
  ]);
});

test("splitIntoEntries splits on a comment marker and keys on its value", () => {
  const entries = splitIntoEntries("<!-- date: 2024-02-01 -->\nb\n<!-- date: 2024-01-01 -->\na", "date:");

  assert.deepEqual(
    entries.map((entry) => entry.key),
    ["2024-02-01", "2024-01-01"],
  );
});

test("escapeHtml escapes the four special characters", () => {
  assert.equal(escapeHtml('<a href="x">&</a>'), "&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;");
});
