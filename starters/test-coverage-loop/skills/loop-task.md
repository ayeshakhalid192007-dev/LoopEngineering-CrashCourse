# test-coverage-loop procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For test-coverage-loop, follow skills/loop-task.md exactly.") and by
the beat wrapper. Adapted from Forward Future Loop Library #5 (Matthew Berman) to this
library's L1-first, report-only shape.

1. **Read** — the coverage report; identify uncovered regions not yet in the
   spine's register.
2. **Do one unit** — for up to 5 regions this beat (largest first): fresh
   throwaway worktree, draft a test with a real assertion, run the full
   suite.
3. **Verify** — green + coverage risen → `coverage-report.md` entry. Still
   uncoverable or red after one retry → `exclusion-candidate` entry instead;
   do not retry again.
4. **Record** — update `test-coverage-loop-state.md`; append one line to
   `loop-run-log.md`. Discard the throwaway worktree.
5. **Take NO other action** — never commit a test file.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
>
> Coverage tools measure code execution, not assertion quality — a test that only calls
> a function without checking its result is not a finding, it's a false positive on the
> percentage.
