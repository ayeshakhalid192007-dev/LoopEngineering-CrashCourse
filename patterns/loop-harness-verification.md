# Pattern: `loop-harness-verification`

> A general-purpose harness for whatever scheduled repo task it wraps — CI
> triage, issue grooming, a dependency update, a docs sync. One session stages
> a patch or outbox message in an isolated worktree; a genuinely separate
> second session verifies it against explicit criteria before anything ships.
> This is Step 11's maker–checker split, described independently by an
> external source — and it's the exact shape every `loop-verifier` in this
> library already follows.

## Quick facts

| Field | Value |
| --- | --- |
| Category | I · Self-improvement / meta |
| Heartbeat | schedule |
| Cadence | per scheduled run |
| Level | L1 (report-only, stages-not-delivers) |
| Cost | Low |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — per scheduled run of whatever task this instance wraps |
| Body | in an isolated worktree, stages a patch or outbox message; writes only `harness-report.md`, its own state file, and the run log |
| Spine | `loop-harness-verification-state.md` — source revision, staged output, verifier result, delivery status, next run |
| Stopping condition | the source's own, verbatim: "ship only after a pass; otherwise preserve the findings and retry only within the limit" |
| Checker | a second, genuinely separate session — the source's own design, independently identical to this library's own `loop-verifier` pattern |
| Human gate | you read the harness report and deliver or apply it yourself; nothing is delivered until you do |

## The three valid stops

- **Success** — reported as ready-to-ship only after a pass, per the source's own spec.
- **Limit** — 20 runs, 250k tokens, or the source's own retry limit for a single staged output.
- **No progress** — 3 consecutive failed verifications with no new findings → preserve the findings and stop.

---

*Source: Loop #17, "Loop Harness Second-Agent Verification Workflow," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/loop-harness-verification-loop/),
original prompt by **Istasha**. Full attribution:
[resources/sources.md](../resources/sources.md).*
