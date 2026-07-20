---
name: test-coverage-loop
description: Adds tests until the suite reaches 100% coverage. Drafts
  candidate tests in a throwaway worktree and reports them — never commits
  a test file itself.
---

# test-coverage-loop procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #5 (Matthew Berman) to
this library's L1-first, report-only shape.

1. **Read** — the coverage report. Identify uncovered regions not yet in
   `test-coverage-loop-state.md`'s register.
2. **Do one unit** — for up to 5 uncovered regions this beat (largest
   first): in a fresh throwaway worktree, draft a test with a real
   assertion (not just line execution), run the full suite.
3. **Verify**:
   - **Coverage rose, suite green** → write a `coverage-report.md` entry:
     region, the drafted test, the coverage delta, the suite result.
   - **Still uncoverable or suite red after one retry in a clean worktree**
     → write an `exclusion-candidate` entry instead (region, why it resists
     testing) and do not retry it again this cycle.
4. **Record** — update `test-coverage-loop-state.md`'s per-region status,
   append one line to `loop-run-log.md`, commit both. Discard the throwaway
   worktree.
5. **Take NO other action** — never commit a test file. This loop is L1
   report-only until a human promotes it (see `LOOP.md` → the source's own
   caveat on assertion quality applies at every level).
