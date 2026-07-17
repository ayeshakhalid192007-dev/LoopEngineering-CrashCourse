# Spine: `page-writer` (Day 1)

> **Owned by `page-writer`. No other loop may write this file.**
> Definition: [`loop.md`](loop.md) · Rulebook: [`LOOP.md`](../../../LOOP.md)

**Status:** ✅ stopped on **success** — checklist emptied
**Last beat:** 2026-07-16 11:14:11Z
**Runs used:** 21 / 25 · **Tokens used:** ≈493k / 550k (≈90%)

---

## ⚠️ Reconstruction notice

This spine was **rebuilt on 2026-07-16, after the fact.** The original was never
committed (the folder was gitignored, then lost), so this is not the file the loop
actually wrote as it ran.

- ✅ **fact** — recovered from a committed file: `shared/loop-run-log.md`,
  `shared/loop-budget.md`, `STATE.md`, or the contents of `docs/`
- 🔸 **inferred** — reasoned from those sources; plausible, not proven

**The lesson, stated plainly: a spine that isn't committed isn't a spine.** The entire
point of a spine is that an interrupted loop *resumes* instead of *restarts*. This one
couldn't be resumed by anyone — it survived only because the run log did. Day 2's loops
commit their spines as they run.

---

## Day 1 page checklist ✅ fact — all pages verified present in `docs/`

- [x] `docs/00-start-here/README.md`
- [x] `docs/00-start-here/learning-tracks.md`
- [x] `docs/01-prerequisites/environment-setup.md`
- [x] `docs/01-prerequisites/agentic-coding-primer.md`
- [x] `docs/01-prerequisites/spec-driven-primer.md`
- [x] `docs/02-foundations/glossary.md`
- [x] `docs/02-foundations/mental-models.md`
- [x] `docs/02-foundations/concepts.md`
- [x] `docs/02-foundations/the-four-layers.md`
- [x] `docs/02-foundations/primitives.md`
- [x] `docs/02-foundations/primitives-matrix.md`
- [x] Repo skeleton — `LICENSE`, `resources/sources.md`, `CONTRIBUTING.md`,
      `SECURITY.md`, `CODEOWNERS`, `CITATION.cff`, `.github/`
- [x] Dogfooding files — `AGENTS.md`, `LOOP.md`, `loop-budget.md`,
      `loop-constraints.md`, `loop-run-log.md`
- [x] Day 2 scaffold — `docs/part-1`…`part-6`, `patterns/`, `starters/_template/`,
      `skills/`, `templates/`, `examples/`, `stories/`, `assets/`, `scripts/`

Stopping condition met: **every box checked.**

## Run history ✅ fact — every row from `shared/loop-run-log.md`

| #     | Time (Z)    | Duration | Tokens | Note                                                                                 |
| ----- | ----------- | -------- | ------ | ------------------------------------------------------------------------------------ |
| 1     | 09:40:52    | 120s     | 25k    | escalation raised                                                                    |
| 2–10  | 09:44–09:58 | 35–180s  | ≈97k   | one item per beat                                                                    |
| 11    | 10:03:47    | 150s     | 20k    | 4 items in one beat; escalation raised                                               |
| 12–17 | 10:06–10:18 | 200–240s | ≈173k  | foundations pages — longest beats of the day                                         |
| —     | ~10:18      | —        | —      | 🔸 **self-throttle: ≈79% of the then-400k cap, 6 items left → report-only, stopped** |
| 18    | 10:20:20    | 30s      | 6k     | 🔸 post-restart, caps raised to 25 / 550k                                            |
| 19    | 10:25:13    | 420s     | 90k    | heaviest beat of the day                                                             |
| 20    | 10:28:22    | 400s     | 70k    | checklist emptied                                                                    |
| 21    | 11:14:11    | 90s      | 12k    | 🔸 resolving the checker's 3 findings                                                |

Totals: **21 runs · ≈493k tokens · 0 unresolved escalations.**

## Two honest discrepancies ✅ fact

1. **`STATE.md` says "20/20 runs"; the log shows 21.** Both are defensible — run 21
   landed at 11:14, *43 minutes after* the checker reported at 10:31, and cost only 12k.
   🔸 It was almost certainly a fix pass for the checker's findings, after the page work
   was already complete. The project spine counted page-writing runs; the log counted
   every beat. Worth reconciling before Day 2 so the two files agree.

2. **Token use hit ≈90% of cap — past the 80% self-throttle line.** The rule says 80% →
   report-only. It fired correctly the first time (at ≈79% of 400k), but after the caps
   were raised the loop ran to ≈90% of 550k without throttling again. 🔸 Likely the
   threshold was measured against the *old* cap. **This is a real gap in the budget
   rule, not a reconstruction artifact** — Day 2 should re-check the 80% line against
   whatever cap is current at the start of each beat.

## Escalations ✅ fact — 2 raised, both closed

| Beat          | Raised                                                     | Resolution                                                      |
| ------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| 1 (09:40:52)  | 🔸 setup ambiguity at first beat                           | closed — run 2 proceeded normally                               |
| 11 (10:03:47) | 🔸 raised while handling 4 items                           | closed — no unresolved items at stop                            |
| ~17           | ✅ budget: 79% of cap, 6 items left, human must raise caps | closed — human raised to 25 / 550k; loop restarted and finished |

## Handoff to Day 2

- Every Day 1 page exists and the checker's findings are resolved.
- `docs/part-1`…`part-6` are empty and waiting — Day 2's `step-writer` owns them.
- **Fix first:** the 80%-of-*current*-cap bug above, and the 20-vs-21 mismatch.
- **Commit your spine every beat.** Don't repeat this file's mistake.
