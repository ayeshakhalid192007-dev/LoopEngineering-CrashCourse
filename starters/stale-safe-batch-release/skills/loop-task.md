# stale-safe-batch-release procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For stale-safe-batch-release, follow skills/loop-task.md exactly.")
and by the beat wrapper. Adapted from Forward Future Loop Library #33 (Matthew Berman)
to this library's L1-first, report-only shape.

1. **Read** — every pending PR.
2. **Classify** — current (mergeable, tests passing, recently active) or
   stale/unfinished.
3. **Combine** — current changes into a release batch built from complete
   artifacts off the latest integrated `main` — never a task worktree,
   never a partial overlay.
4. **Write** `release-batch-report.md`: included PRs + evidence, excluded
   PRs + reason, confirmation the batch traces to `main`.
5. **Record** — update `stale-safe-batch-release-state.md`; append one
   line to `loop-run-log.md`.
6. **Take NO other action** — never actually release or deploy.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
