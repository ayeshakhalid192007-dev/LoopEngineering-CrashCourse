# prod-error-sweep procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For prod-error-sweep, follow skills/loop-task.md exactly.") and by
the beat wrapper. Adapted from Forward Future Loop Library #4 (Matthew Berman) to this
library's L1-first, report-only shape.

1. **Read** — production logs and error telemetry since the spine's
   last-seen mark.
2. **Decide** — nothing actionable → update the mark and stop; that's a
   complete, successful beat.
3. **Trace and draft** — actionable error → find the root cause, draft the
   smallest credible fix in a throwaway worktree, run the tests.
4. **Redact** — strip or describe (never quote) any credential, token, PII,
   or private payload before writing anything, anywhere this loop touches.
5. **Write** `prod-error-report.md`: error, root cause, drafted fix,
   verification result — redacted.
6. **Record** — update `prod-error-sweep-state.md`; append one line to
   `loop-run-log.md`. Discard the throwaway worktree.
7. **Take NO other action** — never open a PR.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
