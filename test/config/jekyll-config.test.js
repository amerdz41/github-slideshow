const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONFIG_PATH = path.resolve(__dirname, '../../_config.yml');

let config;

beforeAll(() => {
  const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
  config = yaml.load(raw);
});

describe('Jekyll _config.yml', () => {
  test('config file exists and is valid YAML', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  test('has a title', () => {
    expect(config.title).toBeDefined();
    expect(typeof config.title).toBe('string');
    expect(config.title.length).toBeGreaterThan(0);
  });

  test('has an author', () => {
    expect(config.author).toBeDefined();
    expect(typeof config.author).toBe('string');
  });

  test('has a description', () => {
    expect(config.description).toBeDefined();
    expect(typeof config.description).toBe('string');
  });

  test('has a valid baseurl', () => {
    expect(config.baseurl).toBeDefined();
    expect(config.baseurl).toMatch(/^\//);
  });

  test('uses kramdown as the markdown processor', () => {
    expect(config.markdown).toBe('kramdown');
  });

  test('uses rouge as the syntax highlighter', () => {
    expect(config.highlighter).toBe('rouge');
  });

  test('has valid timezone', () => {
    expect(config.timezone).toBeDefined();
    expect(typeof config.timezone).toBe('string');
    expect(config.timezone).toMatch(/\w+\/\w+/);
  });

  test('has valid permalink format', () => {
    expect(config.permalink).toBeDefined();
    expect(config.permalink).toContain(':title');
  });

  test('plugins array includes jemoji', () => {
    expect(config.plugins).toBeDefined();
    expect(Array.isArray(config.plugins)).toBe(true);
    expect(config.plugins).toContain('jemoji');
  });

  test('sass style is set to compressed', () => {
    expect(config.sass).toBeDefined();
    expect(config.sass.style).toBe(':compressed');
  });

  test('solarized theme is defined', () => {
    expect(config.solarized).toBeDefined();
    expect(config.solarized.theme).toBeDefined();
    expect(['dark', 'light']).toContain(config.solarized.theme);
  });

  test('slideNumber format is defined', () => {
    expect(config.slideNumber).toBeDefined();
    expect(config.slideNumber.format).toBeDefined();
    expect(['h.v', 'h/v', 'c', 'c/t', 'none']).toContain(config.slideNumber.format);
  });

  test('exclude list is defined and contains expected entries', () => {
    expect(config.exclude).toBeDefined();
    expect(Array.isArray(config.exclude)).toBe(true);
    expect(config.exclude).toContain('Gemfile');
    expect(config.exclude).toContain('Gemfile.lock');
    expect(config.exclude).toContain('vendor');
  });
});

describe('Reveal.js configuration in _config.yml', () => {
  let reveal;

  beforeAll(() => {
    reveal = config.reveal;
  });

  test('reveal config block exists', () => {
    expect(reveal).toBeDefined();
    expect(typeof reveal).toBe('object');
  });

  test('controls is a boolean', () => {
    expect(typeof reveal.controls).toBe('boolean');
  });

  test('progress is a boolean', () => {
    expect(typeof reveal.progress).toBe('boolean');
  });

  test('history is a boolean', () => {
    expect(typeof reveal.history).toBe('boolean');
  });

  test('keyboard is a boolean', () => {
    expect(typeof reveal.keyboard).toBe('boolean');
  });

  test('center is a boolean', () => {
    expect(typeof reveal.center).toBe('boolean');
  });

  test('transition is a valid value', () => {
    const valid = ['default', 'cube', 'page', 'concave', 'zoom', 'linear', 'fade', 'none'];
    expect(valid).toContain(reveal.transition);
  });

  test('width and height are positive numbers', () => {
    expect(typeof reveal.width).toBe('number');
    expect(typeof reveal.height).toBe('number');
    expect(reveal.width).toBeGreaterThan(0);
    expect(reveal.height).toBeGreaterThan(0);
  });

  test('margin is between 0 and 1', () => {
    expect(typeof reveal.margin).toBe('number');
    expect(reveal.margin).toBeGreaterThanOrEqual(0);
    expect(reveal.margin).toBeLessThanOrEqual(1);
  });

  test('minScale is less than maxScale', () => {
    expect(reveal.minScale).toBeDefined();
    expect(reveal.maxScale).toBeDefined();
    expect(reveal.minScale).toBeLessThan(reveal.maxScale);
  });
});
