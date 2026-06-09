const fs = require('fs');
const path = require('path');

const LAYOUTS_DIR = path.resolve(__dirname, '../../_layouts');

describe('_layouts/presentation.html', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(path.join(LAYOUTS_DIR, 'presentation.html'), 'utf8');
  });

  test('file exists', () => {
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('is a valid HTML5 document', () => {
    expect(content).toMatch(/<!DOCTYPE html>/i);
    expect(content).toMatch(/<html/);
    expect(content).toMatch(/<\/html>/);
  });

  test('includes head.html partial', () => {
    expect(content).toMatch(/\{%\s*include head\.html\s*%\}/);
  });

  test('includes script.html partial', () => {
    expect(content).toMatch(/\{%\s*include script\.html\s*%\}/);
  });

  test('has the reveal container structure', () => {
    expect(content).toMatch(/class="reveal"/);
    expect(content).toMatch(/class="slides"/);
  });

  test('renders content inside slides div', () => {
    expect(content).toMatch(/class="slides"[\s\S]*\{\{\s*content\s*\}\}/);
  });

  test('applies solarized theme class to html element', () => {
    expect(content).toMatch(/site\.solarized\.theme/);
  });

  test('falls back to dark theme when no solarized theme set', () => {
    expect(content).toMatch(/else.*dark/s);
  });
});

describe('_layouts/print.html', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(path.join(LAYOUTS_DIR, 'print.html'), 'utf8');
  });

  test('file exists', () => {
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('is a valid HTML5 document', () => {
    expect(content).toMatch(/<!DOCTYPE html>/i);
  });

  test('includes head.html partial', () => {
    expect(content).toMatch(/\{%\s*include head\.html\s*%\}/);
  });

  test('has the reveal container', () => {
    expect(content).toMatch(/class="reveal"/);
  });

  test('does NOT include script.html (no JS for print)', () => {
    expect(content).not.toMatch(/include script\.html/);
  });

  test('renders content directly inside reveal div', () => {
    expect(content).toMatch(/class="reveal"[\s\S]*\{\{\s*content\s*\}\}/);
  });

  test('does not have a slides wrapper div (unlike presentation)', () => {
    expect(content).not.toMatch(/class="slides"/);
  });
});

describe('_layouts/slide.html', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(path.join(LAYOUTS_DIR, 'slide.html'), 'utf8');
  });

  test('file exists', () => {
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('is a valid HTML5 document', () => {
    expect(content).toMatch(/<!DOCTYPE html>/i);
  });

  test('includes head.html partial', () => {
    expect(content).toMatch(/\{%\s*include head\.html\s*%\}/);
  });

  test('has the reveal container', () => {
    expect(content).toMatch(/class="reveal"/);
  });

  test('uses step class wrapper instead of slides', () => {
    expect(content).toMatch(/class="step"/);
  });

  test('renders content inside step div', () => {
    expect(content).toMatch(/class="step"[\s\S]*\{\{\s*content\s*\}\}/);
  });

  test('does not include script.html (single slide view)', () => {
    expect(content).not.toMatch(/include script\.html/);
  });
});
