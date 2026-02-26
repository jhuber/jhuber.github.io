#!/usr/bin/env bash
# Local Jekyll development server via Docker (Ruby 3.2).
# Gems are cached in a named Docker volume (jekyll-gems) so reinstalls are fast.
#
# Usage:
#   ./serve.sh            — start server at http://localhost:4000
#   ./serve.sh --no-cache — force fresh gem install (clears the volume first)

set -e

if [[ "$1" == "--no-cache" ]]; then
  echo "Stopping any containers using the gem volume..."
  CONTAINERS=$(docker ps -a -q --filter "volume=jekyll-gems")
  [ -n "$CONTAINERS" ] && docker rm -f $CONTAINERS 2>/dev/null || true
  echo "Removing gem cache volume..."
  docker volume rm jekyll-gems 2>/dev/null || true
fi

echo "Installing gems and starting Jekyll (first run may take 2–3 min)..."
docker run --rm -t \
  -v "$PWD:/usr/src/app" \
  -v jekyll-gems:/usr/local/bundle \
  -w /usr/src/app \
  -p 4000:4000 \
  ruby:3.2 \
  sh -c "gem install bundler --no-document && bundle install && bundle exec jekyll serve --host 0.0.0.0"
