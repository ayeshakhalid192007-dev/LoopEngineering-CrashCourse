---
name: ticket-to-pr-ready
description: Turns a ticket or bug report into a review-ready patch.
  Read-only — reproduces, roots out the cause, drafts a fix, reports it.
  Never opens a PR, never folds in unrelated refactors.
---

# ticket-to-pr-ready procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #16 (Hiten Shah) to this
library's L1-first, report-only shape.

1. **Reproduce** — the triggering ticket's failure, in the smallest
   representative environment. If it doesn't reproduce after **two serious
   attempts**, write that honestly in the report and stop — do not guess at
   a fix for a bug you can't see.
2. **Prove the root cause** — once reproduced, find *why*, not just *that*.
3. **Draft the smallest credible fix** — in a throwaway worktree. **Never**
   fold in an unrelated refactor, even a tempting one — one fix per run.
4. **Verify** — rerun the original reproduction (must now pass) plus
   relevant regression tests (must still pass).
5. **Write** `ticket-report.md`: cause, changed files, before-and-after
   proof, risks, and a pull-request summary.
6. **Record** — update `ticket-to-pr-ready-state.md`'s per-ticket status,
   append one line to `loop-run-log.md`, commit both. Discard the throwaway
   worktree.
7. **Take NO other action** — never open a PR. This loop is L1 report-only
   until a human promotes it.
