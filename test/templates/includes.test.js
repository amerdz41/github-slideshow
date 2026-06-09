const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const INCLUDES_DIR = path.resolve(__dirname, '../../_includes');

describe('_includes/head.html', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(path.join(INCLUDES_DIR, 'head.html'), 'utf8');
  });

  test('file exists', () => {
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('sets charset to utf-8', () => {
    expect(content).toMatch(/charset="utf-8"/i);
  });

  test('includes viewport meta tag', () => {
    expect(content).toMatch(/name="viewport"/);
    expect(content).toMatch(/width=device-width/);
  });

  test('has a title tag with Liquid template logic', () => {
    expect(content).toMatch(/<title>/);
    expect(content).toMatch(/\{%.*if.*post\.title.*%\}/);
  });

  test('links to reveal.js CSS', () => {
    expect(content).toMatch(/reveal\.css/);
  });

  test('links to a reveal.js theme stylesheet', () => {
    expect(content).toMatch(/css\/theme\//);
  });

  test('links to syntax highlighting CSS', () => {
    expect(content).toMatch(/monokai\.css/);
  });

  test('includes print/PDF export logic', () => {
    expect(content).toMatch(/print-pdf/);
    expect(content).toMatch(/document\.createElement/);
  });
});

describe('_includes/script.html', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(path.join(INCLUDES_DIR, 'script.html'), 'utf8');
  });

  test('file exists', () => {
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('loads reveal.js main script', () => {
    expect(content).toMatch(/reveal\.js/);
    expect(content).toMatch(/<script src=/);
  });

  test('calls Reveal.initialize', () => {
    expect(content).toMatch(/Reveal\.initialize\(/);
  });

  test('configures markdown plugin', () => {
    expect(content).toMatch(/marked\.js/);
    expect(content).toMatch(/markdown\.js/);
  });

  test('configures highlight plugin', () => {
    expect(content).toMatch(/highlight\.js/);
  });

  test('configures notes plugin', () => {
    expect(content).toMatch(/notes\.js/);
  });

  test('notes plugin is loaded asynchronously', () => {
    expect(content).toMatch(/notes\.js.*async:\s*true/s);
  });
});

describe('_includes/slide.html', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(path.join(INCLUDES_DIR, 'slide.html'), 'utf8');
  });

  test('file exists', () => {
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('wraps content in a <section> tag', () => {
    expect(content).toMatch(/<section/);
    expect(content).toMatch(/<\/section>/);
  });

  test('supports optional slide-id attribute', () => {
    expect(content).toMatch(/post\.slide-id/);
  });

  test('applies CSS classes from post frontmatter', () => {
    expect(content).toMatch(/post\.classes/);
  });

  test('defaults to "slide" class when no custom classes', () => {
    expect(content).toMatch(/slide/);
  });

  test('supports data attributes from post frontmatter', () => {
    expect(content).toMatch(/data-\{\{attr\[0\]\}\}/);
  });

  test('renders post title in h1 when present', () => {
    expect(content).toMatch(/<h1>.*post\.title.*<\/h1>/s);
  });

  test('renders post content', () => {
    expect(content).toMatch(/post\.content/);
  });
});
