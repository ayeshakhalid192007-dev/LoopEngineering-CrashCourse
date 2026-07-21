# dependency-sweeper procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For dependency-sweeper, follow skills/loop-task.md exactly.") and by
the beat wrapper.

1. **Read** — the manifest and lockfiles for outdated production dependencies
   not yet in the spine's per-package register.
2. **Do one unit** — for up to 10 outdated packages this beat: fresh throwaway
   worktree, apply the candidate update, run the full test suite.
3. **Verify and record** — green → `dependency-report.md` entry
   (package/version/suite result), no PR. Red → retry once in a clean
   worktree; still red → `blocked` entry (version, failing check, retry
   count); do not retry again until the version changes upstream.
4. **Record** — update `dependency-sweeper-state.md`; append one line to
   `loop-run-log.md`. Discard the throwaway worktree.
5. **Take NO other action** — no PRs, no pushes. L1 report-only until a human
   promotes it (see `LOOP.md` → Promotion to L2).

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
>
> The retry-once-then-`blocked` rule is the bound against
> [infinite-loops.md scenario 1](../../../docs/10-operating/infinite-loops.md) — the
> doom loop — where a breaking major version gets retried forever with the same
> approach and the same result.
