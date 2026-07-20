---
name: spec-dev-review
description: Writes a scoped spec packet for one ticket, reviewed by a
  genuinely independent adversarial pass that also regression-checks prior
  findings. Read-only outside the draft — never writes the canonical spec.
---

# spec-dev-review procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #21 (Ximanta) to this
library's L1-first, report-only shape.

1. **Write the packet** — for the ticket or story: findings, progress, task
   plan, and a rubric with critical gates and edge cases derived from that
   ticket.
2. **Verify claims** — every factual claim about the code must be checked
   against the actual repo before it goes in the packet. Never assert
   something you haven't read.
3. **Review, genuinely independently** — a distinct pass (the
   `loop-verifier` agent, or a second `claude -p` / `opencode run` call —
   never the drafting pass grading itself) checks the packet against the
   rubric **and** confirms every prior finding is still resolved, not just
   that new issues are caught.
4. **Fix consistently** — if the review finds material issues, fix every
   affected section of the packet (not just the one the reviewer pointed
   at), append the finding and fix to the review log, and review again.
5. **Write** `spec-packet-draft.md`: the current packet.
6. **Record** — update `spec-dev-review-state.md`'s round count and review
   log, append one line to `loop-run-log.md`, commit both.
7. **Take NO other action** — this is a draft, never the project's
   canonical spec. Stop when the reviewer returns ready with no material
   findings, or when the round cap (5) is reached — log the remaining
   blocker for human decision.
