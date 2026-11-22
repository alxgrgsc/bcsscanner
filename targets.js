// Body Condition Score (BCS) targets for dairy cows, by stage.
//
// Source: Teagasc BCS sheet (teagasc.ie/wp-content/uploads/media/website/events/2023/BCS.pdf),
// found 22 Nov 2026 through a web search, not yet read line by line.
//   Pre-calving       3.0 to 3.5   (aim 3.25)
//   Start of breeding 2.75 to 3.25 (aim 2.9)
//   Drying off        2.75 to 3.25 (aim 3.0)
//
// For Nóra and Emma: please check these against the Teagasc sheet and change
// them here if needed. On the 1 (very thin) to 5 (very fat) scale.
// null means "no target set yet"; the app says so instead of guessing.
//
// When you've checked them, change TARGETS_CHECKED to true. Until then the
// app shows "Targets under review".

export const TARGETS_CHECKED = false;

export const TARGETS = {
  calving: { label: 'Pre-calving', min: 3.0, max: 3.5 },
  breeding: { label: 'Breeding', min: 2.75, max: 3.25 },
  dryoff: { label: 'Dry-off', min: 2.75, max: 3.25 },
};
