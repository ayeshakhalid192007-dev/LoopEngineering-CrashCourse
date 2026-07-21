# clodex-adversarial-review procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For clodex-adversarial-review, follow skills/loop-task.md exactly.")
and by the beat wrapper. Adapted from Forward Future Loop Library #9 (Lukas Kucinski) to
this library's L1-first, report-only shape.

1. **Read** — the PR diff and the spine's iteration history for this PR.
2. **Review** — an adversarial review pass, genuinely separate from the
   pass that wrote the code (a second `opencode run` with a review-only
   prompt, or the real `codex` CLI if available).
3. **Fix findings above threshold** — throwaway worktree, draft a fix for
   each finding at or above the severity threshold.
4. **Re-review** — repeat until approved, only accepted findings remain, no
   progress for 2 iterations, or 5 iterations reached.
5. **Report honestly** — `clodex-review-report.md`: PR, checks, verdict,
   remaining findings. Never call an exhausted or errored run "approved."
6. **Record** — update `clodex-adversarial-review-state.md`; append one
   line to `loop-run-log.md`. Discard the throwaway worktree.
7. **Take NO other action** — never push to the real PR branch.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
