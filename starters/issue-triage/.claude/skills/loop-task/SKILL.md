---
name: issue-triage
description: Periodic issue triage. Read-only. Produces the 5-line report,
  issues only (no PRs or CI).
---

# issue-triage procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay.

1. **Read** — new/updated issues since `issue-triage-state.md`'s last-seen
   marks.
2. **Rank** — security-flagged > reproducible-bug > regression >
   feature-request > question > rest.
3. **Write** `issue-triage-report.md`: ≤5 lines, most urgent first, one line
   each — `[rank] issue # and title · why it matters · suggested (NOT
   applied) label/priority`.
4. **Record** — update `issue-triage-state.md`'s last-seen marks, append one
   line to `loop-run-log.md`, commit both.
5. **Take NO other action** — no labeling, no priority changes, no comments.
   Writes beyond the report + spine are out of scope at L1.
