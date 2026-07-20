# Pattern: `test-coverage-loop`

> Coverage gaps accumulate until "we should really test that" becomes a
> permanent line on the backlog. Run this one on demand and it works the
> largest uncovered region first, drafts a real test for it in a throwaway
> worktree, and checks that the assertion actually means something before
> reporting the coverage delta — because a test that only executes a line
> without checking its result raises the number, not the confidence.

## Quick facts

| Field | Value |
| --- | --- |
| Category | J · Testing & QA |
| Heartbeat | conditional |
| Cadence | on-demand |
| Level | L1 (report-only, drafts-not-commits) |
| Cost | High |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | conditional — run-until-done, on-demand |
| Body | reads the suite and coverage report; drafts candidate tests in a throwaway worktree; writes only `coverage-report.md`, its own state file, and the run log |
| Spine | `test-coverage-loop-state.md` — per-region status, retry counts, and an `exclusion-candidate` register |
| Stopping condition | the source's own, verbatim: "the full test suite passes at 100% coverage" |
| Checker | the project's coverage report plus `loop-verifier`, which checks that a drafted test asserts something meaningful, not just that it executes |
| Human gate | you review each drafted test's assertions — not just the coverage number — and apply what you approve |

## The three valid stops

- **Success** — the coverage report shows 100% (accounting for human-approved exclusions), the source's own stopping condition, verbatim.
- **Limit** — 40 runs or 400k tokens.
- **No progress** — 3 consecutive beats with no coverage change → log and stop. A region moved to `exclusion-candidate` is a recorded outcome, not a stall.

---

*Source: Loop #5, "100% Test Coverage Loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/100-percent-test-coverage-loop/),
original prompt by **Matthew Berman**: "Add tests until we have 100% test
coverage." The source's own note that coverage tools measure execution, not
assertion quality, is carried into this kit's checker and its
`exclusion-candidate` register. Full attribution:
[resources/sources.md](../resources/sources.md).*
