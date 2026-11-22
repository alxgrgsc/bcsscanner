import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TARGETS_CHECKED } from '../targets.js';
import { adjustScore, compareToTarget, pickSampleResult, formatScore } from '../scoring.js';

test('adjust clamps at the ends', () => {
  assert.equal(adjustScore(1.0, -0.25), 1.0);
  assert.equal(adjustScore(5.0, 0.25), 5.0);
  assert.equal(adjustScore(2.75, 0.25), 3.0);
});

test('compare to target', () => {
  assert.equal(compareToTarget(2.5, 'breeding'), 'under');
  assert.equal(compareToTarget(2.75, 'breeding'), 'in'); // ends count as in
  assert.equal(compareToTarget(3.75, 'breeding'), 'over');
  assert.equal(compareToTarget(3.0, 'dryoff'), 'none'); // no target set
});

test('sample results cycle and stay in quarter points', () => {
  for (let n = 0; n < 12; n++) {
    const r = pickSampleResult(n);
    assert.equal((r.score * 4) % 1, 0);
    assert.equal(r.areas.length, 5);
  }
  assert.notEqual(pickSampleResult(0).score, pickSampleResult(1).score);
});

test('format', () => {
  assert.equal(formatScore(3), '3.00');
});

test('targets not yet checked', () => {
  assert.equal(TARGETS_CHECKED, false);
});

import { resultLabel } from '../scoring.js';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

test('every label still says estimate', () => {
  assert.equal(resultLabel('new'), 'Estimate');
  assert.equal(resultLabel('adjusted'), 'Estimate · adjusted by you');
  assert.equal(resultLabel('agreed'), 'Estimate · agreed by you');
});

test('the unagreed name appears nowhere outside docs', () => {
  const skip = new Set(['docs', '.git', '.superpowers', 'node_modules', 'tests']);
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (skip.has(name)) continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else files.push(p);
    }
  };
  walk('.');
  const hits = files.filter((f) => /b.scan/i.test(readFileSync(f, 'utf8')));
  assert.deepEqual(hits, []);
});
