#!/bin/sh
set -e

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__ENV__ = {
  VITE_GOOGLE_CLIENT_ID: "${VITE_GOOGLE_CLIENT_ID:-}",
  GEMINI_API_KEY: "${GEMINI_API_KEY:-}",
  APP_VERSION: "${APP_VERSION:-0.1.0}",
  ENVIRONMENT: "${ENVIRONMENT:-production}"
};
EOF

echo "Environment variables injected into env-config.js"

# Cache busting
CACHE_BUST=$(date +%s)
sed -i "s|<meta http-equiv=\"Expires\" content=\"0\" />|<meta http-equiv=\"Expires\" content=\"0\" />\n    <meta name=\"deployed-at\" content=\"$CACHE_BUST\" />|" /usr/share/nginx/html/index.html 2>/dev/null || true

echo "Cache busting applied with timestamp: $CACHE_BUST"

exec "$@"
