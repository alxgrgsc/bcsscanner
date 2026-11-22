# BCS Scanner Slice 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One phone page (Scan → Result) with sample BCS results, published from a public GitHub repo on GitHub Pages.

**Architecture:** Static files, no build step. Logic lives in small ES modules (`targets.js`, `scoring.js`) that run both in the browser and under Node's built-in test runner; `app.js` wires them to the two views in `index.html`.

**Tech Stack:** HTML, CSS, vanilla JavaScript (ES modules), `node --test` (Node 24) for logic tests, `python -m http.server` for local preview, `gh` CLI for the repo and Pages.

**Spec:** `docs/superpowers/specs/2026-11-22-bcs-scanner-slice1-design.md`

## Global Constraints

- Working title **BCS Scanner**. The word "BóScan", its logo and wordmark appear nowhere.
- Every score is labelled *estimate*. A strip "Prototype · sample data" is on every view.
- No accuracy claims, invented numbers, partners or prices.
- Target bands come only from `targets.js`. Until `TARGETS_CHECKED` is `true` the page shows "Targets under review".
- Placeholder bands (handoff, dairy): calving 2.25–3.0, breeding 2.75–3.5. Dry-off has **no number in the handoff**, so it is `null` and shows "No target set yet" (not invented).
- Scores in quarter points, 1.0 to 5.0.
- Plain English, Irish/UK spelling, no course jargon. Big buttons (min 56 px tall), high contrast.
- Colours: oat `#E8DCC4`, rust `#A44A2A`, olive `#6B7A3A`, dark brown `#3A2E26`, cream `#FAF6EC`. Font Poppins (Google Fonts link is fine for Slice 1).
- README says the prototype was built with Claude (course AI-use rule).
- Repo: `C:\Projects\bcsscanner`, public, GitHub account `alxgrgsc`, name `bcsscanner`.
- Work on branch `feature/slice-1`; merge to `main` with a merge commit (Alex's rule). `main` only gets the initial docs commit directly, because a new repo needs one.

## Review Focus

1. **Camera refused or missing** (laptop, permission denied, in-app browser): the Scan view shows the sample cow drawing instead and Score still works. Pinned in Task 2 manual check.
2. **iPhone Safari camera:** the `<video>` needs `playsinline`, `muted`, `autoplay`, or it opens full screen / stays black. Pinned in Task 2 code step.
3. **Adjust past the ends:** − at 1.0 and + at 5.0 stay put. Pinned in Task 1 tests.
4. **Opening `index.html` by double-click (file://):** ES modules don't load. README tells people to use the link or `python -m http.server`. Pinned in Task 1 README step.
5. **No tag number typed:** Score is still allowed; the Result shows "Tag: not entered". Pinned in Task 2.

---

### Task 1: Repo, targets and scoring logic

**Files:**
- Create: `README.md`, `.gitignore`, `targets.js`, `scoring.js`, `tests/scoring.test.js`

**Interfaces:**
- Produces:
  - `targets.js`: `export const TARGETS_CHECKED = false;` and `export const TARGETS = { calving: {label: 'Calving', min: 2.25, max: 3.0}, breeding: {label: 'Breeding', min: 2.75, max: 3.5}, dryoff: {label: 'Dry-off', min: null, max: null} }`
  - `scoring.js`:
    - `BODY_AREAS: string[]` = `['Hook bones', 'Pin bones', 'Tailhead', 'Short ribs', 'Backbone']`
    - `pickSampleResult(n: number) -> {score: number, areas: {name: string, score: number}[]}` — returns `SAMPLE_RESULTS[n % SAMPLE_RESULTS.length]`; 6 hand-written samples between 2.0 and 3.75, each with 5 area scores in quarter points.
    - `adjustScore(score: number, delta: number) -> number` — clamps to 1.0..5.0, rounds to nearest 0.25.
    - `compareToTarget(score: number, stageKey: string) -> 'under' | 'in' | 'over' | 'none'`
    - `formatScore(score: number) -> string` — always two decimals (`'2.75'`, `'3.00'`).

- [ ] **Step 1: Init the repo on `main` with the docs only**

```bash
cd C:/Projects/bcsscanner && git init -b main && git add docs && git commit -m "docs: Slice 1 design and plan"
git checkout -b feature/slice-1
```

- [ ] **Step 2: Write the failing tests** in `tests/scoring.test.js` (`node:test`, `node:assert/strict`):

```js
test('adjust clamps at the ends', () => {
  assert.equal(adjustScore(1.0, -0.25), 1.0);
  assert.equal(adjustScore(5.0, 0.25), 5.0);
  assert.equal(adjustScore(2.75, 0.25), 3.0);
});
test('compare to target', () => {
  assert.equal(compareToTarget(2.5, 'breeding'), 'under');
  assert.equal(compareToTarget(2.75, 'breeding'), 'in');   // ends count as in
  assert.equal(compareToTarget(3.75, 'breeding'), 'over');
  assert.equal(compareToTarget(3.0, 'dryoff'), 'none');    // no target set
});
test('sample results cycle and stay in quarter points', () => {
  for (let n = 0; n < 12; n++) {
    const r = pickSampleResult(n);
    assert.equal(r.score * 4 % 1, 0);
    assert.equal(r.areas.length, 5);
  }
  assert.notEqual(pickSampleResult(0).score, pickSampleResult(1).score);
});
test('format', () => { assert.equal(formatScore(3), '3.00'); });
test('targets not yet checked', () => { assert.equal(TARGETS_CHECKED, false); });
```

- [ ] **Step 3: Run, expect FAIL** — `node --test tests/` → fails, modules missing.

- [ ] **Step 4: Write `targets.js` and `scoring.js`** to the Interfaces above. `targets.js` opens with a plain comment for Nóra/Emma: what each number means, where it came from (training videos, handoff 22 Nov 2026), and "set TARGETS_CHECKED to true once checked".

- [ ] **Step 5: Run, expect PASS** — `node --test tests/` → 5 passing.

- [ ] **Step 6: README + .gitignore.** README: what this is (student prototype, sample data, Team 5 MSc AgInnovate, University of Galway), how to view (the Pages link; locally `python -m http.server 8000` then `http://localhost:8000`, not double-click), how to run tests, where to fix targets, "Built with Claude (Anthropic)". `.gitignore`: `.DS_Store`, `Thumbs.db`, `node_modules/`.

- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat: targets and sample scoring logic with tests"`

---

### Task 2: The page (Scan and Result views)

**Files:**
- Create: `index.html`, `style.css`, `app.js`, `assets/cow-outline.svg`, `assets/sample-cow.svg`

**Interfaces:**
- Consumes: everything Task 1 produces.

- [ ] **Step 1: `index.html`** — viewport meta, Poppins link, `<script type="module" src="app.js">`. Two sections, `#scan` and `#result`, only one visible at a time. A fixed top strip: "BCS Scanner · Prototype · sample data".
  - `#scan`: `<video playsinline muted autoplay>` filling the frame with `cow-outline.svg` on top (rear view: hooks, pins, tailhead visible); `<img src="assets/sample-cow.svg">` hidden by default; tag input (`inputmode="numeric"`, placeholder "Tag number"); stage picker (Calving / Breeding / Dry-off, default Breeding); **Score** button.
  - `#result`: tag line, big score with the word "Estimate" beside it, five area rows (name + score + small bar), target line, **Agree** and **Adjust** (− / +), **Scan next cow**, and "Targets under review" when `TARGETS_CHECKED` is false.

- [ ] **Step 2: `app.js`**
  - `startCamera()`: `navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}, audio: false})`; on any error or missing API, hide the video and show `sample-cow.svg` with the line "Camera not available, using a sample cow".
  - Score: a short olive scan-line sweep (about 1 s, CSS animation), then `pickSampleResult(count++)` and show `#result`.
  - Target line: `under` → "Below the breeding target (2.75–3.50)"; `in` → "Within target"; `over` → "Above target"; `none` → "No target set yet".
  - Adjust −/+ calls `adjustScore(current, ±0.25)`, redraws score and target line, and swaps the "Estimate" label for "Adjusted by you". Agree swaps it for "Agreed by you".
  - No tag → "Tag: not entered".
  - Scan next cow → clears the tag, goes back to `#scan`, keeps the stage.

- [ ] **Step 3: `style.css`** — the Global Constraints colours, cream background, dark brown text, rust primary buttons with oat text, min 56 px buttons, phone first (max-width 480 px, centred on a laptop).

- [ ] **Step 4: Check it in a real browser**

Run: `python -m http.server 8000` in the repo, open `http://localhost:8000` at phone width (390 px).
Expected, every one true:
- the strip is visible on both views; no "BóScan" anywhere (`grep -ri boscan --exclude-dir=docs .` returns nothing)
- with camera denied: sample cow shows, Score works
- Score with no tag → "Tag: not entered"
- five Scores in a row show different results
- − at 1.00 stays 1.00; + at 5.00 stays 5.00
- Dry-off → "No target set yet"; "Targets under review" shows
- `node --test tests/` still passes

- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: Scan and Result views with sample results"`

---

### Task 3: Merge and publish

- [ ] **Step 1: Merge** — `git checkout main && git merge --no-ff feature/slice-1 -m "Merge feature/slice-1: Scan and Result prototype"`

- [ ] **Step 2: Create the public repo and push** (Alex approved public, 22 Nov 2026)

```bash
gh repo create alxgrgsc/bcsscanner --public --source . --remote origin
git push -u origin main
```

- [ ] **Step 3: Turn on Pages from `main`, root**

```bash
gh api -X POST repos/alxgrgsc/bcsscanner/pages -f "source[branch]=main" -f "source[path]=/"
```

- [ ] **Step 4: Check the live link** — `https://alxgrgsc.github.io/bcsscanner/` returns 200 (may take 1–2 minutes), and on a phone the camera prompt appears and Score works.
