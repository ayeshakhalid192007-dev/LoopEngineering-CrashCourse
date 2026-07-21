# spec-dev-review procedure (OpenCode)

Same procedure as the Claude Code `SKILL.md`, in OpenCode's plain-file form. Referenced
from `AGENTS.md` ("For spec-dev-review, follow skills/loop-task.md exactly.") and by the
beat wrapper. Adapted from Forward Future Loop Library #21 (Ximanta) to this library's
L1-first, report-only shape.

1. **Write the packet** — findings, progress, task plan, rubric with
   critical gates and edge cases from the ticket.
2. **Verify claims** — every factual claim checked against the actual repo
   first.
3. **Review, genuinely independently** — a distinct `opencode run` pass
   checks against the rubric and confirms prior findings stay resolved.
4. **Fix consistently** — every affected section, not just the one flagged;
   log the finding and fix; review again.
5. **Write** `spec-packet-draft.md`: the current packet.
6. **Record** — update `spec-dev-review-state.md`; append one line to
   `loop-run-log.md`.
7. **Take NO other action** — draft only, never the canonical spec.

> The kill switch (pause-file check), run limit (daily-cap marker), and spine durability
> (`git commit`) belong in the beat wrapper script — harness-layer guarantees that hold
> even on the model's worst beat, not requests in the prompt.
