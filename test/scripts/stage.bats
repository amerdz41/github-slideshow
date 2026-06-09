#!/usr/bin/env bats

# Tests for script/stage

setup() {
  REPO_ROOT="$(cd "$(dirname "$BATS_TEST_FILENAME")/../.." && pwd)"
  SCRIPT="$REPO_ROOT/script/stage"
}

@test "stage script exists and is executable" {
  [ -f "$SCRIPT" ]
  [ -x "$SCRIPT" ]
}

@test "stage script defaults repo to caption-this when no argument given" {
  grep -q 'repo="caption-this"' "$SCRIPT"
}

@test "stage script accepts a custom repo name as first argument" {
  grep -q 'repo=$1' "$SCRIPT"
}

@test "stage script uses training-staging account" {
  grep -q "account='training-staging'" "$SCRIPT"
}

@test "stage script builds Jekyll site with custom baseurl" {
  grep -q 'bundle exec jekyll build --baseurl "/${account}/${repo}"' "$SCRIPT"
}

@test "stage script sets DISABLE_WHITELIST during build" {
  grep -q "DISABLE_WHITELIST=1" "$SCRIPT"
}

@test "stage script creates temp git repo in _site" {
  grep -q "cd _site && git init" "$SCRIPT"
}

@test "stage script adds staging remote pointing to ghe.io" {
  grep -q 'git remote add staging https://ghe.io/${account}/${repo}.git' "$SCRIPT"
}

@test "stage script force pushes to gh-pages branch" {
  grep -q "git push staging master:gh-pages --force" "$SCRIPT"
}

@test "stage script removes staging remote after push" {
  grep -q "git remote rm staging" "$SCRIPT"
}

@test "stage script opens the staging site URL" {
  grep -q 'open https://pages.ghe.io/${account}/${repo}/' "$SCRIPT"
}

@test "stage script defines color variables for output" {
  grep -q "red=" "$SCRIPT"
  grep -q "grn=" "$SCRIPT"
  grep -q "end=" "$SCRIPT"
}
