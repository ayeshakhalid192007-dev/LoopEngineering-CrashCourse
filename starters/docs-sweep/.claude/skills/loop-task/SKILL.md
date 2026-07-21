---
name: docs-sweep
description: Reviews the codebase against its docs. Read-only. Flags stale
  documentation where the code has moved on — never edits a doc or opens a
  PR at L1.
---

# docs-sweep procedure

The prompt carries intent; this skill carries the procedure — keep it a checklist,
not an essay. Adapted from Forward Future Loop Library #1 ("The docs sweep,"
Matthew Berman) to this library's L1-first, report-only shape.

1. **Read** — the codebase for everything that changed since
   `docs-sweep-state.md`'s last-swept mark, and the documentation that
   describes it.
2. **Compare** — for each doc page whose claims touch changed code, check
   whether the doc still matches the implementation.
3. **Write** `docs-drift-report.md`: one entry per stale page — doc file and
   section · what it claims · what the code actually does now · a suggested
   (NOT applied) correction.
4. **Record** — update `docs-sweep-state.md`'s last-swept mark, append one
   line to `loop-run-log.md`, commit both.
5. **Take NO other action** — never edit a doc file, never open a PR. This
   loop is L1 report-only until a human promotes it (see `LOOP.md` →
   Promotion to L2).
