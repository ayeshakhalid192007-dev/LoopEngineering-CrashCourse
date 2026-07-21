# test-stabilizer-loop procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For test-stabilizer-loop, follow skills/loop-task.md exactly.") and
by the beat wrapper. Adapted from Forward Future Loop Library #6 (hungtv27) to this
library's L1-first, report-only shape.

1. **Read** — run the full suite N times under the same conditions; list
   tests whose result changed.
2. **Diagnose** — for the most frequent flake, find the root cause: shared
   state, timing, ordering, or an external dependency. Never "needs a sleep"
   or "needs a retry" — that masks the cause, it doesn't find it.
3. **Draft and verify** — throwaway worktree, fix at the root cause, run the
   fixed test N times, then the full suite once.
4. **Write** `stabilizer-report.md`: flake, root cause, drafted fix,
   verification evidence, or a justified `quarantine-candidate` entry.
5. **Record** — update `test-stabilizer-loop-state.md`; append one line to
   `loop-run-log.md`. Discard the throwaway worktree.
6. **Take NO other action** — no fix committed, no test quarantined.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
>
> The source's own rule — never a blind sleep or retry — is this loop's version of the
> doom-loop bound ([infinite-loops.md scenario 1](../../../docs/10-operating/infinite-loops.md)):
> masking a flake instead of fixing it just moves the doom loop into production.
