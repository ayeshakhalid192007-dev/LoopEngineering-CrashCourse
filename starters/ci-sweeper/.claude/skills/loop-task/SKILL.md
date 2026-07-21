---
name: ci-sweeper
description: Watches main's CI. On a red run, classifies flaky vs real and
  drafts a suggested fix in a report. Read-only — does not touch a worktree
  or open a PR until promoted past L1.
---

# ci-sweeper procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay.

1. **Read** — the triggering CI-completion event for `main` (or, on the
   reconciliation sweep, any failing run on `main` not yet in
   `ci-sweeper-state.md`'s per-failure register).
2. **Classify** — flaky (timeout, runner error, transient network — no code
   change needed) or real (reproducible failure — needs a fix).
3. **Write** `ci-sweeper-report.md`: one line per failure —
   `[classification] check name · why it matters · suggested (NOT applied) fix`.
   For a real failure, the suggested fix should be concrete enough that a
   human could apply it directly — but do not apply it yourself.
4. **Record** — update `ci-sweeper-state.md`'s per-failure status, append one
   line to `loop-run-log.md`, commit both.
5. **Take NO other action** — no worktree writes, no PRs, no pushes. This
   loop is L1 report-only until a human promotes it (see `LOOP.md` →
   Promotion to L2).
