---
name: daily-triage
description: Morning repo triage. Read-only. Produces the 5-line report.
---

# daily-triage procedure

The prompt carries intent; this skill carries the procedure. Taken verbatim from the
course's Step 13 build — keep it a checklist, not an essay.

1. **Read** — new/updated issues, PRs, and CI runs since `daily-triage-state.md`'s
   last-seen marks.
2. **Rank** — broken-main > failing-CI > stale-urgent-PRs > new-issues > rest.
3. **Write** `triage-report.md`: ≤5 lines, most urgent first, one line each —
   `[rank] what · why it matters · suggested (NOT taken) action`.
4. **Record** — update `daily-triage-state.md`'s last-seen marks, append one line to
   `loop-run-log.md`, commit both.
5. **Take NO other action** — no labeling, no closing, no commenting. Writes beyond
   the report + spine are out of scope at L1.
