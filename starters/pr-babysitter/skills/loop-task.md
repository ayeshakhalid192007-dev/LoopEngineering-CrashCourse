# pr-babysitter procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For pr-babysitter, follow skills/loop-task.md exactly.") and by the
beat wrapper.

1. **Read** — every open PR via the SCM CLI: review state, CI status,
   mergeability, days since last activity. Cross-reference against
   `pr-babysitter-state.md`'s per-PR last-seen status.
2. **Rank** — merge-conflict > CI-red > blocking-review-requested >
   stale-no-review (>2 business days) > awaiting-changes > rest.
3. **Write** `pr-status-report.md`: one line per flagged PR —
   `[rank] PR # and title · why it matters · suggested (NOT taken) action`.
4. **Record** — update `pr-babysitter-state.md`'s per-PR status; append one line
   to `loop-run-log.md`.
5. **Take NO other action.**

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
>
> This loop is itself the **reconciliation sweep** (Step 7) for a fleet that also runs
> an event-driven `pr-reviewer`: events are dropped, not queued, so a slow scheduled
> poll is what catches the PRs an event burst silently skipped.
