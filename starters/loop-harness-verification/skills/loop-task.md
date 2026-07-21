# loop-harness-verification procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For loop-harness-verification, follow skills/loop-task.md exactly.")
and by the beat wrapper. Adapted from Forward Future Loop Library #17 (Istasha) to this
library's L1-first, report-only shape.

1. **Read** — the wrapped task's inputs and the spine's last run.
2. **Stage** — isolated worktree, candidate patch or outbox message.
3. **Verify, genuinely separately** — a second, distinct `opencode run` call
   (never the same pass that staged the output) checks against explicit
   criteria.
4. **Decide** — pass → `harness-report.md` recommends delivery, no delivery
   made. Fail → preserve findings, retry only within the configured limit.
5. **Write** `harness-report.md`: source revision, staged output, verifier
   result, delivery status, next scheduled run.
6. **Record** — update `loop-harness-verification-state.md`; append one
   line to `loop-run-log.md`.
7. **Take NO other action** — never deliver, merge, or apply anything.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
