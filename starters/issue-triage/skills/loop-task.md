# issue-triage procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For issue-triage, follow skills/loop-task.md exactly.") and by the
beat wrapper.

1. **Read** — new/updated issues since the spine's last-seen marks.
2. **Rank** — security-flagged > reproducible-bug > regression >
   feature-request > question > rest.
3. **Write** `issue-triage-report.md`: ≤5 lines, most urgent first, one line
   each — `[rank] issue # and title · why it matters · suggested (NOT
   applied) label/priority`.
4. **Record** — update `issue-triage-state.md`'s last-seen marks; append one
   line to `loop-run-log.md`.
5. **Take NO other action.**

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
