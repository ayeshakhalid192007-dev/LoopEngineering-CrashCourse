---
name: pr-babysitter
description: Polls every open PR on a fast schedule. Read-only. Flags merge
  conflicts, red CI, and stale reviews — never comments or merges.
---

# pr-babysitter procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay.

1. **Read** — every open PR via the SCM CLI: review state, CI status,
   mergeability, days since last activity. Cross-reference against
   `pr-babysitter-state.md`'s per-PR last-seen status.
2. **Rank** — merge-conflict > CI-red > blocking-review-requested >
   stale-no-review (>2 business days) > awaiting-changes > rest.
3. **Write** `pr-status-report.md`: one line per flagged PR —
   `[rank] PR # and title · why it matters · suggested (NOT taken) action`.
4. **Record** — update `pr-babysitter-state.md`'s per-PR status, append one line
   to `loop-run-log.md`, commit both.
5. **Take NO other action** — no comments, no CI re-runs, no merges. Writes
   beyond the report + spine are out of scope at L1.
