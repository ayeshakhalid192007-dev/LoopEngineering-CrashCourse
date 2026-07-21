# Pattern: `issue-triage`

> A narrower cousin of `daily-triage`, stripped down to issues alone — no PRs,
> no CI. Every few hours it reads what's new or changed in the tracker and
> leaves a suggested label and priority for each, most urgent first. It never
> applies a label itself; the mold is the same five-line report Step 13a
> invites you to reuse, just narrowed to one input.

## Quick facts

| Field | Value |
| --- | --- |
| Category | D · Issue & intake |
| Heartbeat | schedule |
| Cadence | 2h–1d |
| Level | L1 (report-only) |
| Cost | Low |
| Group | A — course-native |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — every few hours |
| Body | reads new/updated issues via the SCM CLI; writes only `issue-triage-report.md`, its own state file, and the run log |
| Spine | `issue-triage-state.md` — last-seen issue marks |
| Stopping condition | per-beat: the report is written, ≤5 lines, most urgent first, matching the template |
| Checker | `loop-verifier` (read-only) — grades format; content judgment stays with the human |
| Human gate | you read the report and apply labels/priority yourself; nothing is applied until you do |

## The three valid stops

- **Success** — each beat: the report exists, ≤5 lines, ranked, each line naming issue/why/suggested-label, and state marks are updated.
- **Limit** — 12 runs/day or 60k tokens/day.
- **No progress** — 3 consecutive beats with nothing new to triage → log and stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Part V §15D's catalog entry and Step 13a's own invitation to reuse its exact
shape — this kit is `daily-triage`'s five-line-report mold, narrowed to
issues alone. Full attribution:
[resources/sources.md](../resources/sources.md).*
