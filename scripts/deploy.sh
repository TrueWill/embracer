#!/usr/bin/env bash
set -euo pipefail

BUCKET="s3://truewill-embracer"
SITE_URL="https://www.met-embracer.com"

echo "==> Building..."
yarn build

echo "==> Syncing assets (hashed, long-cache)..."
aws s3 sync dist/assets/ "$BUCKET/assets/" \
  --cache-control "max-age=31536000, immutable" \
  --delete

echo "==> Syncing root files (no-cache)..."
aws s3 sync dist/ "$BUCKET/" \
  --exclude "assets/*" \
  --cache-control "max-age=0, must-revalidate" \
  --delete

echo "==> Purging Cloudflare cache..."
npx wrangler cache purge \
  --url "$SITE_URL/index.html" \
  --url "$SITE_URL/manifest.json" \
  --url "$SITE_URL/favicon.ico"

echo "==> Deploy complete."
