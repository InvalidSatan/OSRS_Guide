#!/bin/bash
# Validate HTML files in the site directory using tidy.
# Requires the 'tidy' command to be installed.

set -e

if ! command -v tidy >/dev/null 2>&1; then
  echo "Error: tidy command not found. Install 'tidy' to run validation." >&2
  exit 1
fi

status=0
for file in site/*.html; do
  echo "Validating $file"
  # tidy prints messages to stderr
  if ! tidy -q -errors "$file" >/dev/null; then
    status=1
  fi
  echo
done
exit $status
