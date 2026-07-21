---
name: stale-safe-batch-release
description: Reviews pending PRs, excludes stale/unfinished work, combines
  the rest into a release batch built from main. Read-only — reports the
  batch, never actually releases.
---

# stale-safe-batch-release procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #33 (Matthew Berman) to this
library's L1-first, report-only shape.

1. **Read** — every pending PR.
2. **Classify** — current (mergeable, tests passing, recently active) or
   stale/unfinished (conflicts, failing checks, no activity past a
   threshold).
3. **Combine** — the current, complete changes into a release batch. The
   batch's artifact must trace to **complete artifacts off the latest
   integrated `main`** — never a task worktree, never a partial file
   overlay. If you can't confirm the artifact comes from `main`, don't
   include it, and say so.
4. **Write** `release-batch-report.md`: included PRs (with evidence of
   currency), excluded PRs (with the reason), and confirmation the batch
   traces to `main`.
5. **Record** — update `stale-safe-batch-release-state.md`'s per-PR
   inclusion decisions, append one line to `loop-run-log.md`, commit both.
6. **Take NO other action** — never actually release or deploy. Writes
   beyond the report + spine are out of scope at L1.
