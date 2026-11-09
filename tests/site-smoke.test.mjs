import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const urls = [
  ['index.html', 'https://illipe.org/'],
  ['company/index.html', 'https://illipe.org/company/'],
  ['work/index.html', 'https://illipe.org/work/']
];

for (const [file, canonical] of urls) {
  test(`${file} remains valid, branded and indexable`, () => {
    const html = read(file);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /<meta name="viewport"/);
    assert.match(html, /<main id="main">/);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
    assert.match(html, /name="robots" content="index,follow/);
    assert.match(html, /illipe-wordmark\.svg/);
    assert.match(html, /href="\/polish\.css"/);
    assert.match(html, /aria-expanded="false"/);
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(json, 'structured data should exist');
    assert.equal(JSON.parse(json[1])['@context'], 'https://schema.org');
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)];
    imgs.forEach(([image]) => assert.match(image, /\balt="[^"]*"/, 'images require alt text'));
  });
}

test('local links and referenced image and style assets exist', () => {
  for (const [file] of urls) {
    const html = read(file);
    for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      const [url, fragment] = match[1].split('#');
      const relative = url.replace(/^\//, '');
      const target = !relative ? 'index.html' : relative.endsWith('/') ? relative + 'index.html' : relative;
      assert.ok(fs.existsSync(path.join(root, target)), `${file}: missing ${url}`);
      if (fragment) {
        const targetHtml = read(target);
        assert.ok(targetHtml.includes(`id="${fragment}"`), `${file}: missing anchor ${url}`);
      }
    }
    for (const match of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${match[1]}"`), `${file}: missing page anchor ${match[1]}`);
    }
  }
});

test('responsive and accessible motion remains available', () => {
  const css = read('polish.css');
  const js = read('main.js');
  assert.match(css, /max-width:420px/);
  assert.match(css, /max-width:760px/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /prefers-reduced-motion: reduce/);
  assert.match(js, /Escape/);
  assert.match(js, /\.inert\s*=/);
});

test('brand sources and sitemap are coherent', () => {
  for (const asset of [
    'assets/illipe-wordmark.svg',
    'assets/illipe-hero-editorial.webp',
    'assets/aplunio-logo-on-dark.svg',
    'favicon.svg'
  ]) assert.ok(fs.existsSync(path.join(root, asset)), asset);
  const map = read('sitemap.xml');
  for (const [, canonical] of urls) assert.ok(map.includes(canonical));
  assert.match(read('robots.txt'), /Sitemap:\s*https:\/\/illipe\.org\/sitemap\.xml/);
});

test('public institutional emails are present and accessible across every page', () => {
  for (const [file] of urls) {
    const html = read(file);
    assert.ok(html.includes('id="contact" aria-labelledby="contact-heading"'));
    assert.ok(html.includes('href="mailto:contact@illipe.org"'));
    assert.ok(html.includes('href="mailto:partnerships@illipe.org"'));
    assert.ok(!html.includes('admin@illipe.org'));
    assert.ok(!html.includes('PUBLIC CONTACT DETAILS — IN PREPARATION'));
    assert.ok(html.includes('class="contact-item"'));
  }
  const css = read('polish.css');
  assert.ok(css.includes('.contact-item:focus-visible'));
  assert.ok(css.includes('overflow-wrap:anywhere'));
  assert.ok(css.includes('@media(max-width:800px)'));
});
