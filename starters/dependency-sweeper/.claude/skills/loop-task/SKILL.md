---
name: dependency-sweeper
description: Nightly sweep of outdated dependencies. Tests each candidate
  update in a throwaway worktree and reports the result. Read-only outside
  its own sandbox — does not open a PR until promoted past L1.
---

# dependency-sweeper procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay.

1. **Read** — the manifest and lockfiles for outdated production dependencies
   not yet in `dependency-sweeper-state.md`'s per-package register.
2. **Do one unit** — for up to 10 outdated packages this beat: in a fresh,
   throwaway worktree, apply the candidate update and run the full test
   suite.
3. **Verify and record the outcome**:
   - **Suite green** → write a `dependency-report.md` entry: package, target
     version, suite result. Do NOT open a PR at L1.
   - **Suite red** → retry once in a clean worktree. Still red → write a
     `blocked` entry (version, failing check, retry count) and do not retry
     again until the version changes upstream.
4. **Record** — update `dependency-sweeper-state.md`'s per-package status,
   append one line to `loop-run-log.md`, commit both. Discard the throwaway
   worktree.
5. **Take NO other action** — no PRs, no pushes, nothing outside the scratch
   worktree survives the beat. This loop is L1 report-only until a human
   promotes it (see `LOOP.md` → Promotion to L2).
