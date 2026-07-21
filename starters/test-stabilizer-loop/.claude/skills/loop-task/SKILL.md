---
name: test-stabilizer-loop
description: Finds flaky tests, roots out the real cause, drafts a fix —
  never a blind sleep or retry. Read-only — reports, doesn't commit, at L1.
---

# test-stabilizer-loop procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #6 (hungtv27) to this
library's L1-first, report-only shape.

1. **Read** — run the full test suite N times under the same conditions;
   list tests whose result changed between runs.
2. **Diagnose** — for the most frequent flake, find its root cause: shared
   state, timing, ordering, or an external dependency. **Never** conclude
   "needs a sleep" or "needs a retry" — that's not a diagnosis, it's a mask.
3. **Draft and verify** — in a throwaway worktree, draft a fix at the root
   cause. Run the fixed test N times, then the full suite once.
4. **Write** `stabilizer-report.md`: the flake, its root cause, the drafted
   fix, verification evidence (N/N green), or — if the fix doesn't hold — a
   `quarantine-candidate` entry with justification.
5. **Record** — update `test-stabilizer-loop-state.md`'s per-flake status,
   append one line to `loop-run-log.md`, commit both. Discard the throwaway
   worktree.
6. **Take NO other action** — no fix is committed, no test is quarantined.
   This loop is L1 report-only until a human promotes it.
