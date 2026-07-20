# Spine: `kit-stamper` (Day 3)

> **Owned by `kit-stamper`. No other loop may write this file.**
> Definition: [`loop.md`](loop.md) · Rulebook: [`LOOP.md`](../../../LOOP.md)
> The work checklist itself lives in [`kit-state.md`](../../../kit-state.md), not
> here — this file is the run history and escalations only.

**Status:** ⏳ running — 8 / 20 kits stamped. Group A complete; Group B
underway (WebFetch to `signals.forwardfuture.com/loop-library/` per kit).
**Last beat:** 2026-07-20T01:00:00Z
**Runs used:** 8 / 25 · **Tokens used:** ≈190k / 900k

## Run history

| # | Time (Z) | Duration | Kit stamped | Tokens | Outcome |
| - | -------- | -------- | ------------ | ------ | ------- |
| 1 | 2026-07-20T00:00:00Z | ~600s | daily-triage | ≈18k | scaffolded via `new-loop-scaffold.mjs`; filled LOOP.md/SKILL.md (both tools)/loop-verifier/state/budget/constraints/README from S1 Step 13 verbatim; row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS |
| 2 | 2026-07-20T00:10:00Z | ~500s | pr-babysitter | ≈22k | scaffolded via `new-loop-scaffold.mjs`; filled six parts from S1 Step 7's PR-review/reconciliation-sweep case study + §15B catalog entry (schedule/10m/L1/High); row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS |
| 3 | 2026-07-20T00:20:00Z | ~700s | ci-sweeper | ≈30k | scaffolded via `new-loop-scaffold.mjs`; filled from §15A catalog entry + infinite-loops.md scenario 1 (doom-loop retry bound) + the dependency-sweeper worked example; **first draft shipped it at L2, caught and corrected to L1-first before commit** (see Findings); row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS |
| 4 | 2026-07-20T00:30:00Z | ~650s | dependency-sweeper | ≈25k | scaffolded via `new-loop-scaffold.mjs`; filled directly from `docs/09-methods/worked-example-dependency-sweeper.md` (the fullest single-source design in the catalog); applied the L1-first lesson from beat 3 correctly from the start, following the worked example's own "Week 1 L1 → Week 2 L2 permanent" verdict; row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS |
| 5 | 2026-07-20T00:40:00Z | ~450s | changelog-drafter | ≈20k | scaffolded via `new-loop-scaffold.mjs`; filled from `make-your-own-loop.md`'s "Worked in 90 seconds" A–F example, adapted from per-merge event to schedule/tag; row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS |
| 6 | 2026-07-20T00:45:00Z | ~400s | post-merge-cleanup | ≈18k | scaffolded via `new-loop-scaffold.mjs`; filled from §15A catalog entry, reused the daily-triage/Step-13a report mold; row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS |
| 7 | 2026-07-20T00:50:00Z | ~400s | issue-triage | ≈18k | scaffolded via `new-loop-scaffold.mjs`; filled from §15D catalog entry, daily-triage mold narrowed to issues; row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS — **Group A complete, 7/7** |
| 8 | 2026-07-20T01:00:00Z | ~500s | docs-sweep | ≈25k | first Group B kit; WebFetch to Forward Future's index page found all 13 detail-page URLs, then fetched loop #1's page for the real prompt + Matthew Berman's author credit; adapted the source's direct-PR default to L1-first; row checked in `kit-state.md`; `loop-ready-audit.mjs` PASS |

## Findings / escalations

- `starters/_template/loop-run-log.md`'s schema-doc placeholder
  (`<YYYY-MM-DDTHH:MM:SSZ>`) collides with the audit's own placeholder marker —
  every stamped kit needs that one line reworded during fill-in, not left as the
  template ships it. Full note in `kit-state.md` → Findings.
- Registry validation (`validate-registry.mjs`) still FAILs — expected, that's
  `patterns-page-loop`'s scope (`patterns/`), not this loop's.
- **Self-caught L1/L2 mistake on `ci-sweeper`:** the catalog's Level column
  (L2 for `ci-sweeper` and `dependency-sweeper`) is the loop's *target* level
  after promotion, not its ship state — every kit ships L1 first
  (`kit-state.md` header rule; CLAUDE.md rule 4). First draft of `ci-sweeper`
  got this backwards (worktree writes + PR-opening from beat one); rewritten
  before commit to ship L1 report-only with an explicit "Promotion to L2"
  section. **Remaining L2-target rows need this same read from the start** —
  don't repeat the mistake on `dependency-sweeper` or any Group B row marked
  L2.
- **`opencode.json.example` write-allowlist gap**, caught on the same pass:
  all three stamped kits were missing their own report filename in the
  `permission.edit` allowlist (only the state file + run log were listed) —
  as shipped, the config would have blocked the loop from writing the report
  that's its entire job. Fixed in all three; add the report filename for
  every kit going forward.

## Lessons

First Day 3 run. The template's own doc strings can trip the audit script's
placeholder scan — always run `loop-ready-audit.mjs` after filling a kit,
before checking its row off, rather than trusting "looks filled in." Second
lesson from this beat: the audit script checks *file presence and absence of
placeholder text*, not *design correctness* — it will happily PASS a kit that
ships L2 access it hasn't earned, or an OpenCode config that can't actually do
the job. A clean audit is necessary, not sufficient; re-read the six-part
table against `kit-state.md`'s own rules and the shared-permission pattern
across already-built kits before checking a row off, not just the script's
exit code.
