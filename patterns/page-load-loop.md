# Pattern: `page-load-loop`

> Performance work never really finishes on its own — someone has to keep
> re-measuring after every change to prove it actually helped. This kit
> re-runs the same fixed benchmark across every route, targets the slowest
> one above the 50ms line, drafts an optimization in a throwaway worktree, and
> confirms nothing else regressed before reporting it. Setup (routes, warm-up,
> baseline) has to happen once, by a human, before the first beat can run.

## Quick facts

| Field | Value |
| --- | --- |
| Category | N · Performance |
| Heartbeat | schedule |
| Cadence | weekly |
| Level | L1 (report-only, drafts-not-applies) |
| Cost | Medium |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — weekly (the source's own cadence is "after each significant change"; weekly is this kit's default for unattended operation) |
| Body | measures load time across every route under fixed conditions; drafts a candidate optimization in a throwaway worktree, re-measures there; writes only `page-load-report.md`, its own state file, and the run log |
| Spine | `page-load-loop-state.md` — per-route load-time history, baseline, and optimization attempts |
| Stopping condition | the source's own, verbatim: "every page loads in under 50 ms" |
| Checker | the source's own, verbatim: "the same benchmark and confirm there are no regressions" |
| Human gate | the source requires initial setup — metric, routes, environment, warm-up, baseline — before any beat runs; after that, you review each drafted optimization before applying it |

## The three valid stops

- **Success** — every page loads under 50ms, the source's own spec, verbatim.
- **Limit** — 20 runs or 250k tokens.
- **No progress** — 3 consecutive beats with no measurable improvement → log and stop.

---

*Source: Loop #12, "The sub-50 ms page-load loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/sub-50ms-page-load-loop/),
original prompt by **Matthew Berman**. The source's own required setup before
any agent cycle runs is preserved as this kit's spine-first requirement. Full
attribution: [resources/sources.md](../resources/sources.md).*
