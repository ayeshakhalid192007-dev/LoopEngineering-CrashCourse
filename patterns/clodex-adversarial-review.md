# Pattern: `clodex-adversarial-review`

> A real maker–checker pair, not one pass grading itself: Claude implements
> and fixes a PR, a genuinely separate adversarial reviewer (Codex, or a
> subagent standing in for it) checks it against a severity threshold, and
> the two iterate up to 5 rounds. Its sharpest rule: an iteration-cap exit
> with open findings is reported as exhausted, never as approved — this
> course's own "green ≠ done," independently arrived at.

## Quick facts

| Field | Value |
| --- | --- |
| Category | B · PR & review |
| Heartbeat | event (PR) |
| Cadence | per PR |
| Level | L1 (report-only, drafts-not-pushes) |
| Cost | Medium |
| Group | B — Forward Future Loop Library |

## The six parts

| Part | This kit |
| --- | --- |
| Heartbeat | event — a PR opened or updated fires a beat; up to 5 iterations per PR |
| Body | reads the PR diff; runs an adversarial review; for findings at or above threshold, drafts a fix in a throwaway worktree; writes only `clodex-review-report.md`, its own state file, and the run log |
| Spine | `clodex-adversarial-review-state.md` — per-PR iteration count, findings history, verdict; resumable |
| Stopping condition | the source's own, verbatim: "Codex approves, only accepted findings remain, progress stalls, or the iteration cap is reached" |
| Checker | the adversarial reviewer **is** the checker by design — a genuinely separate pass, never the maker grading itself |
| Human gate | you read the verdict and findings and apply the drafted fixes to the real PR yourself |

## The three valid stops

- **Success** — the reviewer approves, or only accepted findings remain — the source's own spec, verbatim.
- **Limit** — 5 iterations or 400k tokens.
- **No progress** — 2 consecutive iterations with the same findings unresolved → escalate the disagreement to the human, don't keep iterating.

---

*Source: Loop #9, "The Clodex adversarial-review loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/loops/clodex-adversarial-review-loop/),
original prompt by **Lukas Kucinski**. Full attribution:
[resources/sources.md](../resources/sources.md).*
