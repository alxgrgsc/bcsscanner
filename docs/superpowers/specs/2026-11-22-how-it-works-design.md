# How it works walkthrough (Slice 1.1): short design

Approved by Alex 22 Nov 2026.

**What:** an animated walkthrough of a technician's breeding visit, 10 scenes, captioned,
auto-playing with Pause / Back / Next and scene dots. Built as its own files under `tour/`
so the landing page can include it later unchanged.

**Why:** the team has no cows and no working scorer. The walkthrough shows the process at a
team presentation (and later on the landing page) without camera or cattle.

**Where:** first thing on the app page. Below it, **Try it yourself** opens the existing
Scan → Result. The camera only starts on that tap, so opening the page asks for nothing.

**Scenes:** 1 Arrive at the farm · 2 Cow held for breeding · 3 Identify the cow (stick reader
or camera, drawn only) · 4 Line up the outline · 5 Scan · 6 Estimate (2.50, below breeding
target, pin bones thin) · 7 Check by hand (adjusted to 2.75) · 8 Next cow · 9 End-of-visit
farm report · 10 Back at the office (MD view).

**Not in it:** real tag reading, real scoring, any new app screens. Scenes 1, 9 and 10 are
pictures of screens that don't exist yet.

**Rules:** same as Slice 1: "Prototype · sample data" strip, scores labelled *estimate*,
working title BCS Scanner (no unagreed name), earthy palette, Poppins. Numbers in scenes are
sample data.

**Approaches:** (picked) HTML/CSS/inline-SVG animation in the page; GIF or video file
(rejected: can't be reused as a live part of the landing page, heavier, needs re-recording
on every change).

## Revision 22 Nov 2026: milk recording visit

Rory (19:03-19:06) confirmed the technician is a **milk recording** technician: in the parlour during milking, entering each cow number, very little time per cow; many farmers record themselves (DIY). Alex chose to show both who checks flagged cows (technician before leaving, farmer later) and to add "DIY recording" notes where that case differs (scenes 2, 3, 8). New captions: 1 Arrive for milk recording, 2 Set up in the parlour, 3 Cow comes in, 4 The photo takes itself, 5 Scan, 6 Estimate, 7 Next cows, 8 Check the flagged cows, 9 Farm report, 10 Back at the office.
