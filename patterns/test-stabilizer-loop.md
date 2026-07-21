# Pattern: `test-stabilizer-loop`

> Flaky tests erode trust in the whole suite until nobody believes a red run
> means anything. This kit runs the suite N times to catch the flake, traces
> the most frequent one to a real cause — shared state, timing, ordering, an
> external dependency — and refuses to paper over it with a sleep or a blind
> retry. It stops the moment N consecutive full-suite runs are clean, progress
> stalls, or a human decision is genuinely needed.

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
| Body | runs the suite N times to find flakes; investigates the most frequent one's root cause; drafts a fix in a throwaway worktree and verifies it; writes only `stabilizer-report.md`, its own state file, and the run log |
| Spine | `test-stabilizer-loop-state.md` — per-flake status, root cause, fix attempts, and a `quarantine-candidate` register |
| Stopping condition | the source's own, verbatim: "N consecutive full-suite runs are green under the recorded conditions" — or progress stalls, or approval is required |
| Checker | the suite's own pass/fail streak plus `loop-verifier`, which fails any fix that hides an unresolved cause behind a sleep or retry |
| Human gate | the source's own third exit — "approval is required" — you review every fix and quarantine recommendation before either is applied |

## The three valid stops

- **Success** — N consecutive full-suite runs are green under the recorded conditions, the source's own stopping condition, verbatim.
- **Limit** — 30 runs or 500k tokens.
- **No progress / approval required** — progress stalls (3 beats, same flake, no new evidence), or a beat's findings genuinely need a human decision before continuing.

---

*Source: Loop #6, "The test stabilizer loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/test-stabilizer-loop/),
original prompt by **hungtv27**, used near-verbatim; this kit's only change is
L1 report-only (drafts, doesn't commit) per this library's rule. Full
attribution: [resources/sources.md](../resources/sources.md).*
