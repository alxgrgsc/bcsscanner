# How it works walkthrough Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** A 10-scene auto-playing walkthrough at the top of the app page, reusable on the landing page later.

**Architecture:** `tour/tour-state.js` (pure next/prev/goTo logic, tested), `tour/scenes.js` (scene captions + HTML), `tour/tour.js` (mounts into any element, plays, controls), `tour/tour.css`. `index.html` gets a `#tour` section and a Try it yourself button; `app.js` starts the camera only on that tap.

**Tech Stack:** as Slice 1 (plain ES modules, `node --test`).

**Spec:** `docs/superpowers/specs/2026-11-22-how-it-works-design.md`

## Global Constraints

- Everything from the Slice 1 plan's Global Constraints still holds.
- 10 scenes, captions exactly "1. Arrive at the farm", "2. Cow held for breeding", "3. Identify the cow", "4. Line up the outline", "5. Scan", "6. Estimate", "7. Check by hand", "8. Next cow", "9. Farm report", "10. Back at the office".
- About 4 s per scene; auto-play loops back to scene 1.
- No camera request until Try it yourself is tapped.

## Review Focus

1. Camera prompt on page open: must not happen. Manual check in Task 2.
2. Back on scene 1 goes to 10; Next on 10 goes to 1. Test in Task 1.
3. Tapping Back/Next or a dot while auto-playing resets the 4 s timer (no instant double jump). Manual check in Task 2.
4. Narrow phone (360 px): captions and phone mock fit without sideways scroll. Manual check in Task 2.
5. Score labels in scenes 6–7 keep the word "Estimate". Test in Task 1.

---

### Task 1: Tour state and scenes

**Files:** Create `tour/tour-state.js`, `tour/scenes.js`, `tests/tour.test.js`

**Interfaces (produced):**
- `createTour(count: number) -> { index: number (getter), next(): number, prev(): number, goTo(n: number): number }` — wraps both ways; `goTo` ignores out-of-range.
- `SCENES: { caption: string, html: string }[]` (length 10).

- [ ] Tests: wrap both ways; goTo ignores -1 and 10; 10 scenes; captions as Global Constraints; every scene html that contains a score in `d.dd` form also contains "Estimate".
- [ ] Run `node --test`, expect FAIL (missing modules). Implement. Expect PASS. Commit.

### Task 2: Mount on the app page

**Files:** Create `tour/tour.js`, `tour/tour.css`; Modify `index.html`, `app.js`, `style.css`

- `mountTour(el: HTMLElement, {sceneMs = 4000} = {})` renders stage + caption + controls into `el`, auto-plays, re-renders the scene on change so CSS animations restart.
- `index.html`: `#tour` section first, then a **Try it yourself** button; `#scan` hidden until tapped. `app.js`: `startCamera()` moves into that button's handler.
- [ ] Browser check at ~390 px: no camera prompt on load; all 10 scenes play and loop; Back/Next/dots/pause work; Try it yourself shows Scan and starts the camera; Slice 1 flow still works; `node --test` passes. Commit.

### Task 3: Review, merge, publish

- [ ] Fresh reviewer on the branch; fix Important+ with tests. Merge `--no-ff` to main, push, check the live link.
