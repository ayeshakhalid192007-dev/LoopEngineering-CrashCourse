---
name: codex-completion-contract
description: Defines every required outcome and its evidence before acting
  on long-running work, then audits each requirement as proved/weak/missing/
  contradicted. Only run when explicitly asked for a completion audit.
---

# codex-completion-contract procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #28 (3goblack) to this
library's L1-first, report-only shape.

**Before starting**: only run this for a named Goal, and only when
explicitly asked for a completion audit — ask before creating Goal state at
all. This is not for ordinary task planning.

1. **Define the contract** — before any action, list every required outcome
   and what evidence would prove it (a passing test, a verified deploy
   log, a re-read diff — not a claim).
2. **Read** — the target work's actual current state.
3. **Audit** — mark every requirement: **proved** (real, current evidence
   exists), **weak** (evidence is partial or stale), **missing** (no
   evidence yet), or **contradicted** (evidence says it didn't work).
4. **Decide**:
   - **All proved** → the Goal is complete.
   - **Any not proved, and the work can continue** → note what's needed next.
   - **A requirement can't be proved right now** → **blocked**, not failed.
   - **No new evidence for 3 consecutive beats** → **stalled**.
   - **The run limit or token cap is reached first** → **exhausted**. This
     is never the same as complete — budget exhaustion is not success.
5. **Write** `completion-audit.md`: the requirement-to-evidence table,
   status (complete/blocked/stalled/exhausted), owner, and next action.
6. **Record** — update `codex-completion-contract-state.md`, append one
   line to `loop-run-log.md`, commit both.
7. **Take NO other action** — writes beyond the audit + spine are out of
   scope at L1.
