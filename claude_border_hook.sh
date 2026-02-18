#!/usr/bin/env bash
set -e

STATE="${1:-idle}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ "$STATE" = "working" ]; then
  node "$SCRIPT_DIR/border-control.js" start
else
  node "$SCRIPT_DIR/border-control.js" stop || true
fi

exit 0
