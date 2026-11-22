// Mounts the "How it works" walkthrough into any element.
// Used on the app page now; the landing page can include the same files later.
import { SCENES } from './scenes.js';
import { createTour } from './tour-state.js';

export function mountTour(el, { sceneMs = 4000 } = {}) {
  const tour = createTour(SCENES.length);
  let timer = null;
  let playing = true;

  el.classList.add('t-wrap');
  el.innerHTML = `
    <div class="t-stage" aria-live="polite"></div>
    <p class="t-caption"></p>
    <div class="t-controls">
      <button type="button" class="t-btn" data-act="prev" aria-label="Previous step">◀&#xFE0E;</button>
      <button type="button" class="t-btn" data-act="pause" aria-label="Pause">❚❚</button>
      <button type="button" class="t-btn" data-act="next" aria-label="Next step">▶&#xFE0E;</button>
    </div>
    <div class="t-dots">
      ${SCENES.map((s, i) => `<button type="button" data-go="${i}" aria-label="${s.caption}"></button>`).join('')}
    </div>`;

  const stage = el.querySelector('.t-stage');
  const caption = el.querySelector('.t-caption');
  const pauseBtn = el.querySelector('[data-act="pause"]');
  const dots = [...el.querySelectorAll('.t-dots button')];

  function render() {
    const scene = SCENES[tour.index];
    // Re-rendering restarts the scene's CSS animations.
    stage.innerHTML = scene.html;
    caption.textContent = scene.caption;
    dots.forEach((d, i) => d.classList.toggle('on', i === tour.index));
  }

  function schedule() {
    clearTimeout(timer);
    if (playing) {
      timer = setTimeout(() => {
        tour.next();
        render();
        schedule();
      }, sceneMs);
    }
  }

  function setPlaying(on) {
    playing = on;
    pauseBtn.textContent = on ? '❚❚' : '▶︎ Play';
    pauseBtn.setAttribute('aria-label', on ? 'Pause' : 'Play');
    schedule();
  }

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'pause') return setPlaying(!playing);
    if (act === 'prev') tour.prev();
    else if (act === 'next') tour.next();
    else if (btn.dataset.go !== undefined) tour.goTo(Number(btn.dataset.go));
    else return;
    render();
    schedule(); // a tap restarts the 4 s, so it never jumps twice
  });

  render();
  schedule();
  return { pause: () => setPlaying(false) };
}
