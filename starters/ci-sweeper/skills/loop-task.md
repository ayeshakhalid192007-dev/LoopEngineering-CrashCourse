# ci-sweeper procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For ci-sweeper, follow skills/loop-task.md exactly.") and by the
beat wrapper.

1. **Read** — the triggering CI-completion event for `main` (or, on the
   reconciliation sweep, any failing run on `main` not yet in the spine's
   per-failure register).
2. **Classify** — flaky (timeout, runner error, transient network — no code
   change needed) or real (reproducible failure — needs a fix).
3. **Write** `ci-sweeper-report.md`: one line per failure —
   `[classification] check name · why it matters · suggested (NOT applied) fix`.
4. **Record** — update `ci-sweeper-state.md`; append one line to
   `loop-run-log.md`.
5. **Take NO other action** — no worktree writes, no PRs, no pushes. L1
   report-only until a human promotes it (see `LOOP.md` → Promotion to L2).

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
>
> Once promoted to L2, the retry-once-then-`blocked` rule becomes the bound against
> [infinite-loops.md scenario 1](../../../docs/10-operating/infinite-loops.md) — the
> doom loop — where a flaky-looking failure gets retried forever with the same
> approach and the same result. At L1 there is no retry to bound: a report is
> written once per failure, never re-attempted.
