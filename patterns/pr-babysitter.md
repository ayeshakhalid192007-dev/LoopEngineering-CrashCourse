# Pattern: `pr-babysitter`

> Open pull requests rot quietly — a conflict appears, CI goes red, a reviewer
> goes silent — and nobody notices until someone asks "what happened to that
> PR?" This kit checks in every ten minutes during business hours and surfaces
> exactly what changed since the last look, ranked by how much it needs a
> human. It comments on nothing and merges nothing; a wrong read here costs a
> re-read, never an unrecallable action on shared history.

## Quick facts

| Field | Value |
| --- | --- |
| Category | B · PR & review |
| Heartbeat | schedule |
| Cadence | 5–15m |
| Level | L1 (report-only) |
| Cost | High |
| Group | A — course-native |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — every 10 minutes, business hours |
| Body | reads every open PR's review state, CI status, mergeability, and staleness via the SCM CLI; writes only `pr-status-report.md`, its own state file, and the run log |
| Spine | `pr-babysitter-state.md` — per-PR last-seen status, so a beat reports only what changed |
| Stopping condition | per-beat: `pr-status-report.md` written, ranked, template-matched — this kit never "finishes" while PRs exist |
| Checker | `loop-verifier` (read-only) — grades report format; this kit is itself the reconciliation sweep for anything an event-driven reviewer might miss |
| Human gate | you read the report and decide what to act on; nothing acts until you do |

## The three valid stops

- **Success** — each beat: `pr-status-report.md` exists, ranked, template-matched, and per-PR marks are updated.
- **Limit** — 60 runs/day or 350k tokens/day.
- **No progress** — no status change across all open PRs for 3 consecutive beats → log and stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Step 7 — Event-Driven Loops (the PR-review / reconciliation-sweep case study)
and Part V §15B's catalog entry. Full attribution:
[resources/sources.md](../resources/sources.md).*
