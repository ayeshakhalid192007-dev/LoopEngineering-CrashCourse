# Pattern: `ticket-to-pr-ready`

> One ticket, one run: reproduce the failure in the smallest environment that
> shows it, prove the root cause, make the smallest credible fix, then rerun
> the original reproduction plus regression checks. If it won't reproduce
> after two serious attempts, the kit says so honestly instead of guessing at
> a fix for a bug it never actually saw — and it never folds an unrelated
> refactor into the patch, however tempting.

## Quick facts

| Field | Value |
| --- | --- |
| Category | D→B · Issue intake → PR |
| Heartbeat | event (ticket) |
| Cadence | per ticket |
| Level | L1 (report-only, drafts-not-opens-PR) |
| Cost | High |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | event — one ticket, one run |
| Body | reproduces the failure in the smallest representative environment; drafts a fix in a throwaway worktree; re-runs the repro plus regression tests; writes only `ticket-report.md`, its own state file, and the run log |
| Spine | `ticket-to-pr-ready-state.md` — reproduction evidence, root cause, fix draft, verification result, attempt count |
| Stopping condition | the source's own, verbatim: "the issue reproduces before the fix, no longer reproduces afterward, and relevant regression checks pass" |
| Checker | the before/after reproduction itself, plus `loop-verifier`, which fails any patch touching files unrelated to the fix |
| Human gate | you read the report — cause, changed files, before/after proof, risks — and open the real PR yourself, or promote the loop |

## The three valid stops

- **Success** — the repro fails before the fix, passes after, and regressions hold — or an honest "could not reproduce after two attempts" report, which is also a valid success.
- **Limit** — 20 runs (ticket instances) or 300k tokens.
- **No progress** — 2 reproduction attempts failed → the source's own stop, not a third attempt.

---

*Source: Loop #16, "The ticket-to-PR-ready loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/ticket-to-pr-ready-loop/),
original prompt by **Hiten Shah**. Its "never fold unrelated refactors" rule
matches this repo's own `loop-constraints.md` almost word for word. Full
attribution: [resources/sources.md](../resources/sources.md).*
