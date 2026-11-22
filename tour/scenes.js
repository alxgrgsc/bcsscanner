// The "How it works" walkthrough: a farmer's own milk recording, scene by scene.
// Everything shown is sample data. Scenes 1, 7 to 10 are pictures of
// screens that don't exist in the app yet.

// A cow seen from behind, standing in a parlour stall.
const COW = `
<svg class="t-cow" viewBox="0 0 300 400" aria-hidden="true">
  <rect x="20" y="30" width="12" height="370" fill="#8a8a8a"/>
  <rect x="268" y="30" width="12" height="370" fill="#8a8a8a"/>
  <path d="M40 90 Q150 50 260 90 L265 120 Q255 200 225 250 L215 380 L190 380 L185 270 L115 270 L110 380 L85 380 L75 250 Q45 200 35 120 Z" fill="#2b2420"/>
  <path d="M70 110 Q150 85 230 110 L228 170 Q150 150 72 170 Z" fill="#f3efe6"/>
  <path d="M150 120 L150 290" stroke="#1b1613" stroke-width="10" stroke-linecap="round"/>
</svg>`;

// The guide outline drawn over the cow on the phone screen.
const OUTLINE = `
<svg class="t-outline" viewBox="0 0 300 400" fill="none" stroke="#FAF6EC" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 8" aria-hidden="true">
  <path d="M40 90 Q150 50 260 90 L265 120 Q255 200 225 250 L215 380 M75 380 L75 250 Q45 200 35 120 Z"/>
  <circle cx="55" cy="95" r="10"/><circle cx="245" cy="95" r="10"/>
  <circle cx="125" cy="165" r="7"/><circle cx="175" cy="165" r="7"/>
</svg>`;

const phone = (inner, cls = '') =>
  `<div class="t-phone ${cls}"><div class="t-screen">${inner}</div></div>`;

const note = (text, cls = '') => `<p class="t-note ${cls}">${text}</p>`;

// Scene 3: the cow number is typed key by key. [key, seconds into the scene]
const TYPED = [['2', 0.6], ['0', 1.0], ['3', 1.4], ['4', 1.8], ['✓', 2.4]];
const KEYPAD = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '✓'];

const area = (name, score, cls = '') =>
  `<li class="${cls}"><span>${name}</span><b>${score}</b></li>`;

export const SCENES = [
  {
    caption: '1. Milk recording day',
    html: `
      <div class="t-field"></div>
      <div class="t-shed"></div>
      ${phone(`
        <p class="t-small">Today: milk recording</p>
        <p class="t-big">Maguire's, Co. Cork</p>
        <p>120 cows · evening milking</p>
        <ul class="t-tags">
          <li>Meters and sample bottles</li>
          <li>BCS camera</li>
        </ul>`, 't-slide-up')}`,
  },
  {
    caption: '2. Set up in the parlour',
    html: `
      <div class="t-shed-bg"></div>
      ${COW}
      <div class="t-clip t-fade-in"></div>
      ${note('The farmer puts the meters on and clips the phone up in the pit, facing the cows from behind.', 't-fade-in')}`,
  },
  {
    caption: '3. Cow comes in',
    html: `
      ${phone(`
        <p class="t-small">Milk recording · cow number</p>
        <div class="t-input">${TYPED.filter(([d]) => d !== '✓').map(([d, s]) => `<span class="t-digit" style="--d:${s}s">${d}</span>`).join('')}<span class="t-caret"></span></div>
        <div class="t-keys">${KEYPAD.map((k) => {
          const hit = TYPED.find(([d]) => d === String(k));
          return hit ? `<span class="t-press" style="--d:${hit[1]}s">${k}</span>` : `<span>${k}</span>`;
        }).join('')}</div>`, 't-phone-high')}
      ${note('The farmer types her number for the milk record.', 't-fade-in')}`,
  },
  {
    caption: '4. Take the photo',
    html: `
      ${phone(`<div class="t-view">${COW}<div class="t-align">${OUTLINE}</div><div class="t-flash"></div></div>`, 't-phone-tall')}
      ${note('Camera will activate to take the photo.', 't-fade-in')}`,
  },
  {
    caption: '5. Scan',
    html: phone(`<div class="t-view">${COW}${OUTLINE}<div class="t-sweep"></div></div>`, 't-phone-tall'),
  },
  {
    caption: '6. Estimate',
    html: phone(`
      <p class="t-small">Cow 2034</p>
      <p class="t-score">2.50 <span class="t-lbl">Estimate</span></p>
      <p class="t-under">Below the breeding target (2.75–3.25)</p>
      <ul class="t-areas">
        ${area('Pins and tailhead', '2.25', 't-thin')}
        ${area('Loin (short ribs)', '2.50')}
        ${area('Ribs', '2.75')}
      </ul>
      <p class="t-flag">Flagged to check</p>`, 't-phone-tall'),
  },
  {
    caption: '7. Next cows',
    html: `
      <div class="t-herd">
        ${Array.from({ length: 24 }, (_, i) => `<span class="${[4, 11, 17].includes(i) ? 't-flagged' : ''}" style="--d:${(i * 0.09).toFixed(2)}s"></span>`).join('')}
      </div>
      ${note('The whole herd, a few seconds each. 120 of 120 scored during milking.', 't-fade-in')}`,
  },
  {
    caption: '8. Check the flagged cows',
    html: `
      ${phone(`
        <p class="t-small">Cow 2034 · flagged</p>
        <div class="t-score t-swap">
          <div class="t-old">2.50 <span class="t-lbl">Estimate</span></div>
          <div class="t-new">2.75 <span class="t-lbl">Estimate · adjusted by you</span></div>
        </div>`)}
      ${note('After milking, the farmer checks the flagged cows and agrees or adjusts.', 't-fade-in')}`,
  },
  {
    caption: '9. Herd report',
    html: phone(`
      <p class="t-small">Maguire's, Co. Cork · sample</p>
      <p class="t-big">120 cows scored</p>
      <ul class="t-bars">
        <li><span>Below target</span><i style="--w:15%" class="t-bar-under"></i><b>18</b></li>
        <li><span>Within target</span><i style="--w:78%" class="t-bar-in"></i><b>94</b></li>
        <li><span>Above target</span><i style="--w:7%" class="t-bar-over"></i><b>8</b></li>
      </ul>
      <p class="t-small">Cows to watch: 2034, 1187, 0921, 1450 …</p>
      <p class="t-sent t-pop">Added to the milk recording report ✓</p>
      <p class="t-sent t-pop" style="animation-delay:2.2s">Report emailed ✅</p>`, 't-phone-tall'),
  },
  {
    caption: '10. Over the season',
    html: `
      ${phone(`
        <p class="t-small">Maguire's, Co. Cork · sample</p>
        <p class="t-big">Cows below target, each recording</p>
        <ul class="t-bars">
          <li><span>March</span><i style="--w:28%" class="t-bar-under"></i><b>34</b></li>
          <li><span>May</span><i style="--w:21%" class="t-bar-under"></i><b>25</b></li>
          <li><span>July</span><i style="--w:15%" class="t-bar-under"></i><b>18</b></li>
          <li><span>September</span><i style="--w:10%" class="t-bar-under"></i><b>12</b></li>
        </ul>`, 't-phone-tall')}
      ${note('Every milk recording adds a score, so the farmer sees the herd change over the season.', 't-fade-in')}`,
  },
];
