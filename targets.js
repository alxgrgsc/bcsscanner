// Body Condition Score (BCS) targets for dairy cows, by stage.
//
// For Nóra and Emma: these are PLACEHOLDERS. The numbers came from training
// videos (BóScan handoff, 22 Nov 2026) and the videos didn't fully agree.
// Please check them against Teagasc guidance and change them here.
//
// - min / max: the target range, on the 1 (very thin) to 5 (very fat) scale.
// - null means "no target set yet". The app says so instead of guessing.
//
// When you've checked them, change TARGETS_CHECKED to true. Until then the
// app shows "Targets under review".

export const TARGETS_CHECKED = false;

export const TARGETS = {
  calving: { label: 'Calving', min: 2.25, max: 3.0 },
  breeding: { label: 'Breeding', min: 2.75, max: 3.5 },
  dryoff: { label: 'Dry-off', min: null, max: null },
};
