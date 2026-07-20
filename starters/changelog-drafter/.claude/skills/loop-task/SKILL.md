---
name: changelog-drafter
description: Daily or per-tag changelog drafting. Read-only on CHANGELOG.md —
  drafts entries for every merged PR since the last beat, never commits them.
---

# changelog-drafter procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay.

1. **Read** — every PR merged since `changelog-drafter-state.md`'s
   last-processed PR number.
2. **Do one unit** — for each merged PR, draft one changelog line: PR number
   and title, what changed, suggested category (Added/Changed/Fixed/Removed).
3. **Verify** — every merged PR number since the last mark appears in
   `changelog-draft.md`; this is the same spec as the stopping condition.
4. **Record** — update `changelog-drafter-state.md`'s last-processed PR
   number, append one line to `loop-run-log.md`, commit both.
5. **Take NO other action** — never write to `CHANGELOG.md` itself. If a PR
   can't be drafted (no clear description, merge commit with no PR), skip it
   and note it in the spine; if the same PR blocks 3 consecutive beats,
   escalate instead of retrying.
