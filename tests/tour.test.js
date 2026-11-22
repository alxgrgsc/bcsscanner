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
