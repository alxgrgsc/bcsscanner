// Sample scoring for the prototype. Nothing here looks at the photo:
// every result is made up, so the app labels it "sample data".
import { TARGETS } from './targets.js';

// The three areas Teagasc scores by hand (Teagasc BCS sheet).
export const BODY_AREAS = ['Pins and tailhead', 'Loin (short ribs)', 'Ribs'];

// Hand-written samples. Area scores in the same order as BODY_AREAS.
const SAMPLE_RESULTS = [
  { score: 2.75, areas: [2.5, 2.75, 3.0] },
  { score: 3.25, areas: [3.25, 3.0, 3.5] },
  { score: 2.5, areas: [2.25, 2.5, 2.75] },
  { score: 3.0, areas: [3.0, 2.75, 3.25] },
  { score: 2.0, areas: [1.75, 2.0, 2.25] },
  { score: 3.75, areas: [3.5, 3.75, 4.0] },
];

export function pickSampleResult(n) {
  const s = SAMPLE_RESULTS[((n % SAMPLE_RESULTS.length) + SAMPLE_RESULTS.length) % SAMPLE_RESULTS.length];
  return {
    score: s.score,
    areas: BODY_AREAS.map((name, i) => ({ name, score: s.areas[i] })),
  };
}

export function adjustScore(score, delta) {
  const next = Math.round((score + delta) * 4) / 4;
  return Math.min(5, Math.max(1, next));
}

export function compareToTarget(score, stageKey) {
  const t = TARGETS[stageKey];
  if (!t || t.min === null || t.max === null) return 'none';
  if (score < t.min) return 'under';
  if (score > t.max) return 'over';
  return 'in';
}

export function formatScore(score) {
  return score.toFixed(2);
}

// The label beside the score. It always keeps the word "Estimate".
export function resultLabel(state) {
  if (state === 'adjusted') return 'Estimate · adjusted by you';
  if (state === 'agreed') return 'Estimate · agreed by you';
  return 'Estimate';
}
