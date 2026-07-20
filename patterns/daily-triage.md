# Pattern: `daily-triage`

> Nobody wants to open their laptop to a wall of overnight noise. This kit runs
> before you sit down, scans whatever piled up in issues, PRs, and CI while you
> were away, and hands you a ranked, five-line brief instead — most urgent
> first, nothing buried. It never touches anything it reads; the only output
> is the report.

## Quick facts

| Field | Value |
| --- | --- |
| Category | A · Repo maintenance |
| Heartbeat | schedule |
| Cadence | 1d–2h |
| Level | L1 (report-only) |
| Cost | Low |
| Group | A — course-native |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — weekdays 07:00, your timezone |
| Body | reads issues/PRs/CI via the SCM CLI; writes only `triage-report.md`, its own state file, and the run log |
| Spine | `daily-triage-state.md` — last-seen marks per issue/PR/CI run, so a beat never re-reports what it already flagged |
| Stopping condition | one beat, one `triage-report.md`, ≤5 lines, ranked, matching the template |
| Checker | `loop-verifier` (read-only) — grades report format only; content judgment stays with the human |
| Human gate | you read the report over coffee; nothing is acted on until you do |

## The three valid stops

- **Success** — `triage-report.md` exists, ≤5 lines, ranked, each line naming what/why/suggested-action, and the state file's marks are updated.
- **Limit** — 1 run/day or 15k tokens/day.
- **No progress** — nothing new to triage for 3 consecutive beats → log and stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Step 13 — Build the Morning-Triage Loop. Full attribution:
[resources/sources.md](../resources/sources.md).*
