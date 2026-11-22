# BCS Scanner (prototype)

A student prototype from Team 5, MSc AgInnovate, University of Galway.

It shows what scanning a cow for Body Condition Score (BCS) could look like when a
farmer does their own milk recording. **Every result is sample data.** Nothing looks at the photo yet,
and no score here is a real measurement.

## See it

- On a phone: open the GitHub Pages link (added once it's published).
- On this PC: in this folder run `python -m http.server 8000`, then open
  http://localhost:8000. Double-clicking `index.html` won't work, because the
  browser blocks the scripts on files opened that way.

## Fix the targets

The target ranges per stage are in `targets.js`, with notes at the top of the
file. They are placeholders until Nóra or Emma check them.

## Tests

`node --test` (needs Node 20 or later).

## Built with AI

Built with Claude (Anthropic), in line with the module's "Acceptable Uses of GenAI"
guidance. The team reviews what goes in.
