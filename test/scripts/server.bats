#!/usr/bin/env bats

# Tests for script/server

setup() {
  REPO_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/../.." && pwd)"
  SCRIPT="$REPO_ROOT/script/server"
}

@test "server script exists and is executable" {
  [ -f "$SCRIPT" ]
  [ -x "$SCRIPT" ]
}

@test "server script uses set -e for error handling" {
  grep -q "set -e" "$SCRIPT"
}

@test "server script runs jekyll serve" {
  grep -q "bundle exec jekyll serve" "$SCRIPT"
}

@test "server script passes through arguments with dollar-at" {
  grep -q '"$@"' "$SCRIPT"
}

@test "server script uses /bin/sh shebang" {
  head -1 "$SCRIPT" | grep -q "#!/bin/sh"
}
