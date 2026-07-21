# Loop: `stale-safe-batch-release`

> Reviews pending changes and PRs, excludes anything stale or unfinished,
> and combines the valid ones into a release batch — built from complete
> artifacts off the latest integrated `main`, never from a task worktree or
> a partial file overlay. The last kit in this library, and a fitting
> bookend: every other kit uses an isolated worktree to test safely; this
> one exists to make sure the *final* release never accidentally ships
> from one.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule/tag — per release window |
| **Body** | reads pending PRs and their merge/staleness status; builds a combined-release artifact from the latest integrated `main` (never a worktree or partial overlay); **writes only `release-batch-report.md`, `stale-safe-batch-release-state.md`, and the run log** |
| **Spine** | `stale-safe-batch-release-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — per-PR inclusion decision (current/stale), the batch composition, and the artifact source verification |
| **Stopping condition** | the source's own, verbatim: *"only current, complete changes ship in the combined release"* |
| **Checker** | the `loop-verifier` agent (read-only) — confirms every included change is genuinely current (merged into `main`, not stale) and that the batch artifact traces to `main`, not a worktree or overlay |
| **Human gate** | you read the release-batch report and perform the actual release yourself; nothing ships until you do |

**Level: L1 (report-only)** — every kit in this library ships this way; no
loop earns L2 until a human has watched one real run succeed
([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the stale-safe-batch-release skill per skills/loop-task. Review pending
PRs. For each one, determine whether it's current (mergeable, tests
passing, recently active) or stale/unfinished (conflicts, failing checks,
no activity past a threshold). Exclude anything stale. Combine the current,
complete changes into a release batch, built from complete artifacts off
the latest integrated main — never from a task worktree, never from a
partial file overlay. Write release-batch-report.md: included PRs (with
evidence of currency), excluded PRs (with the reason), and confirmation the
batch artifact traces to main. Update stale-safe-batch-release-state.md.
Append one line to loop-run-log.md. Take NO other action — never actually
release or deploy. Stop after the batch is composed, or after 3 consecutive
beats with no pending PRs to batch.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs | 15 |
| Max tokens | 150k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Low cost per the catalog; the
source specified none.

## Ownership

| Path | This loop's access |
| --- | --- |
| `stale-safe-batch-release-state.md` | **write** (sole owner) |
| `release-batch-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| pending PRs and `main`'s current state (via SCM CLI) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the source's own spec, verbatim: only current, complete
  changes ship in the combined release; the batch report confirms it. ←
  *how a good run ends*
- **Limit** — 15 runs or 150k tokens.
- **No progress** — 3 consecutive beats with no pending PRs to batch → log
  and stop.

---

*Source: Loop #33, "The stale-safe batch release loop," from Forward
Future's Loop Library (`https://signals.forwardfuture.com/loop-library/`),
original prompt by **Matthew Berman**: "Review pending changes and pull
requests, exclude stale or unfinished work, combine the valid changes, and
release them together." Stopping condition per the source: "only current,
complete changes ship in the combined release." The source's own deployment
integrity note — carried forward unchanged into this kit's constraints —
requires that "deployment must use complete artifacts from the latest
integrated main," and explicitly warns against ever deploying "from a task
worktree or partial file overlay." Catalog placement: Part V §15's
stale-safe batch release entry (C · Release, schedule/tag, per release
window, L1, Low). Full attribution:
[resources/sources.md](../../resources/sources.md).*
