# NHBlog

Nathan Hoffman's blog, built on NewWeb: a markdown-first site where each `.md` file is a page.

## Run

- `npm run start` serves the site (uses Bun) on port 8080, or `PORT` if set.
- `npm run add-post` moves a draft from `drafts/` into a category and archives older posts.
- `npm run unpublish-post` moves a published post back into `drafts/` and refills the category from its archive.
- `node build-static.js` writes a pre-rendered copy of the site into `static/`.
- `npm test` runs the unit tests in `tests/`.

See `README.txt` for the NewWeb usage notes.
