#!/usr/bin/env bash
set -euo pipefail

BUCKET="s3://truewill-embracer"
: "${CF_DISTRIBUTION_ID:?CF_DISTRIBUTION_ID environment variable is required}"

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

echo "==> Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$CF_DISTRIBUTION_ID" \
  --paths "/index.html" "/manifest.json" "/favicon.ico"

echo "==> Deploy complete."
