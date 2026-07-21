# Constraints: `test-stabilizer-loop` (the constitution)

> Standing rules that never change per task. The model reads these as intent — but the
> **guarantees** below belong in the harness (permissions, hooks, branch protection),
> because a rule the model must choose to follow is only a request.

## Never (enforce in the harness, not just here)

- Never write outside this loop's owned paths (see [`LOOP.md`](LOOP.md) → Ownership).
- Never touch secret paths: `.env*`, `auth/`, `payments/`, `secrets/`, `credentials/`.
- **Never fix a flake with a blind sleep or retry.** This is the source
  loop's own explicit rule, carried forward unchanged: a sleep or retry
  masks the symptom without naming the cause (shared state, timing,
  ordering, or an external dependency). A drafted fix that does this is not
  a fix — the `loop-verifier` fails it automatically.
- **Never commit a fix or quarantine a test at L1** — candidates are tested
  in a throwaway worktree that is discarded at the end of the beat.
- **Never retry the same flake more than once.** Retry-once-then-
  `quarantine-candidate` is the doom-loop bound
  ([infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md))
  — the source's own third exit ("approval is required") exists for exactly
  this: when the loop can't find the cause, it stops and asks, it doesn't
  keep guessing.
- Never take an external, visible action beyond the report.

## Always

- Always diagnose before drafting — name the actual mechanism (shared state,
  timing, ordering, dependency), not a symptom.
- Always test a candidate fix in a **fresh, isolated worktree**
  ([Step 8 · Worktrees](../../docs/05-part-3-the-body/08-worktrees.md)).
- Always verify with real runs — N runs of the fixed test, one full-suite
  run — never trust a fix without re-running it.
- Always read the spine first and update + **commit** it before the beat ends.
- Always append exactly one line to `loop-run-log.md` per beat — no silent runs.

## Stop conditions are specs

This loop stops on exactly three things, matching the source's own design
almost exactly — **success** (N consecutive full-suite runs green, the spec
in `LOOP.md`), **limit** (`loop-budget.md`), or **no progress / approval
required** for 3 beats. "Feels done" is not a stop. A flake written to
`quarantine-candidate` after its one attempt **is** a stop for that item — it
is not stalling, it is the bound doing its job.

---

*Attribution: constraints follow the safety model of the course
([safety](../../docs/10-operating/safety.md)) and the doom-loop bound from
[infinite-loops.md](../../docs/10-operating/infinite-loops.md); the
never-blind-sleep-or-retry rule comes from the source loop itself (Forward
Future Loop #6, hungtv27). Full attribution:
[resources/sources.md](../../resources/sources.md).*
