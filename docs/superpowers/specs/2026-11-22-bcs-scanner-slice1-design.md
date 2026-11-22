# BCS Scanner prototype, Slice 1: design

Written 22 Nov 2026 by Alex (Innovation and Technology Lead, Team 5, MSc AgInnovate,
University of Galway) with Claude. Source context: `BOSCAN_HANDOFF.md` and the team
WhatsApp chat up to 21 Nov 2026.

## 1. Why

The team has a run of interviews lined up with **technicians and MDs at breeding (AI)
companies** (Munster Bovine, Progressive Genetics). We want technicians to react to a real
screen on their own phone, not a description.

**Start small.** This is not a product. Slice 1 is the smallest thing worth showing; each
later slice is added only after the interviews ask for it. Nothing gets built ahead of need,
so there is never a big pile of code we don't know whether to keep.

**Name:** working title **BCS Scanner**. "BóScan" is a suggestion, not agreed by the team,
so it does not appear anywhere in Slice 1 (no BóScan logo or wordmark).

## 2. Slice 1: what it is

One phone page with two views, sample results only:

```
[Scan]                               [Result]
 live camera + cow outline guide  ->  Estimated BCS 2.75  (estimate)
 tag number box                       body areas: hooks, pins, tailhead,
 [Score]                                          short ribs, backbone
                                      target band for her stage
                                      [Agree]  [Adjust -/+ 0.25]
                                      [Scan next cow]
```

- **Scan:** the phone's rear camera with a rear-view cow outline drawn over it, a tag number
  box and a Score button. If the camera is refused or missing, a sample cow photo stands in.
- **Result:** a sample score in quarter points, always labelled *estimate*; sub-scores for
  five body areas; the target band for a stage picked from a short list (calving, breeding,
  dry-off); Agree or Adjust. The person scanning has the final say.
- A strip on every view: "Prototype · sample data".
- Sample results are picked from a small list so repeated scans look different.

**Success:** in an interview someone opens the link, scans a pretend cow and gets to the
result in under a minute, and tells us what is wrong with it.

## 3. Not in Slice 1 (maybe later, only if the interviews ask)

2. Farm visit: today's farms, cows on a farm, end-of-visit farm report
3. MD company view across technicians
4. Landing page with sign-up (needs a form service and a team email)
5. Real scoring from photos (Claude vision), once there is a hand-scored photo set

## 4. Approach

| | Approach | Trade-off |
|---|---|---|
| **A (picked)** | Plain HTML/CSS/JavaScript, no build step, published on GitHub Pages | Free, opens fast on any phone, https for the camera |
| B | Flask app like Alex's work tools | Needs a server just to show sample data |
| C | Design-tool mockup | Not a real phone page; nothing carries over |

Picked by Alex 22 Nov 2026. **Public repo** (Alex 22 Nov 2026): GitHub's free plan only
publishes Pages from public repos, and the repo holds no keys or personal data.

## 5. Files

```
bcsscanner/                  C:\Projects\bcsscanner, public GitHub repo -> GitHub Pages
├── index.html               The page
├── app.js                   Scan/Result views + sample scoring
├── style.css
├── targets.js               Target bands per stage, the one file Nóra/Emma correct
├── assets/                  Cow outline, sample cow photo
├── README.md                What it is, how to run, "built with Claude" note
└── docs/superpowers/specs/  This document
```

## 6. Rules

- Every score says *estimate*. No accuracy claims, invented numbers, partners or prices.
- Target bands are the handoff's placeholders (dairy, from training videos) and the page
  shows "targets under review" until a flag in `targets.js` says Nóra or Emma checked them.
- Plain English, Irish/UK spelling, no course jargon.
- Big buttons, high contrast: outdoors, gloves, bad light.
- Colours: the team's earthy palette (oat, rust, olive, dark brown). Font Poppins. No logo.
- README notes the prototype was built with Claude (course AI-use rule).

## 7. Left to the builder

File internals, the outline drawing, the sample photo, exact wording within the rules, a light
test that the page loads and reads targets only from `targets.js`.
