# Loop: `clodex-adversarial-review`

> A real two-agent maker–checker loop: Claude implements and fixes, an
> adversarial reviewer (Codex, or a subagent standing in for it) reviews
> against a severity threshold, up to 5 iterations. Never describes an
> errored or exhausted run as approved — the source's own honesty rule,
> matching this course's own "green ≠ done."

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | event — a PR opened or updated fires a beat; up to 5 iterations per PR (`--max-iter 5`) |
| **Body** | reads the PR diff; runs an adversarial review (the real `codex` CLI if available, otherwise the `loop-verifier` agent standing in for it); for findings at or above the severity threshold (medium, by default), drafts a fix in a throwaway worktree; **writes only `clodex-review-report.md`, `clodex-adversarial-review-state.md`, and the run log** — no commit is pushed to the real PR branch |
| **Spine** | `clodex-adversarial-review-state.md` (renamed from [`loop-state.md.example`](loop-state.md.example)) — per-PR iteration count, findings history, verdict; resumable, per the source's own requirement |
| **Stopping condition** | the source's own, verbatim: *"Codex approves, only accepted findings remain, progress stalls, or the iteration cap is reached"* |
| **Checker** | the adversarial reviewer **is** the checker, by design — this is Step 11's maker–checker split made literal: Claude is the maker, Codex (or its subagent stand-in) is a genuinely separate reviewer, never the same pass grading itself |
| **Human gate** | you read the verdict and findings and apply the drafted fixes to the real PR yourself; nothing is pushed until you do |

**Level: L1 (report-only, drafts-not-pushes)** — every kit in this library
ships this way; no loop earns L2 until a human has watched one real run
succeed ([`kit-state.md`](../../../kit-state.md), CLAUDE.md rule 4). The
catalog's own target level for this loop is also L1 — a review loop's job
is a verdict and findings, not a merge, at any level. See
[safety](../../docs/10-operating/safety.md) and
[Step 11 · Maker–Checker](../../docs/05-part-3-the-body/11-maker-checker.md).

## The prompt

```text
Run the clodex-adversarial-review skill per skills/loop-task, think hard,
--max-iter 5 --threshold medium. Read the PR diff. Run an adversarial review
against it (the codex CLI, or the loop-verifier subagent as a stand-in).
For each finding at or above the severity threshold: in a throwaway
worktree, draft a fix. Re-review. Repeat until the reviewer approves, only
accepted (below-threshold or explicitly waived) findings remain, progress
stalls, or 5 iterations are reached. Keep the PR, findings, verdict, and
iteration state resumable in clodex-adversarial-review-state.md. NEVER
describe an errored or exhausted run as approved — an iteration-cap exit
with open findings is exhausted, not approved, and must be reported as such.
Write clodex-review-report.md: the PR, checks, verdict, and remaining
findings. Append one line to loop-run-log.md. Take NO other action — never
push a commit to the real PR branch. Stop on approval, no remaining
above-threshold findings, no progress for 2 consecutive iterations, or the
5-iteration cap.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max iterations per PR | 5 (`--max-iter 5`, the source's own cap) |
| Max tokens per PR | 400k |
| Sub-agent spawns | 1 (the adversarial-review subagent, if not using the real `codex` CLI) |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). The 5-iteration cap is the
doom-loop bound from
[infinite-loops.md, scenario 8](../../docs/10-operating/infinite-loops.md#8--the-makerchecker-standoff) —
*"a rejection cap — N straight FAILs on the same item stops the pair and
escalates the disagreement to the human gate"* — already built into the
source design.

## Ownership

| Path | This loop's access |
| --- | --- |
| `clodex-adversarial-review-state.md` | **write** (sole owner) |
| `clodex-review-report.md` | **write** (sole owner) |
| a throwaway fix worktree | **write** (isolated, discarded after the beat) |
| `loop-run-log.md` | **append-only** |
| the PR diff, the codebase | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the adversarial reviewer approves, or only accepted
  findings remain — the source's own spec, verbatim. ← *how a good run
  ends*
- **Limit** — 5 iterations or 400k tokens.
- **No progress** — 2 consecutive iterations with the same findings
  unresolved → the maker–checker standoff bound
  ([infinite-loops.md, scenario 8](../../docs/10-operating/infinite-loops.md#8--the-makerchecker-standoff)):
  escalate the disagreement to the human, don't keep iterating. An
  iteration-cap exit with open findings is reported as **exhausted**, never
  as approved — the source's own explicit rule.

---

*Source: Loop #9, "The Clodex adversarial-review loop," from Forward
Future's Loop Library (`https://signals.forwardfuture.com/loop-library/`),
original prompt by **Lukas Kucinski**: "Run /clodex [task] think hard
--max-iter 5 --threshold medium. Claude plans the task, implements it, opens
a pull request, asks Codex for an adversarial review, fixes findings above
the accepted severity, and repeats. Keep the branch, PR, findings, verdict,
and iteration state resumable. Stop when Codex approves, only accepted
findings remain, progress stalls, or the iteration cap is reached. Never
describe an errored or exhausted run as approved. Finish with the PR,
checks, verdict, and remaining findings." Catalog placement: Part V §15's
Clodex entry (B · PR & review, event, per PR, L1, Medium). Full attribution:
[resources/sources.md](../../resources/sources.md).*
