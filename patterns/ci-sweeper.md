# Pattern: `ci-sweeper`

> A red `main` blocks everyone behind it, so this kit fires the instant CI
> finishes and tells you whether the failure is a flake worth ignoring or a
> real break worth fixing — plus a scheduled sweep every ten minutes to catch
> anything the event dropped. Its eventual job is to fix real failures for
> real, in an isolated worktree, as a reviewable PR; today it only classifies
> and drafts, because every kit here earns write access, it doesn't start
> with it.

## Quick facts

| Field | Value |
| --- | --- |
| Category | A · Repo maintenance |
| Heartbeat | schedule/event |
| Cadence | 5–15m |
| Level | L1 (report-only) — catalog target L2, an earned promotion |
| Cost | Very high |
| Group | A — course-native |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule/event — a CI-completion event fires a beat immediately; a 10-minute sweep is the reconciliation pass |
| Body | reads CI run logs and `main`'s status; writes only `ci-sweeper-report.md`, its own state file, and the run log |
| Spine | `ci-sweeper-state.md` — per-failure status and classification |
| Stopping condition | a beat is complete when the triggering failure has a report entry: classification, why it matters, a suggested-not-applied fix |
| Checker | `loop-verifier` (read-only) — grades the classification and format; never the maker |
| Human gate | you decide whether to apply the suggested fix, and separately whether this kit has earned promotion to L2 |

## The three valid stops

- **Success** — each beat: the report has a classified, ranked entry for the triggering failure with a suggested fix, and state marks are updated.
- **Limit** — 40 runs/day or 300k tokens/day.
- **No progress** — 3 consecutive beats with no new failure on `main` → log a quiet beat and stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Part V §15A's catalog entry (schedule/event, 5–15m, L2 target, Very high —
"red main blocks everything," the fleet's top priority) and the doom-loop
retry-cap bound from `docs/10-operating/infinite-loops.md`, scenario 1. Full
attribution: [resources/sources.md](../resources/sources.md).*
