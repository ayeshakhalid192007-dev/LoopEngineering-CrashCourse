# Pattern: `spec-dev-review`

> For one ticket or story: write a scoped spec packet — findings, progress,
> task plan, and a rubric with critical gates and edge cases derived straight
> from the ticket — verifying every factual claim against the actual repo
> before relying on it. After each edit round, a genuinely independent
> adversarial review checks the packet against the rubric **and** confirms
> prior findings stay resolved, not just that new ones are caught.

## Quick facts

| Field | Value |
| --- | --- |
| Category | D · Issue & intake |
| Heartbeat | conditional |
| Cadence | on-demand |
| Level | L1 (report-only, drafts-not-final) |
| Cost | Medium |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | conditional — run-until-done, on-demand, one invocation per ticket/story |
| Body | writes the spec packet's four sections; verifies factual claims against the repo; writes only `spec-packet-draft.md`, its own state file, and the run log |
| Spine | `spec-dev-review-state.md` — round count, the review log, and whether each prior finding remains resolved |
| Stopping condition | the source's own, verbatim: "stop only when the reviewer returns ready with no material findings, or when the round cap is reached" |
| Checker | an independent adversarial review — checks the packet against the rubric and regression-checks that every prior finding is still resolved |
| Human gate | the source's own — a round-cap exit with an open blocker is logged for human decision, never silently retried or shipped |

## The three valid stops

- **Success** — the reviewer returns ready with no material findings, the source's own spec, verbatim.
- **Limit** — 5 rounds or 300k tokens.
- **No progress / human decision** — the round cap is reached with an open blocker → log it for human decision rather than a third or fourth attempt.

---

*Source: Loop #21, "The spec dev-review loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/spec-dev-review-loop/),
original prompt by **Ximanta**. Full attribution:
[resources/sources.md](../resources/sources.md).*
