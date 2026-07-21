# Pattern: `repo-cleanup-loop`

> Repositories accumulate their own kind of clutter — branches nobody deleted,
> worktrees nobody closed, PRs superseded months ago. Weekly, this kit
> inspects local and remote state and classifies every stale-looking item as
> current, someone's in-progress work, safe to remove, or genuinely uncertain
> — and it never suggests discarding uncommitted changes or closing someone
> else's PR without flagging it for confirmation first.

## Quick facts

| Field | Value |
| --- | --- |
| Category | A · Repo maintenance |
| Heartbeat | schedule |
| Cadence | weekly |
| Level | L1 (report-only) |
| Cost | Low |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | schedule — weekly |
| Body | reads branches, PRs, commits, and worktrees via the SCM CLI and local git state; writes only `repo-cleanup-report.md`, its own state file, and the run log |
| Spine | `repo-cleanup-loop-state.md` — per-item classification (current / owned / safe-to-remove / uncertain) and evidence |
| Stopping condition | the source's own, verbatim: "valuable work is recovered and remaining repository state is intentional" |
| Checker | `loop-verifier` (read-only) — confirms every "safe to remove" classification actually has supporting evidence, not a guess |
| Human gate | the source's own explicit rule — "do not delete uncertain work, discard uncommitted changes, or close someone else's pull request without confirmation" |

## The three valid stops

- **Success** — valuable work is recovered and remaining state is intentional, checked against the source's own criteria.
- **Limit** — 15 runs or 150k tokens.
- **No progress** — 3 consecutive beats with nothing newly flagged → log and stop.

---

*Source: Loop #10, "The repository cleanup loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/repository-cleanup-loop/),
original prompt by **Matthew Berman**. This kit's L1 goes further than the
source's own gate — it deletes nothing at all, regardless of confidence. Full
attribution: [resources/sources.md](../resources/sources.md).*
