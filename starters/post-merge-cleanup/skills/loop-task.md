# post-merge-cleanup procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For post-merge-cleanup, follow skills/loop-task.md exactly.") and by
the beat wrapper.

1. **Read** — merged PRs, branches, linked issues, and preview/deploy
   environment status via the SCM CLI, since the spine's last-seen marks.
2. **Flag** — merged branches still present; issues a merge should have
   closed but didn't; orphaned preview/deploy environments. Verify each
   before flagging.
3. **Write** `cleanup-report.md`: one line per item —
   `[kind] item · why it's orphaned · suggested (NOT taken) action`.
4. **Record** — update `post-merge-cleanup-state.md`; append one line to
   `loop-run-log.md`.
5. **Take NO other action.**

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
