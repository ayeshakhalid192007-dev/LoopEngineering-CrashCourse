---
name: loop-harness-verification
description: General-purpose harness for scheduled repo work — stage in an
  isolated worktree, verify with a genuinely separate second session, ship
  only after a pass. Read-only — reports, never delivers.
---

# loop-harness-verification procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #17 (Istasha) to this
library's L1-first, report-only shape.

1. **Read** — the wrapped task's inputs (CI status, issue backlog, dependency
   manifest, docs — whatever this instance covers) and
   `loop-harness-verification-state.md`'s last run.
2. **Stage** — in an isolated worktree, produce a candidate patch or outbox
   message for the wrapped task.
3. **Verify, genuinely separately** — invoke a second, distinct session (the
   `loop-verifier` agent, or a second `claude -p` / `opencode run` call —
   never the same pass that staged the output) to check the candidate
   against explicit criteria.
4. **Decide**:
   - **Pass** → write `harness-report.md` recommending delivery. Do NOT
     deliver it yourself.
   - **Fail** → preserve the findings in `loop-harness-verification-state.md`
     and retry, but only within the configured retry limit.
5. **Write** `harness-report.md`: source revision, staged output, verifier
   result, delivery status, next scheduled run — the source's own required
   fields.
6. **Record** — update `loop-harness-verification-state.md`, append one
   line to `loop-run-log.md`, commit both.
7. **Take NO other action** — never deliver, merge, or apply anything. This
   loop is L1 report-only until a human promotes it.
