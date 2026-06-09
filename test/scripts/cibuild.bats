#!/usr/bin/env bats

# Tests for script/cibuild

setup() {
  REPO_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/../.." && pwd)"
  SCRIPT="$REPO_ROOT/script/cibuild"
}

@test "cibuild script exists and is executable" {
  [ -f "$SCRIPT" ]
  [ -x "$SCRIPT" ]
}

@test "cibuild script uses set -e for error handling" {
  grep -q "set -e" "$SCRIPT"
}

@test "cibuild script runs jekyll build with baseurl dot" {
  grep -q 'bundle exec jekyll build --baseurl "."' "$SCRIPT"
}

@test "cibuild script runs htmlproofer on _site/index.html" {
  grep -q "htmlproofer _site/index.html" "$SCRIPT"
}

@test "cibuild script uses --empty-alt-ignore flag for htmlproofer" {
  grep -q "\-\-empty-alt-ignore" "$SCRIPT"
}

@test "cibuild script uses /bin/sh shebang" {
  head -1 "$SCRIPT" | grep -q "#!/bin/sh"
}
