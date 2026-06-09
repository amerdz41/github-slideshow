#!/usr/bin/env bats

# Tests for script/setup

setup() {
  REPO_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/../.." && pwd)"
  SCRIPT="$REPO_ROOT/script/setup"
}

@test "setup script exists and is executable" {
  [ -f "$SCRIPT" ]
  [ -x "$SCRIPT" ]
}

@test "setup script uses set -e for error handling" {
  grep -q "set -e" "$SCRIPT"
}

@test "setup script changes to repo root directory" {
  grep -q 'cd "$(dirname "$0")/.."' "$SCRIPT"
}

@test "setup script checks for Brewfile on macOS only" {
  grep -q 'if \[ -f "Brewfile" \] && \[ "$(uname -s)" = "Darwin" \]' "$SCRIPT"
}

@test "setup script checks for .ruby-version before installing Ruby" {
  grep -q 'if \[ -f ".ruby-version" \]' "$SCRIPT"
}

@test "setup script installs bundler if not present" {
  grep -q "gem install bundler" "$SCRIPT"
}

@test "setup script installs gem dependencies when Gemfile exists" {
  grep -q 'if \[ -f "Gemfile" \]' "$SCRIPT"
  grep -q "bundle install" "$SCRIPT"
}

@test "setup script runs bundle install with correct flags" {
  grep -q "bundle install --no-cache --quiet --without production" "$SCRIPT"
}

@test "setup script initializes git submodules" {
  grep -q "git submodule update --init" "$SCRIPT"
}

@test "setup script prints completion message" {
  grep -q "App is now ready to go" "$SCRIPT"
}
