import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (['docs', '.git', '.superpowers', 'node_modules', 'tests'].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|css|js|svg|md)$/.test(name)) files.push(p);
  }
};
walk('.');
const text = (f) => readFileSync(f, 'utf8');

test('no employer name, logo or monogram on the public page', () => {
  const hits = files.filter((f) => /mccormack|family farms/i.test(text(f)));
  assert.deepEqual(hits, []);
});

test('fonts are self-hosted: no Google Fonts, no Poppins', () => {
  const hits = files.filter((f) => /fonts\.googleapis|fonts\.gstatic|Poppins/i.test(text(f)));
  assert.deepEqual(hits, []);
});

test('every font file the theme points at exists', () => {
  const css = text('theme.css');
  const urls = [...css.matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]);
  assert.ok(urls.length >= 2);
  for (const u of urls) assert.ok(existsSync(u), u);
});

test('page loads the theme before its own styles', () => {
  const html = text('index.html');
  assert.ok(html.indexOf('theme.css') > -1 && html.indexOf('theme.css') < html.indexOf('style.css'));
});
