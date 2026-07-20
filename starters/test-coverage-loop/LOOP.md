# Loop: `test-coverage-loop`

> Adds tests until the suite reaches full coverage — on demand, not on a
> schedule. Each beat targets the largest uncovered region, drafts a test for
> it in a throwaway worktree, and reports whether it raised coverage without
> weakening what "covered" means. It never commits a test itself.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | conditional — run-until-done, on-demand (you start it; it works the uncovered-region list to empty or to its per-beat limit) |
| **Body** | reads the test suite and the coverage report; drafts candidate tests in a throwaway worktree and runs them there; **writes only `coverage-report.md`, `test-coverage-loop-state.md`, and the run log** — no test file is committed at L1 |
| **Spine** | `test-coverage-loop-state.md` (renamed from [`loop-state.md.example`](loop-state.md.example)) — per-uncovered-region status, retry counts, and an `exclusion-candidate` register |
| **Stopping condition** | the source's own spec, verbatim: *"the full test suite passes at 100% coverage."* A beat is complete when every uncovered region since the last mark has either a drafted, suite-passing test recommendation, or an `exclusion-candidate` entry |
| **Checker** | the project's own coverage report — *"the source of truth,"* per the source — plus the `loop-verifier` agent (read-only), which checks that a drafted test actually asserts something meaningful, not just that it *executes* the line |
| **Human gate** | you read the report, review each drafted test's assertions (not just the coverage number), and apply what you approve; nothing is committed until you do |

**Level: L1 (report-only, drafts-not-commits)** — every kit in this library
ships this way; no loop earns L2 until a human has watched one real run
succeed ([`kit-state.md`](../../../kit-state.md), CLAUDE.md rule 4). The
source specifies no autonomy level; this library's rule applies regardless.
See [safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the test-coverage-loop skill per skills/loop-task. Read the coverage
report. For up to 5 uncovered regions this beat (largest first): in a
throwaway worktree, draft a test with a real assertion (not just line
execution), run the suite, confirm coverage rose and nothing broke. Write
coverage-report.md: region · drafted test (as a diff or code block) ·
coverage delta · suite result. If a region can't be tested cleanly after one
retry (dead code, generated code, truly untestable), write an
exclusion-candidate entry instead, recommending it for the project's coverage
config — do not keep retrying it. Update test-coverage-loop-state.md. Append
one line to loop-run-log.md. Take NO other action — never commit a test file.
Stop when the coverage report shows 100% (accounting for approved
exclusions), after 40 runs, or after 3 consecutive beats with no coverage
change.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 40 |
| Max tokens/day | 400k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). High cost reflects writing and
running candidate tests every beat. Per-beat regions capped at **5**;
per-region retry at **1**, then `exclusion-candidate` — the doom-loop bound
from [infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `test-coverage-loop-state.md` | **write** (sole owner) |
| `coverage-report.md` | **write** (sole owner) |
| a throwaway test worktree | **write** (isolated, discarded after the beat) |
| `loop-run-log.md` | **append-only** |
| the test suite and coverage report | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the coverage report shows 100% (accounting for any
  human-approved exclusions), matching the source's own stopping condition
  verbatim. ← *how a good run ends*
- **Limit** — 40 runs or 400k tokens.
- **No progress** — 3 consecutive beats with no coverage change → log and
  stop. A region written to `exclusion-candidate` after its retry is **not**
  "no progress" — it is a recorded, human-reviewable outcome.

## A caveat from the source, worth repeating

The original loop's own implementation note: *coverage tools measure code
execution, not assertion quality.* A drafted test that merely calls a
function without checking its result raises the number without raising
confidence. That is exactly why the `loop-verifier` grades assertions, not
just the coverage delta, and why the human gate reviews the drafted test
itself — never just the percentage.

---

*Source: Loop #5, "100% Test Coverage Loop," from Forward Future's Loop
Library (`https://signals.forwardfuture.com/loop-library/`), original prompt
by **Matthew Berman**: "Add tests until we have 100% test coverage." Stopping
condition per the source: "The full test suite passes at 100% coverage,"
checked against "the project's coverage report as the source of truth." The
source's own implementation note about assertion quality vs. line execution,
and its recommendation to maintain explicit exclusions, are both carried
into this kit's checker and `exclusion-candidate` register. Catalog
placement: Part V §15's test-coverage entry (J · Testing & QA, conditional,
on-demand, L2 target, High). Full attribution:
[resources/sources.md](../../resources/sources.md).*
