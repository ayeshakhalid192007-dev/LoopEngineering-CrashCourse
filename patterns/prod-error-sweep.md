# Pattern: `prod-error-sweep`

> Production errors are the ones that actually cost users something, so this
> kit checks the logs every 1–6 hours, traces anything actionable to its root
> cause, and drafts a verified fix. If nothing actionable turns up, that's a
> complete, successful beat — not a gap to apologize for. Its one hard rule,
> carried from the source unchanged: never let a credential, token, or private
> payload leave the logs into a report, a PR, or a chat message.

## Quick facts

| Field | Value |
| --- | --- |
| Category | L · Monitoring & incident |
| Heartbeat | schedule |
| Cadence | 1–6h |
| Level | L1 (report-only, drafts-not-opens-PR) |
| Cost | Medium |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — every 1–6 hours |
| Body | reads production logs and error telemetry; drafts a fix in a throwaway worktree, runs tests there; writes only `prod-error-report.md`, its own state file, and the run log |
| Spine | `prod-error-sweep-state.md` — per-error status, root cause, fix draft, verification result |
| Stopping condition | the source's own, verbatim: "if no actionable errors are present, stop without making changes" — otherwise, a beat completes when the traced error has a verified-fix entry |
| Checker | the test suite re-run against the drafted fix, plus `loop-verifier` scanning the report for anything that looks like a leaked credential or payload |
| Human gate | you read the report and apply the fix yourself; nothing is opened or committed until you do |

## The three valid stops

- **Success** — the traced error has a verified-fix entry, or (the source's own explicit case) nothing actionable was present and the mark advanced cleanly.
- **Limit** — 24 runs/day or 250k tokens/day.
- **No progress** — 3 consecutive beats with nothing actionable → log and stop (different from the source's per-beat "stop without making changes," which is a success).

---

*Source: Loop #4, "The production error sweep," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/production-error-sweep/),
original prompt by **Matthew Berman**. The source's own constraint — never
copy credentials, tokens, personal information, or private payloads into
prompts, PRs, or chat — is carried forward unchanged. Full attribution:
[resources/sources.md](../resources/sources.md).*
