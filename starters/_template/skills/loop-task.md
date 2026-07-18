# <loop-name> procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For <loop-name>, follow skills/loop-task.md exactly.") and by the beat
wrapper.

1. **Read** — `<the spine's last-seen marks, the queue, the diff>`.
2. **Do one unit** — `<the single unit of work per beat>`.
3. **Verify** — `<the machine-checkable success test>`.
4. **Record** — update `<loop-name>-state.md`; append one line to `loop-run-log.md`.
5. **Take NO other action.**

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
