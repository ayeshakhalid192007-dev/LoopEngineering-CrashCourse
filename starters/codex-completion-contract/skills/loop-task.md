# codex-completion-contract procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For codex-completion-contract, follow skills/loop-task.md exactly.")
and by the beat wrapper. Adapted from Forward Future Loop Library #28 (3goblack) to this
library's L1-first, report-only shape.

**Before starting**: only for a named Goal, only when explicitly asked for a
completion audit. Ask before creating Goal state.

1. **Define the contract** — every required outcome and its evidence,
   before any action.
2. **Read** — the target work's actual current state.
3. **Audit** — proved / weak / missing / contradicted, per requirement.
4. **Decide** — all proved → complete. A requirement can't be proved now →
   blocked. No new evidence for 3 beats → stalled. Limit reached first →
   exhausted, never complete.
5. **Write** `completion-audit.md`: requirement-to-evidence table, status,
   owner, next action.
6. **Record** — update `codex-completion-contract-state.md`; append one
   line to `loop-run-log.md`.
7. **Take NO other action.**

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
