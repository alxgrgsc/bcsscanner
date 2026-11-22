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
    '1. Arrive at the farm',
    '2. Cow held for breeding',
    '3. Identify the cow',
    '4. Line up the outline',
    '5. Scan',
    '6. Estimate',
    '7. Check by hand',
    '8. Next cow',
    '9. Farm report',
    '10. Back at the office',
  ]);
});

test('any scene showing a score also says Estimate', () => {
  for (const s of SCENES) {
    if (/\b[1-5]\.\d\d\b/.test(s.html)) {
      assert.match(s.html, /Estimate/, s.caption);
    }
  }
});
