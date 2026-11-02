// Pure helpers for the markdown include pipeline. They live apart from build-static.js
// because that script does file work as soon as it loads, which makes it untestable.

const ABSOLUTE_URL_PATTERN = /^(https?:|data:)/;
const SORT_DIR_PATTERN = /^sort_dir\s*:/i;
const SORT_PATTERN = /^sort\s*:/i;
const LIMIT_TO_PATTERN = /^limit_to\s*:/i;
const DECIMAL_RADIX = 10;

export function toRootRelative(path) {
  if (path.startsWith("/") || ABSOLUTE_URL_PATTERN.test(path)) return path;

  return `/${path}`;
}

// Removes a directive's "key:" prefix, so only its value is left to read.
function directiveValue(token, pattern) {
  return token.replace(pattern, "").trim();
}

export function parseIncludeDirective(body) {
  const files = [];
  let sortMarker = null;
  let sortDir = "asc";
  let limitTo = null;

  for (const part of body.split(",")) {
    const token = part.trim();

    if (SORT_DIR_PATTERN.test(token)) {
      if (directiveValue(token, SORT_DIR_PATTERN).toLowerCase() === "desc") sortDir = "desc";
    } else if (SORT_PATTERN.test(token)) {
      // strips one pair of surrounding quotes, which authors may or may not write
      sortMarker = directiveValue(token, SORT_PATTERN).replace(/^["']|["']$/g, "");
    } else if (LIMIT_TO_PATTERN.test(token)) {
      const parsedLimit = parseInt(directiveValue(token, LIMIT_TO_PATTERN), DECIMAL_RADIX);

      if (!isNaN(parsedLimit)) limitTo = parsedLimit;
    } else if (token) {
      files.push(token);
    }
  }

  return { files, sortMarker, sortDir, limitTo };
}

// A "# Heading" line (but not "## Sub") starts an entry when sorting by heading.
function headingBoundary(line, index) {
  // matches a single-# heading and captures its text
  const match = line.match(/^#(?!#)\s+(.+)$/);

  return match ? { index, key: match[1].trim() } : null;
}

// Any other marker is matched against the line with its HTML comment wrapper removed.
function markerBoundary(line, index, marker) {
  // removes a leading "<!--" and trailing "-->" so "<!-- date: x -->" reads as "date: x"
  const stripped = line
    .trim()
    .replace(/^<!--\s*/, "")
    .replace(/\s*-->$/, "")
    .trim();

  if (!stripped.startsWith(marker)) return null;

  return { index, key: stripped.slice(marker.length).trim() };
}

export function splitIntoEntries(content, marker) {
  const lines = content.split("\n");
  const findBoundary = marker === "#" ? headingBoundary : (line, index) => markerBoundary(line, index, marker);
  const boundaries = lines.map(findBoundary).filter(Boolean);

  return boundaries.map((boundary, position) => {
    const next = boundaries[position + 1];
    const end = next ? next.index : lines.length;

    return { key: boundary.key, text: lines.slice(boundary.index, end).join("\n").trim() };
  });
}

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

export function escapeHtml(text) {
  // one pass over the four characters HTML treats specially
  return text.replace(/[&<>"]/g, (character) => HTML_ESCAPES[character]);
}
