---
name: page-load-loop
description: Optimizes page-load speed until every route is under 50ms.
  Read-only — drafts candidate optimizations, never applies them.
---

# page-load-loop procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #12 (Matthew Berman) to this
library's L1-first, report-only shape.

**Before beat 1**: the human sets up `page-load-loop-state.md` with the fixed
test conditions — routes to measure, warm-up behavior, and a baseline
capture. Never start a beat without this; the source names this setup as
required, not optional.

1. **Read** — the fixed test conditions from `page-load-loop-state.md`.
2. **Measure** — page-load time across every route under those same
   conditions.
3. **Do one unit** — for the slowest route above the 50ms target: in a
   throwaway worktree, draft a candidate optimization.
4. **Verify** — re-run the same benchmark against the change. Confirm no
   regression on any other route — the source's own checker, verbatim.
5. **Write** `page-load-report.md`: route, before/after load time, the
   drafted change, the regression check result.
6. **Record** — update `page-load-loop-state.md`'s per-route history, append
   one line to `loop-run-log.md`, commit both. Discard the throwaway
   worktree.
7. **Take NO other action** — never apply the optimization. This loop is L1
   report-only until a human promotes it.
