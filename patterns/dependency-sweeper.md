# Pattern: `dependency-sweeper`

> Dependencies drift out of date every day, but updating them blind is how
> builds break at 2am. This kit runs nightly, tests every outdated package's
> candidate update in a fresh throwaway worktree, and reports which ones are
> safe to take and which are `blocked` with a reason — never touching the real
> tree, never opening anything, until a human decides the report is worth
> acting on.

## Quick facts

| Field | Value |
| --- | --- |
| Category | A · Repo maintenance |
| Heartbeat | schedule |
| Cadence | 6h–1d |
| Level | L1 (report-only) — catalog target L2, permanent once earned |
| Cost | Medium |
| Group | A — course-native |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — nightly at 02:00, wrapping a conditional run-until-done body |
| Body | reads manifests and lockfiles; tests candidate updates in an isolated throwaway worktree; writes only `dependency-report.md`, its own state file, and the run log |
| Spine | `dependency-sweeper-state.md` — per-package status, retry counts, and a `blocked` register |
| Stopping condition | a beat is complete when every outdated production dependency has a passing-suite recommendation or a `blocked` entry |
| Checker | the full test suite (must exit 0 in the scratch worktree) plus a read-only `loop-verifier` confirming the report's claims match what actually ran |
| Human gate | you decide which updates to apply for real; nothing is opened, pushed, or merged until you do |

## The three valid stops

- **Success** — every outdated production dependency has a tested-and-recommended entry or a `blocked` entry, and state marks are updated.
- **Limit** — 10 update attempts/beat, 45 runs/day, or 300k tokens/day.
- **No progress** — 3 consecutive beats with an unchanged outdated-package list → log and stop. A `blocked` package is a recorded outcome, not a stall.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course))
via the course's own worked example, "Designing the Dependency-Update Loop"
(`docs/09-methods/worked-example-dependency-sweeper.md`), which applies the
A–F method to this exact catalog entry end to end. Full attribution:
[resources/sources.md](../resources/sources.md).*
