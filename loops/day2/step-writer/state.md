# Spine: `step-writer` (Day 2 — pass 2: tone rewrite)

> **Owned by `step-writer`. No other loop may write this file.**
> Definition: [`loop.md`](loop.md) · Rulebook: [`LOOP.md`](../../../LOOP.md)
> Voice: [`shared/style-guide.md`](../../../shared/style-guide.md)

**Status:** ✅ success stop — pass 2 complete (started and finished 2026-07-18)
**Last beat:** 2026-07-18 (beat 38 — operating-loops REVISIT, prose rewrite)
**Progress:** 36 / 36 processed (33 rewritten, 3 already compliant) · runs used 38 / 40 · tokens ≈240k / 700k
**Checklist complete. Revisit queue complete.** ✅ **SUCCESS STOP** — all 36
pages processed and the human-feedback revisits (observability, operating-loops)
are done. 2 runs under the 40-run limit. Committed and pushed on human approval
(2026-07-18); draft PR #4 open for review.
**Post-stop addendum (human-directed, 2026-07-18):** diagram pass — ONE new
mermaid diagram added to 3 pages where a flow/contrast was prose-only
(12-state-between-runs: beat order of operations; 09-skills: fat-prompt vs
intent+skill contrast; 14-staying-the-engineer: three ownership pillars). House
init header + framing sentence each. All pre-existing diagrams verified
byte-identical (diff shows additions only). 3 beats logged.
**Human feedback (mid-run, 2026-07-18):** rewrites must be recast prose, not
punctuation fixes. Applied from beat 35 on; prose-heavy pages 30–32
(operating-loops, observability) queued for a deeper revisit within the run cap.
**Pass 1:** ✅ success stop at beat 36 on 2026-07-17 — 36/36 pages written,
≈465k tokens, tripwire never fired. The full pass-1 spine is preserved in git
history (commit `b8702e4` and earlier).

## Why pass 2 exists

The human's tone study (2026-07-18) compared the pass-1 pages against the source
voice — the Agent Factory chapters (S1–S4) and the `cobusgreyling/loop-engineering`
repo (S7). The pass-1 prose runs denser and more aphoristic than either. Pass 2
rewrites every page to match `shared/style-guide.md`. Structure does not change:
§10 sections, diagrams, code tabs, glossary lines, and Sources footers all stay.
Tone changes; facts do not.

## Pass-2 tone-rewrite checklist

### Part 1 — The Shift

- [x] `docs/03-part-1-the-shift/01-from-prompting-to-looping.md`
- [x] `docs/03-part-1-the-shift/02-the-four-layers.md`
- [x] `docs/03-part-1-the-shift/03-anatomy-of-a-loop.md`
- [x] `docs/03-part-1-the-shift/README.md`

### Part 2 — The Heartbeat

- [x] `docs/04-part-2-heartbeat/04-in-session-loops.md`
- [x] `docs/04-part-2-heartbeat/05-conditional-run-until-done.md`
- [x] `docs/04-part-2-heartbeat/06-unattended-schedules.md`
- [x] `docs/04-part-2-heartbeat/07-event-driven.md`
- [x] `docs/04-part-2-heartbeat/README.md`

### Part 3 — The Body

- [x] `docs/05-part-3-the-body/08-worktrees.md`
- [x] `docs/05-part-3-the-body/09-skills.md`
- [x] `docs/05-part-3-the-body/10-connectors-mcp.md`
- [x] `docs/05-part-3-the-body/11-maker-checker.md`
- [x] `docs/05-part-3-the-body/README.md`

### Part 4 — The Spine

- [x] `docs/06-part-4-the-spine/12-state-between-runs.md`
- [x] `docs/06-part-4-the-spine/README.md`

### Part 5 — A Complete Loop, Twice

- [x] `docs/07-part-5-complete-loop/13-build-the-loop-twice.md`
- [x] `docs/07-part-5-complete-loop/13a-claude-code-walkthrough.md`
- [x] `docs/07-part-5-complete-loop/13b-opencode-walkthrough.md`
- [x] `docs/07-part-5-complete-loop/README.md`

### Part 6 — Human Control

- [x] `docs/08-part-6-human-control/14-staying-the-engineer.md`
- [x] `docs/08-part-6-human-control/cost-management.md`
- [x] `docs/08-part-6-human-control/verification.md`
- [x] `docs/08-part-6-human-control/the-three-nested-loops.md`
- [x] `docs/08-part-6-human-control/README.md`

### Methods

- [x] `docs/09-methods/make-your-own-loop.md`
- [x] `docs/09-methods/loop-design-checklist.md`
- [x] `docs/09-methods/pattern-picker.md`
- [x] `docs/09-methods/decision-framework.md`

### Operating handbook

- [x] `docs/10-operating/operating-loops.md`
- [x] `docs/10-operating/safety.md`
- [x] `docs/10-operating/observability.md`
- [x] `docs/10-operating/failure-modes.md`
- [x] `docs/10-operating/anti-patterns.md`
- [x] `docs/10-operating/recovery-playbook.md`
- [x] `docs/10-operating/multi-loop.md`

## Escalations

*None.*

## Notes to the checker

- Pass-2 pages are graded against BOTH the §10 rubric AND the tone checklist at
  the bottom of `shared/style-guide.md`.
- A rewrite that drops a §10 section is a FAIL even if the tone is perfect —
  the style guide's "what does NOT change" list is part of the rubric.
- Diff checks vs. pass 1: existing mermaid fences byte-identical, Sources footer
  and glossary line byte-identical, at most one NEW mermaid diagram per page
  (house init header + framing sentence, only where it explains a flow,
  contrast, or timeline).
- `09-methods/` and `10-operating/` pages remain structural pages: apply the tone
  rules to their prose, not the §10 concept-page rubric.
