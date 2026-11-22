import { TARGETS, TARGETS_CHECKED } from './targets.js';
import { pickSampleResult, adjustScore, compareToTarget, formatScore } from './scoring.js';

const $ = (id) => document.getElementById(id);

let scanCount = 0;
let current = null; // { tag, stage, score, areas }

async function startCamera() {
  const video = $('camera');
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('no camera API');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    });
    video.srcObject = stream;
    // The sample cow shows until the camera actually starts.
    video.hidden = false;
    $('sample-cow').hidden = true;
  } catch {
    $('camera-note').hidden = false;
  }
}

function targetText(score, stage) {
  const t = TARGETS[stage];
  const name = t.label.toLowerCase();
  const range = t.min === null ? '' : ` (${formatScore(t.min)}–${formatScore(t.max)})`;
  switch (compareToTarget(score, stage)) {
    case 'under': return `Below the ${name} target${range}`;
    case 'over': return `Above the ${name} target${range}`;
    case 'in': return `Within the ${name} target${range}`;
    default: return `No target set yet for ${name}`;
  }
}

function showResult(label) {
  const { tag, stage, score, areas } = current;
  $('result-tag').textContent = tag ? `Tag: ${tag}` : 'Tag: not entered';
  $('result-score').textContent = formatScore(score);
  $('result-label').textContent = label;

  const target = $('result-target');
  target.textContent = targetText(score, stage);
  target.className = `target ${compareToTarget(score, stage)}`;
  $('targets-review').hidden = TARGETS_CHECKED;

  const list = $('result-areas');
  list.replaceChildren(...areas.map((a) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = a.name;
    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = formatScore(a.score);
    const bar = document.createElement('span');
    bar.className = 'bar';
    const fill = document.createElement('span');
    fill.style.width = `${(a.score / 5) * 100}%`;
    bar.append(fill);
    li.append(name, num, bar);
    return li;
  }));
}

function score() {
  const btn = $('score-btn');
  const line = document.querySelector('.scanline');
  btn.disabled = true;
  line.hidden = false;
  setTimeout(() => {
    line.hidden = true;
    btn.disabled = false;
    const sample = pickSampleResult(scanCount++);
    current = {
      tag: $('tag').value.trim(),
      stage: $('stage').value,
      score: sample.score,
      areas: sample.areas,
    };
    $('scan').hidden = true;
    $('result').hidden = false;
    showResult('Estimate');
    window.scrollTo(0, 0);
  }, 1000);
}

function adjust(delta) {
  current.score = adjustScore(current.score, delta);
  showResult('Adjusted by you');
}

function nextCow() {
  $('tag').value = '';
  $('result').hidden = true;
  $('scan').hidden = false;
  window.scrollTo(0, 0);
}

$('score-btn').addEventListener('click', score);
$('minus-btn').addEventListener('click', () => adjust(-0.25));
$('plus-btn').addEventListener('click', () => adjust(0.25));
$('agree-btn').addEventListener('click', () => showResult('Agreed by you'));
$('next-btn').addEventListener('click', nextCow);

startCamera();
