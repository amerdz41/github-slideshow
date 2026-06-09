const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.resolve(__dirname, '../../_posts');
const INDEX_PATH = path.resolve(__dirname, '../../index.html');

function getPostFiles() {
  return fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
}

describe('_posts/ frontmatter validation', () => {
  const postFiles = getPostFiles();

  test('at least one post exists', () => {
    expect(postFiles.length).toBeGreaterThan(0);
  });

  postFiles.forEach(filename => {
    describe(filename, () => {
      let parsed;

      beforeAll(() => {
        const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
        parsed = matter(raw);
      });

      test('has valid frontmatter', () => {
        expect(parsed.data).toBeDefined();
        expect(typeof parsed.data).toBe('object');
      });

      test('has a layout field', () => {
        expect(parsed.data.layout).toBeDefined();
        expect(typeof parsed.data.layout).toBe('string');
      });

      test('layout is a known layout type', () => {
        const validLayouts = ['slide', 'presentation', 'print'];
        expect(validLayouts).toContain(parsed.data.layout);
      });

      test('has a title field', () => {
        expect(parsed.data.title).toBeDefined();
        expect(typeof parsed.data.title).toBe('string');
        expect(parsed.data.title.length).toBeGreaterThan(0);
      });

      test('filename follows Jekyll naming convention (YYYY-MM-DD-slug.md)', () => {
        expect(filename).toMatch(/^\d{4}-\d{2}-\d{2}-.+\.md$/);
      });

      test('has non-empty content body', () => {
        expect(parsed.content.trim().length).toBeGreaterThan(0);
      });
    });
  });
});

describe('index.html frontmatter', () => {
  let parsed;

  beforeAll(() => {
    const raw = fs.readFileSync(INDEX_PATH, 'utf8');
    parsed = matter(raw);
  });

  test('has valid frontmatter', () => {
    expect(parsed.data).toBeDefined();
  });

  test('uses presentation layout', () => {
    expect(parsed.data.layout).toBe('presentation');
  });

  test('has content body with Liquid template logic', () => {
    expect(parsed.content).toMatch(/\{%.*for.*post.*in.*site\.posts/);
  });

  test('iterates over posts in reversed order', () => {
    expect(parsed.content).toMatch(/site\.posts\s+reversed/);
  });

  test('includes slide.html partial for each post', () => {
    expect(parsed.content).toMatch(/\{%\s*include slide\.html\s*%\}/);
  });

  test('adds page-break divs between slides', () => {
    expect(parsed.content).toMatch(/class="page-break"/);
  });

  test('supports optional overview section', () => {
    expect(parsed.content).toMatch(/site\.overview/);
  });

  test('respects simple-slideshow flag', () => {
    expect(parsed.content).toMatch(/site\.simple-slideshow/);
  });
});
