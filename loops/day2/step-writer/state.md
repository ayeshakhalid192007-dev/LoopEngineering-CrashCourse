# Spine: `step-writer` (Day 2 — pass 3: banners + starter commands)

> **Owned by `step-writer`. No other loop may write this file.**
> Definition: [`loop.md`](loop.md) · Rulebook: [`LOOP.md`](../../../LOOP.md)
> Voice: [`shared/style-guide.md`](../../../shared/style-guide.md)

**Status:** ✅ success stop — pass 3 complete (run 2026-07-19). All 11 banners
removed (`grep -rn 'assets/banner' docs/` is clean) and `starters/getting-started.md`
created with both sections + linked from `starters/README.md`. Awaiting the
`template-checker`'s pass-3 verdict and the human gate before commit.
**Last beat:** 2026-07-19 (beat 3 — starter-command file + README link)
**Progress:** 13 / 13 pass-3 items · runs used 3 / 40 · tokens ≈24k / 700k

Pass 3 is a small, mechanical, human-requested pass. Two groups of work:
remove the section banner from every landing page, and add one starter-command
reference file. No prose is rewritten and no §10 structure changes.

**Passes 1 and 2 (complete):** pass 1 wrote all 36 pages (success stop, beat 36,
2026-07-17); pass 2 tone-rewrote them against `shared/style-guide.md` (success
stop, beat 38, 2026-07-18). Both spines are preserved in git history.

## Pass-3 checklist

### Group A — remove the section banner (11 landing pages)

For each page: delete the first line — the `![…](../../assets/banner-*.svg)`
image — and the blank line directly after it. Change nothing else on the page.

- [x] `docs/00-start-here/README.md`
- [x] `docs/01-prerequisites/environment-setup.md`
- [x] `docs/02-foundations/mental-models.md`
- [x] `docs/03-part-1-the-shift/README.md`
- [x] `docs/04-part-2-heartbeat/README.md`
- [x] `docs/05-part-3-the-body/README.md`
- [x] `docs/06-part-4-the-spine/README.md`
- [x] `docs/07-part-5-complete-loop/README.md`
- [x] `docs/08-part-6-human-control/README.md`
- [x] `docs/09-methods/make-your-own-loop.md`
- [x] `docs/10-operating/operating-loops.md`

Provable when done: `grep -rn 'assets/banner' docs/` returns nothing. (The SVG
files under `assets/` are left in place — only the page references are removed.)

### Group B — add the starter-command reference (1 file + 1 link)

- [x] Create `starters/getting-started.md` (spec below).
- [x] Add one link to it from `starters/README.md` (near the "Start here"
      section). Do not remove or reword the existing `cp -r` line already there.

## `starters/getting-started.md` — required shape

A short page with a one-paragraph intro and exactly two `##` sections, in this
order. Keep the wording plain and professional (see the wording rules below).

### Section 1 — `## Manual setup`

Keep the existing clone-and-fill flow exactly as it already works; this is for
anyone who prefers to set a loop up by hand. State that it copies the canonical
template and that you then fill the placeholders. Show the one command already
documented in `starters/README.md`:

```text
cp -r starters/_template starters/<loop-name>
```

Point to [Scaffold a Loop from the Template](../../../docs/09-methods/scaffold-from-template.md)
for the step-by-step walkthrough.

### Section 2 — `## Starter commands`

One-line scaffolding commands from the `cobusgreyling/loop-engineering` reference
repo (S7). Introduce them in one plain sentence, then list each with a short,
factual description of what it does. Use these commands verbatim:

```text
# Scaffold a loop from a named pattern
npx @cobusgreyling/loop-init . --pattern daily-triage --tool grok

# Estimate token cost for a pattern at a given autonomy level
npx @cobusgreyling/loop-cost --pattern daily-triage --level L1

# Audit an existing loop and print suggestions
npx @cobusgreyling/loop-audit . --suggest

# Generate a readiness badge for an audited loop
npx @cobusgreyling/loop-audit . --badge
```

Add a short "From source" note for contributors, again verbatim:

```text
bash scripts/before-after-demo.sh
cd tools/loop-init  && npm ci && npm test && node dist/cli.js /path/to/project --pattern daily-triage --tool grok
cd tools/loop-audit && npm ci && npm test && node dist/cli.js /path/to/project --suggest
cd tools/loop-cost  && npm ci && npm test && node dist/cli.js --pattern ci-sweeper --cadence 15m
```

Note in one line that `--tool` selects the coding agent (S7's examples use
`grok`; this course pairs Claude Code and OpenCode, so `--tool claude` or
`--tool opencode` fit the same slot).

### Footer

Close with an attribution line, matching the style of `starters/README.md`:

```text
*The starter commands are from the `cobusgreyling/loop-engineering` reference repo
([S7](https://github.com/cobusgreyling/loop-engineering), MIT). Full attribution:
[resources/sources.md](../resources/sources.md).*
```

## Wording rules for this pass

- Plain and professional. No hype, no flashy or informal words, no exclamation
  marks. State what each command does and stop.
- Follow the tone checklist at the bottom of
  [`shared/style-guide.md`](../../../shared/style-guide.md).
- Group B is new prose, not a rewrite: describe the commands, do not copy S7's
  marketing phrasing.
- Group A touches one line per file. Do not reflow, re-title, or edit any other
  line — the banner image and its trailing blank line, nothing more.

## Escalations

*None.*

## Notes to the checker

- Group A is a diff check: `grep -rn 'assets/banner' docs/` must return nothing,
  and each page's diff must show **only** the banner line (+ its blank line)
  removed — no other line changed.
- Group B is a presence check: `starters/getting-started.md` exists with a
  `## Manual setup` section and a `## Starter commands` section; the manual
  `cp -r` flow is preserved; the four S7 `npx` commands are present verbatim; the
  S7 attribution footer is present; and `starters/README.md` links the new page.
- Tone: grade Group B against the style-guide tone checklist. Reject flashy or
  informal wording.
