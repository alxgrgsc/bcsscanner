// The "How it works" walkthrough: one breeding visit, scene by scene.
// Everything shown is sample data. Scenes 1, 9 and 10 are pictures of
// screens that don't exist in the app yet.

// A cow seen from behind, standing in a crush.
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

const area = (name, score, cls = '') =>
  `<li class="${cls}"><span>${name}</span><b>${score}</b></li>`;

export const SCENES = [
  {
    caption: '1. Arrive at the farm',
    html: `
      <div class="t-field"></div>
      <div class="t-shed"></div>
      ${phone(`
        <p class="t-small">Today's visit</p>
        <p class="t-big">Maguire's, Co. Cork</p>
        <p>18 cows due for breeding</p>
        <ul class="t-tags">
          <li>IE 372 0451 2034</li>
          <li>IE 372 0451 1187</li>
          <li>IE 372 0451 0921</li>
        </ul>`, 't-slide-up')}`,
  },
  {
    caption: '2. Cow held for breeding',
    html: `
      <div class="t-shed-bg"></div>
      ${COW}`,
  },
  {
    caption: '3. Identify the cow',
    html: `
      <svg class="t-eartag" viewBox="0 0 200 200" aria-hidden="true">
        <path d="M100 20 L160 60 L160 160 Q160 180 140 180 L60 180 Q40 180 40 160 L40 60 Z" fill="#F2C230" stroke="#3A2E26" stroke-width="4"/>
        <circle cx="100" cy="50" r="9" fill="#FAF6EC" stroke="#3A2E26" stroke-width="4"/>
        <text x="100" y="110" text-anchor="middle" font-family="Poppins,sans-serif" font-size="20" font-weight="600" fill="#3A2E26">IE 372</text>
        <text x="100" y="140" text-anchor="middle" font-family="Poppins,sans-serif" font-size="20" font-weight="600" fill="#3A2E26">0451 2034</text>
      </svg>
      <div class="t-reader t-reader-move"></div>
      ${phone(`
        <p class="t-small">Tag read</p>
        <p class="t-big t-pop">IE 372 0451 2034</p>`, 't-phone-small')}
      ${note('Stick reader or the phone camera reads the tag.', 't-fade-in')}`,
  },
  {
    caption: '4. Line up the outline',
    html: phone(`<div class="t-view">${COW}<div class="t-align">${OUTLINE}</div></div>`, 't-phone-tall'),
  },
  {
    caption: '5. Scan',
    html: phone(`<div class="t-view">${COW}${OUTLINE}<div class="t-sweep"></div></div>`, 't-phone-tall'),
  },
  {
    caption: '6. Estimate',
    html: phone(`
      <p class="t-small">IE 372 0451 2034</p>
      <p class="t-score">2.50 <span class="t-lbl">Estimate</span></p>
      <p class="t-under">Below the breeding target (2.75–3.50)</p>
      <ul class="t-areas">
        ${area('Hook bones', '2.50')}
        ${area('Pin bones', '2.25', 't-thin')}
        ${area('Tailhead', '2.75')}
        ${area('Short ribs', '2.50')}
        ${area('Backbone', '2.50')}
      </ul>`, 't-phone-tall'),
  },
  {
    caption: '7. Check by hand',
    html: `
      ${phone(`
        <p class="t-small">IE 372 0451 2034</p>
        <div class="t-score t-swap">
          <div class="t-old">2.50 <span class="t-lbl">Estimate</span></div>
          <div class="t-new">2.75 <span class="t-lbl">Estimate · adjusted by you</span></div>
        </div>
        <p class="t-small">The technician has the final say.</p>`)}
      ${note('The technician checks the pins and tailhead by hand and moves the score up a quarter point.', 't-fade-in')}`,
  },
  {
    caption: '8. Next cow',
    html: `
      <div class="t-herd">
        ${Array.from({ length: 18 }, (_, i) => `<span style="--d:${(i * 0.15).toFixed(2)}s"></span>`).join('')}
      </div>
      ${note('About a minute per cow. 18 of 18 scored.', 't-fade-in')}`,
  },
  {
    caption: '9. Farm report',
    html: phone(`
      <p class="t-small">Maguire's, Co. Cork · sample</p>
      <p class="t-big">18 cows scored</p>
      <ul class="t-bars">
        <li><span>Below target</span><i style="--w:22%" class="t-bar-under"></i><b>4</b></li>
        <li><span>Within target</span><i style="--w:72%" class="t-bar-in"></i><b>13</b></li>
        <li><span>Above target</span><i style="--w:6%" class="t-bar-over"></i><b>1</b></li>
      </ul>
      <p class="t-small">Cows to watch: 2034, 1187, 0921, 1450</p>
      <p class="t-sent t-pop">Sent to the farmer ✓</p>`, 't-phone-tall'),
  },
  {
    caption: '10. Back at the office',
    html: `
      <div class="t-laptop">
        <div class="t-laptop-screen">
          <p class="t-small">This week · all technicians · sample</p>
          <ul class="t-bars">
            <li><span>Johnny</span><i style="--w:90%" class="t-bar-in"></i><b>260 cows</b></li>
            <li><span>Stephen</span><i style="--w:80%" class="t-bar-in"></i><b>231 cows</b></li>
            <li><span>Padraic</span><i style="--w:58%" class="t-bar-in"></i><b>168 cows</b></li>
          </ul>
          <p class="t-under">Farms with the most cows below target: Maguire's, Kelly's, Doyle's</p>
        </div>
      </div>
      ${note('The MD sees every visit, across every technician.', 't-fade-in')}`,
  },
];
