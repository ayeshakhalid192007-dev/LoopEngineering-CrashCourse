# Constraints: `test-coverage-loop` (the constitution)

> Standing rules that never change per task. The model reads these as intent — but the
> **guarantees** below belong in the harness (permissions, hooks, branch protection),
> because a rule the model must choose to follow is only a request.

## Never (enforce in the harness, not just here)

- Never write outside this loop's owned paths (see [`LOOP.md`](LOOP.md) → Ownership).
- Never touch secret paths: `.env*`, `auth/`, `payments/`, `secrets/`, `credentials/`.
- **Never commit a test file at L1** — candidate tests are tested in a
  throwaway worktree that is discarded at the end of the beat.
- **Never draft a test with no real assertion just to raise the coverage
  number.** Coverage tools measure execution, not correctness — a test that
  calls a function without checking anything is a false positive, not
  progress (the source's own explicit caveat).
- **Never retry the same uncovered region more than once.**
  Retry-once-then-`exclusion-candidate` is the doom-loop bound
  ([infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md))
  — genuinely untestable code (dead code, generated code) retried a third
  time with the same approach is not persistence, it is the failure mode
  itself.
- Never take an external, visible action beyond the report.

## Always

- Always test a candidate in a **fresh, isolated worktree** — never edit
  files in the primary checkout
  ([Step 8 · Worktrees](../../docs/05-part-3-the-body/08-worktrees.md)).
- Always run the **full** suite, not just the new test, to confirm nothing
  broke.
- Always treat the coverage report as the source of truth for the number,
  but the drafted test's actual assertion as the source of truth for
  whether the number means anything.
- Always read the spine first and update + **commit** it before the beat ends.
- Always append exactly one line to `loop-run-log.md` per beat — no silent runs.

## Stop conditions are specs

This loop stops on exactly three things — **success** (the spec in `LOOP.md`,
verbatim from the source: "the full test suite passes at 100% coverage"),
**limit** (`loop-budget.md`), or **no progress** for 3 beats. "Feels done" is
not a stop. A region written to `exclusion-candidate` after its one retry
**is** a stop for that item — it is not stalling, it is the bound doing its
job.

---

*Attribution: constraints follow the safety model of the course
([safety](../../docs/10-operating/safety.md)) and the doom-loop bound from
[infinite-loops.md](../../docs/10-operating/infinite-loops.md); the
assertion-quality caveat and exclusion-register recommendation come from the
source loop itself (Forward Future Loop #5, Matthew Berman). Full
attribution: [resources/sources.md](../../resources/sources.md).*
