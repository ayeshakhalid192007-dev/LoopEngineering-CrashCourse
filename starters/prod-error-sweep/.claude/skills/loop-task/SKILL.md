---
name: prod-error-sweep
description: Reviews production logs for actionable errors. Read-only —
  drafts a traced, verified fix as a report, never opens a PR. Never copies
  credentials or PII out of the logs.
---

# prod-error-sweep procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #4 (Matthew Berman) to this
library's L1-first, report-only shape.

1. **Read** — production logs and error telemetry since
   `prod-error-sweep-state.md`'s last-seen mark.
2. **Decide** — if nothing actionable is present, update the mark and stop.
   This is a complete, successful beat.
3. **Trace and draft** — for an actionable error: find its root cause. In a
   throwaway worktree, draft the smallest credible fix. Run the tests.
4. **Redact** — before writing anything: strip or describe (never quote) any
   credential, token, personal information, or private payload found in the
   logs. This applies to the report, the spine, and every other file this
   loop touches.
5. **Write** `prod-error-report.md`: the error, root cause, the drafted fix,
   the verification result — redacted per step 4.
6. **Record** — update `prod-error-sweep-state.md`'s per-error status,
   append one line to `loop-run-log.md`, commit both. Discard the throwaway
   worktree.
7. **Take NO other action** — never open a PR. This loop is L1 report-only
   until a human promotes it.
