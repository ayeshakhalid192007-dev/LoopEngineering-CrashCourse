# Pattern: `post-merge-cleanup`

> A merge is rarely the end of the story — a branch survives it, an issue it
> fixed stays open, a preview environment keeps running with no PR left to
> justify it. This kit sweeps every few hours for exactly that kind of loose
> end and reports what looks safe to tidy. It deletes nothing, closes
> nothing, and tears nothing down on its own.

## Quick facts

| Field | Value |
| --- | --- |
| Category | A · Repo maintenance |
| Heartbeat | schedule |
| Cadence | 1d–6h |
| Level | L1 (report-only) |
| Cost | Low |
| Group | A — course-native |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — every few hours; a polling sweep, not an event subscription |
| Body | reads merged PRs, branches, linked issues, and preview-environment status via the SCM CLI; writes only `cleanup-report.md`, its own state file, and the run log |
| Spine | `post-merge-cleanup-state.md` — per-item last-seen status |
| Stopping condition | per-beat: the report lists every item newly eligible for cleanup since the last mark, each one machine-verified as genuinely orphaned |
| Checker | `loop-verifier` (read-only) — confirms each flagged item is genuinely orphaned before it's reported, not just guessed |
| Human gate | you read the report and delete/close/tear down what you approve; nothing acts until you do |

## The three valid stops

- **Success** — each beat: the report exists, lists every newly-orphaned item with a verified reason, and state marks are updated.
- **Limit** — 20 runs/day or 60k tokens/day.
- **No progress** — 3 consecutive beats with nothing newly orphaned → log and stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Part V §15A's catalog entry and the priority-order line naming it directly
("ci-sweeper > pr-babysitter > dependency-sweeper > post-merge-cleanup >
daily-triage"). The scheduled-poll shape follows Step 13a's own invitation to
reuse the mold for a cleanup sweeper. Full attribution:
[resources/sources.md](../resources/sources.md).*
