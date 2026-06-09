# Security Audit — github-slideshow

## Audit Date

2026-06-09

## Scope

Scanned the full codebase for: hardcoded API keys/secrets, SQL injection,
unvalidated user input, insecure dependencies, overly permissive CORS, exposed
debug endpoints, and missing authentication checks.

## Findings

### Critical — Fixed

| # | Issue | Severity | CVE | Fix |
|---|-------|----------|-----|-----|
| 1 | **reveal.js 3.9.2 DOM XSS** — Cross-site Scripting via DOM in reveal.js < 4.3.0 | Medium (CVSS 6.1) | CVE-2022-0776 | Upgraded to reveal.js 5.2.1 |
| 2 | **Stale Gemfile.lock** — Pinned kramdown 1.17.0 (arbitrary code execution), activesupport 4.2.x (EOL), nokogiri < 1.13 (multiple CVEs) | High | CVE-2020-14001 + others | Bumped `github-pages` gem to >= 228; deleted stale lockfile |
| 3 | **node_modules committed** — Full dependency tree tracked in Git; supply-chain audit difficult | Low | — | Moved needed assets to `vendor/reveal.js/`; added `node_modules/` to `.gitignore` |
| 4 | **Viewport blocks user zoom** — `user-scalable=no, maximum-scale=1.0` prevents accessibility zoom | Low | — | Removed restrictions from viewport meta tag |

### Informational — No Action Required

| # | Issue | Notes |
|---|-------|-------|
| 5 | No hardcoded API keys or secrets | Clean |
| 6 | No SQL injection vectors | Static site, no database |
| 7 | No CORS configuration | Static site served by GitHub Pages; CORS handled at platform level |
| 8 | No exposed debug endpoints | No server-side code |
| 9 | No missing authentication checks | Public static site, auth not applicable |
| 10 | `script/stage` contains hardcoded internal URL (`ghe.io/training-staging`) | Exposes internal infra name; low risk for a public learning-lab repo |
| 11 | No Content-Security-Policy header | GitHub Pages does not support custom headers via config; would need a proxy or `<meta>` tag |

## Recommendations

- Re-run `bundle install` after merging to regenerate `Gemfile.lock` with
  patched gem versions.
- Consider adding a `<meta http-equiv="Content-Security-Policy" ...>` tag to
  restrict inline scripts if the presentation framework permits it.
- Periodically run `npm audit` and `bundle audit` to catch new vulnerabilities.
