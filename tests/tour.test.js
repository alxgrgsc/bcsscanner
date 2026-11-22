import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTour } from '../tour/tour-state.js';
import { SCENES } from '../tour/scenes.js';

test('tour wraps both ways', () => {
  const t = createTour(10);
  assert.equal(t.index, 0);
  assert.equal(t.prev(), 9);
  assert.equal(t.next(), 0);
  assert.equal(t.next(), 1);
});

test('goTo ignores out-of-range', () => {
  const t = createTour(10);
  assert.equal(t.goTo(4), 4);
  assert.equal(t.goTo(-1), 4);
  assert.equal(t.goTo(10), 4);
});

test('ten scenes with the agreed captions', () => {
  assert.deepEqual(SCENES.map((s) => s.caption), [
    '1. Milk recording day',
    '2. Set up in the parlour',
    '3. Cow comes in',
    '4. The photo takes itself',
    '5. Scan',
    '6. Estimate',
    '7. Next cows',
    '8. Check the flagged cows',
    '9. Herd report',
    '10. Over the season',
  ]);
});

test('the walkthrough shows a milk recording visit, not a breeding one', () => {
  const all = SCENES.map((s) => s.html).join(' ');
  assert.doesNotMatch(all, /due for breeding|held still for breeding|stick reader/i);
});

test('farmer first: no technician or MD in the walkthrough', () => {
  const all = SCENES.map((s) => s.caption + ' ' + s.html).join(' ');
  assert.doesNotMatch(all, /technician|\bMD\b|DIY recording/i);
});

test('any scene showing a score also says Estimate', () => {
  for (const s of SCENES) {
    if (/\b[1-5]\.\d\d\b/.test(s.html)) {
      assert.match(s.html, /Estimate/, s.caption);
    }
  }
});

test('scene 3 types 2034: each digit appears when its key is pressed, then ✓', () => {
  const html = SCENES[2].html;
  const digits = [...html.matchAll(/class="t-digit" style="--d:([\d.]+)s">(\d)</g)].map((m) => [m[2], m[1]]);
  const keys = [...html.matchAll(/class="t-press" style="--d:([\d.]+)s">([\d✓])</g)].map((m) => [m[2], m[1]]);
  assert.deepEqual(digits.map((d) => d[0]).join(''), '2034');
  const delays = digits.map((d) => Number(d[1]));
  assert.deepEqual([...delays].sort((a, b) => a - b), delays); // left to right
  for (const [digit, delay] of digits) {
    assert.ok(keys.some(([k, d]) => k === digit && d === delay), `key ${digit} pressed at ${delay}s`);
  }
  const tick = keys.find(([k]) => k === '✓');
  assert.ok(tick && Number(tick[1]) > Math.max(...delays), '✓ pressed last');
});

import { BODY_AREAS } from '../scoring.js';
import { TARGETS } from '../targets.js';

test('scene 6 uses the same body areas and breeding band as the app', () => {
  const html = SCENES[5].html;
  for (const a of BODY_AREAS) assert.ok(html.includes(a), a);
  const t = TARGETS.breeding;
  assert.ok(html.includes(`${t.min.toFixed(2)}–${t.max.toFixed(2)}`), 'breeding band');
});
