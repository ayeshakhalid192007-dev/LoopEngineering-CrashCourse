# page-load-loop procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For page-load-loop, follow skills/loop-task.md exactly.") and by the
beat wrapper. Adapted from Forward Future Loop Library #12 (Matthew Berman) to this
library's L1-first, report-only shape.

**Before beat 1**: the human sets up the spine with fixed test conditions —
routes, warm-up behavior, baseline capture. Required, not optional.

1. **Read** — the fixed test conditions from the spine.
2. **Measure** — page-load time across every route under those conditions.
3. **Do one unit** — for the slowest route above 50ms: throwaway worktree,
   draft a candidate optimization.
4. **Verify** — re-run the same benchmark; confirm no regression on any
   other route.
5. **Write** `page-load-report.md`: route, before/after, drafted change,
   regression result.
6. **Record** — update `page-load-loop-state.md`; append one line to
   `loop-run-log.md`. Discard the throwaway worktree.
7. **Take NO other action** — never apply the optimization.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
