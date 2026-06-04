# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single Jekyll + reveal.js slideshow (`github-slideshow`) for the GitHub Learning Lab course **Introducing GitHub**. No database or backend API.

### Ruby version

Use **Ruby 2.7.8** (see `.ruby-version`). System Ruby 3.2 is incompatible with the locked Bundler 1.17.3 and old `github-pages` stack. Install via rbenv if missing:

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-installer | bash
export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"
eval "$(rbenv init -)"
rbenv install -s 2.7.8
```

Gems install to `vendor/bundle` (configured via `bundle config set --local path vendor/bundle`).

### Dependencies

| Step | Command |
|------|---------|
| Ruby gems | `bundle install` (from repo root, with rbenv Ruby 2.7.8 active) |
| reveal.js | `npm ci` (uses `package-lock.json`; `node_modules` may already be present) |

Optional one-shot setup: `./script/setup` (macOS Homebrew only; on Linux use rbenv + commands above).

**Ubuntu 24.04 note:** If `nokogiri` 1.10.8 fails to compile (`canonicalize` conflict with glibc), run `bundle update nokogiri` once, or install `libxml2-dev` / `libxslt1-dev` and `bundle config build.nokogiri --use-system-libraries` before `bundle install`.

### Run the app

```bash
export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"
eval "$(rbenv init -)"
cd /workspace
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

Or `./script/server` (same as `bundle exec jekyll serve`).

Open **`http://127.0.0.1:4000/github-slideshow/`** (`baseurl` is `/github-slideshow` in `_config.yml`).

### Lint / CI

`./script/cibuild` runs `jekyll build` then `htmlproofer`. If `htmlproofer` is not on PATH, use:

```bash
bundle exec jekyll build --baseurl "."
bundle exec htmlproofer _site/index.html --empty-alt-ignore
```

### Services

| Service | Required? |
|---------|-----------|
| Jekyll dev server (port 4000) | Yes, for local dev |
| reveal.js (npm) | Yes, static assets |
| GitHub Learning Lab bot | No (GitHub-only) |
