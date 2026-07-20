# changelog-drafter procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For changelog-drafter, follow skills/loop-task.md exactly.") and by
the beat wrapper.

1. **Read** — every PR merged since the spine's last-processed PR number.
2. **Do one unit** — for each merged PR, draft one changelog line: PR number
   and title, what changed, suggested category.
3. **Verify** — every merged PR number since the last mark appears in
   `changelog-draft.md`.
4. **Record** — update `changelog-drafter-state.md`'s last-processed PR
   number; append one line to `loop-run-log.md`.
5. **Take NO other action** — never write to `CHANGELOG.md` itself.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
>
> A PR that can't be drafted cleanly gets skipped and noted, not force-fit — and if the
> same PR blocks 3 consecutive beats, escalate it instead of retrying with the same
> approach.
