// The "How it works" walkthrough: one milk recording visit, scene by scene.
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

// A second note for farms that record their own milk (no technician).
const diy = (text) => `<p class="t-note t-diy t-fade-in"><b>DIY recording:</b> ${text}</p>`;

const area = (name, score, cls = '') =>
  `<li class="${cls}"><span>${name}</span><b>${score}</b></li>`;

export const SCENES = [
  {
    caption: '1. Arrive for milk recording',
    html: `
      <div class="t-field"></div>
      <div class="t-shed"></div>
      ${phone(`
        <p class="t-small">Today's milk recording</p>
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
      ${note('The meters go on, and the phone is clipped up in the pit, facing the cows from behind.', 't-fade-in t-note-high')}
      ${diy('the farmer sets up the meters and the phone.')}`,
  },
  {
    caption: '3. Cow comes in',
    html: `
      ${phone(`
        <p class="t-small">Milk recording · cow number</p>
        <p class="t-big t-type">2034</p>
        <div class="t-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '✓'].map((k) => `<span>${k}</span>`).join('')}</div>`, 't-phone-high')}
      ${note('The technician types her number for the milk record, as they do now.', 't-fade-in t-note-high')}
      ${diy('the farmer types the number while milking.')}`,
  },
  {
    caption: '4. The photo takes itself',
    html: `
      ${phone(`<div class="t-view">${COW}<div class="t-align">${OUTLINE}</div><div class="t-flash"></div></div>`, 't-phone-tall')}
      ${note('Entering the number takes the photo. No extra step.', 't-fade-in')}`,
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
      <p class="t-under">Below target (2.75–3.50)</p>
      <ul class="t-areas">
        ${area('Hook bones', '2.50')}
        ${area('Pin bones', '2.25', 't-thin')}
        ${area('Tailhead', '2.75')}
        ${area('Short ribs', '2.50')}
        ${area('Backbone', '2.50')}
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
      <div class="t-two">
        <div class="t-card">
          <p class="t-small">Technician, before leaving</p>
          <p class="t-score t-score-sm">2.75 <span class="t-lbl">Estimate · adjusted by you</span></p>
          <p class="t-small">Checks cow 2034 by eye and hand.</p>
        </div>
        <div class="t-card">
          <p class="t-small">Farmer, later, from the report</p>
          <p class="t-score t-score-sm">2.50 <span class="t-lbl">Estimate · agreed by you</span></p>
          <p class="t-small">Checks the flagged cows at the next milking.</p>
        </div>
      </div>
      ${diy('the farmer does the checking.')}`,
  },
  {
    caption: '9. Farm report',
    html: phone(`
      <p class="t-small">Maguire's, Co. Cork · sample</p>
      <p class="t-big">120 cows scored</p>
      <ul class="t-bars">
        <li><span>Below target</span><i style="--w:15%" class="t-bar-under"></i><b>18</b></li>
        <li><span>Within target</span><i style="--w:78%" class="t-bar-in"></i><b>94</b></li>
        <li><span>Above target</span><i style="--w:7%" class="t-bar-over"></i><b>8</b></li>
      </ul>
      <p class="t-small">Cows to watch: 2034, 1187, 0921, 1450 …</p>
      <p class="t-sent t-pop">Added to the milk recording report ✓</p>`, 't-phone-tall'),
  },
  {
    caption: '10. Back at the office',
    html: `
      <div class="t-laptop">
        <div class="t-laptop-screen">
          <p class="t-small">This week · all technicians · sample</p>
          <ul class="t-bars">
            <li><span>Johnny</span><i style="--w:90%" class="t-bar-in"></i><b>9 herds</b></li>
            <li><span>Stephen</span><i style="--w:80%" class="t-bar-in"></i><b>8 herds</b></li>
            <li><span>Padraic</span><i style="--w:58%" class="t-bar-in"></i><b>6 herds</b></li>
          </ul>
          <p class="t-under">Herds with the most cows below target: Maguire's, Kelly's, Doyle's</p>
        </div>
      </div>
      ${note('The MD sees every herd recorded, across every technician.', 't-fade-in')}`,
  },
];
