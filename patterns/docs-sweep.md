# Pattern: `docs-sweep`

> Documentation drifts the instant code moves on without it — a renamed
> function, a dropped flag, a default nobody updated in the README. This kit
> compares the codebase against its own docs daily (or right after a push
> touching source), and drafts what changed and where the docs are now wrong.
> The original design behind it opens a pull request outright; this library
> makes every kit earn that step instead of starting there.

## Quick facts

| Field | Value |
| --- | --- |
| Category | E · Documentation |
| Heartbeat | schedule/event (push) |
| Cadence | 1d |
| Level | L1 (report-only) |
| Cost | Medium |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule/event (push) — daily, or triggered by a push to `main` touching source paths |
| Body | reads the codebase and its docs; writes only `docs-drift-report.md`, its own state file, and the run log |
| Spine | `docs-sweep-state.md` — the last-swept commit |
| Stopping condition | per-beat: every doc page touching changed code since the last mark has a report entry — drift confirmed or cleared |
| Checker | `loop-verifier` (read-only) — confirms each flagged drift by diffing the doc's claim against the actual code, not a stale-looking phrase alone |
| Human gate | you read the report and update the docs (or apply the drafted fix) yourself; nothing is opened or committed until you do |

## The three valid stops

- **Success** — each beat: every doc page touching changed code has a report entry, and the last-swept mark is updated.
- **Limit** — 10 runs/day or 200k tokens/day.
- **No progress** — 3 consecutive beats with nothing newly stale → log and stop.

---

*Source: Loop #1, "The docs sweep," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/overnight-docs-sweep/),
original prompt by **Matthew Berman**. Adapted here to L1 report-only (this
library's rule for every kit's first run), with a heartbeat, spine, checker,
and limits added — the source specified none. Full attribution:
[resources/sources.md](../resources/sources.md).*
