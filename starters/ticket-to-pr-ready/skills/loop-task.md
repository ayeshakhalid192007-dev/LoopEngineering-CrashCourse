# ticket-to-pr-ready procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For ticket-to-pr-ready, follow skills/loop-task.md exactly.") and by
the beat wrapper. Adapted from Forward Future Loop Library #16 (Hiten Shah) to this
library's L1-first, report-only shape.

1. **Reproduce** — the triggering ticket's failure, smallest representative
   environment. Two serious attempts max; if it still doesn't reproduce,
   say so honestly and stop.
2. **Prove the root cause** — why, not just that.
3. **Draft the smallest credible fix** — throwaway worktree. Never fold in
   an unrelated refactor.
4. **Verify** — original reproduction now passes, regression tests still
   pass.
5. **Write** `ticket-report.md`: cause, changed files, before/after proof,
   risks, PR summary.
6. **Record** — update `ticket-to-pr-ready-state.md`; append one line to
   `loop-run-log.md`. Discard the throwaway worktree.
7. **Take NO other action** — never open a PR.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
