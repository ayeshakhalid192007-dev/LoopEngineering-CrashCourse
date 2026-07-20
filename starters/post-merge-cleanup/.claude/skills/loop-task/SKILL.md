---
name: post-merge-cleanup
description: Sweeps for loose ends after merges. Read-only. Flags merged
  branches, issues a merge should have closed, and orphaned preview
  environments — never deletes or closes anything itself.
---

# post-merge-cleanup procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay.

1. **Read** — merged PRs, branches, linked issues, and preview/deploy
   environment status via the SCM CLI, since
   `post-merge-cleanup-state.md`'s last-seen marks.
2. **Flag** — merged branches still present; issues a merge references
   (`fixes #N`, `closes #N`) that are still open; preview/deploy environments
   with no open PR pointing at them. Verify each before flagging — don't
   guess from the branch name alone.
3. **Write** `cleanup-report.md`: one line per item —
   `[kind] item · why it's orphaned · suggested (NOT taken) action`.
4. **Record** — update `post-merge-cleanup-state.md`'s per-item last-seen
   status, append one line to `loop-run-log.md`, commit both.
5. **Take NO other action** — no branch deletions, no issue closures, no
   environment teardowns. Writes beyond the report + spine are out of scope
   at L1.
