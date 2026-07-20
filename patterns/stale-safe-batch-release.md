# Pattern: `stale-safe-batch-release`

> The last kit in this library, and a fitting bookend: every other kit uses an
> isolated worktree to test safely; this one exists to guarantee the *final*
> release never accidentally ships from one. Per release window, it reviews
> pending PRs, excludes anything stale or unfinished, and combines the current
> ones into a release batch built strictly from complete artifacts off the
> latest integrated `main` — never a task worktree, never a partial overlay.

## Quick facts

| Field | Value |
| --- | --- |
| Category | C · Release |
| Heartbeat | schedule/tag |
| Cadence | per release window |
| Level | L1 (report-only) |
| Cost | Low |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule/tag — per release window |
| Body | reads pending PRs and their merge/staleness status; builds a combined-release artifact from `main`; writes only `release-batch-report.md`, its own state file, and the run log |
| Spine | `stale-safe-batch-release-state.md` — per-PR inclusion decision, batch composition, artifact source verification |
| Stopping condition | the source's own, verbatim: "only current, complete changes ship in the combined release" |
| Checker | `loop-verifier` (read-only) — confirms every included change is genuinely current and that the batch traces to `main`, not a worktree or overlay |
| Human gate | you read the release-batch report and perform the actual release yourself; nothing ships until you do |

## The three valid stops

- **Success** — only current, complete changes ship in the combined release, confirmed by the batch report.
- **Limit** — 15 runs or 150k tokens.
- **No progress** — 3 consecutive beats with no pending PRs to batch → log and stop.

---

*Source: Loop #33, "The stale-safe batch release loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/stale-safe-batch-release-loop/),
original prompt by **Matthew Berman**. Its deployment-integrity rule — never
deploy from a task worktree or partial file overlay — is carried forward
unchanged. Full attribution: [resources/sources.md](../resources/sources.md).*
