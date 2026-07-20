# repo-cleanup-loop procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For repo-cleanup-loop, follow skills/loop-task.md exactly.") and by
the beat wrapper. Adapted from Forward Future Loop Library #10 (Matthew Berman) to this
library's L1-first, report-only shape.

1. **Read** — branches, open PRs, recent commits, worktrees.
2. **Gather evidence** — merged? closed/superseded? orphaned? uncommitted
   work at risk?
3. **Classify** — current / owned (leave it) / safe-to-remove
   (evidence-backed) / uncertain (needs a human).
4. **Write** `repo-cleanup-report.md`: classification, evidence, suggested
   (NOT taken) action per item. Uncertain work and someone else's PR always
   get flagged for confirmation, never silently classified as removable.
5. **Record** — update `repo-cleanup-loop-state.md`; append one line to
   `loop-run-log.md`.
6. **Take NO other action** — no deletions, no closures.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
