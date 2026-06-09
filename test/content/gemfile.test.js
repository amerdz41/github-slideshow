const fs = require('fs');
const path = require('path');

const GEMFILE_PATH = path.resolve(__dirname, '../../Gemfile');

describe('Gemfile', () => {
  let content;

  beforeAll(() => {
    content = fs.readFileSync(GEMFILE_PATH, 'utf8');
  });

  test('file exists', () => {
    expect(content).toBeDefined();
    expect(content.length).toBeGreaterThan(0);
  });

  test('uses rubygems.org as source', () => {
    expect(content).toMatch(/source\s+"https:\/\/rubygems\.org"/);
  });

  test('includes github-pages gem', () => {
    expect(content).toMatch(/gem\s+['"]github-pages['"]/);
  });

  test('includes html-proofer gem for CI validation', () => {
    expect(content).toMatch(/gem\s+['"]html-proofer['"]/);
  });

  test('includes tzinfo-data for Windows compatibility', () => {
    expect(content).toMatch(/gem\s+['"]tzinfo-data['"]/);
    expect(content).toMatch(/platforms:\s*\[:mingw/);
  });
});
