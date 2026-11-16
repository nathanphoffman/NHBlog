# Run the dev server (Bun, port 8080)
dev:
    npm run start

# Publish a draft from drafts/ into a category
add:
    npm run add-post

# Move a published post back into drafts/
remove:
    npm run unpublish-post

# Rebuild the pre-rendered pages in static/
html:
    node build-static.js

# Make a Medium-ready HTML file from a recent post
medium:
    node scripts/medium-post.js
