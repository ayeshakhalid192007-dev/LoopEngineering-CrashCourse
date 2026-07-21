# docs-sweep procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For docs-sweep, follow skills/loop-task.md exactly.") and by the beat
wrapper. Adapted from Forward Future Loop Library #1 ("The docs sweep," Matthew Berman)
to this library's L1-first, report-only shape.

1. **Read** — the codebase for everything that changed since the spine's
   last-swept mark, and the documentation that describes it.
2. **Compare** — for each doc page whose claims touch changed code, check
   whether the doc still matches the implementation.
3. **Write** `docs-drift-report.md`: one entry per stale page — doc file and
   section · what it claims · what the code actually does now · a suggested
   (NOT applied) correction.
4. **Record** — update `docs-sweep-state.md`'s last-swept mark; append one
   line to `loop-run-log.md`.
5. **Take NO other action** — never edit a doc, never open a PR.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
