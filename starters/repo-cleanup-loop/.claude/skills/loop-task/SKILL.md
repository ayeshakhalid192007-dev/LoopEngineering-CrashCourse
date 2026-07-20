---
name: repo-cleanup-loop
description: Inspects branches, PRs, commits, and worktrees for what's
  stale vs. valuable. Read-only. Never deletes uncertain work or
  someone else's PR without confirmation.
---

# repo-cleanup-loop procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #10 (Matthew Berman) to this
library's L1-first, report-only shape.

1. **Read** — local and remote branches, open PRs, recent commits, and
   worktrees via the SCM CLI and git.
2. **Gather evidence** — for each item: is the branch merged? is the PR
   closed or superseded? is the worktree orphaned? is there uncommitted work
   that would be lost?
3. **Classify** — current (active use), owned (someone's in-progress work —
   leave it), safe-to-remove (evidence-backed), or uncertain (needs a human
   look).
4. **Write** `repo-cleanup-report.md`: one line per flagged item —
   `[classification] item · evidence · suggested (NOT taken) action`. Never
   suggest discarding uncommitted changes or closing someone else's PR
   without flagging it as needing confirmation.
5. **Record** — update `repo-cleanup-loop-state.md`'s per-item register,
   append one line to `loop-run-log.md`, commit both.
6. **Take NO other action** — no deletions, no closures. Writes beyond the
   report + spine are out of scope at L1.
