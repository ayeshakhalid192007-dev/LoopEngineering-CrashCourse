# Loop: `repo-cleanup-loop`

> Inspects local and remote branches, PRs, commits, and worktrees, and
> reports what's stale versus what's valuable-but-orphaned. It never deletes
> uncertain work, discards uncommitted changes, or closes someone else's PR
> without confirmation — the source's own explicit rule.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — weekly |
| **Body** | reads branches, PRs, commits, and worktrees via the SCM CLI and local git state; **writes only `repo-cleanup-report.md`, `repo-cleanup-loop-state.md`, and the run log** |
| **Spine** | `repo-cleanup-loop-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — per-item classification (current / owned / safe-to-remove / uncertain) and evidence |
| **Stopping condition** | the source's own, verbatim: *"valuable work is recovered and remaining repository state is intentional"* — checked against the source's own criteria: *"branches, pull requests, commits, and worktrees are current, owned, or safely removed with evidence"* |
| **Checker** | the `loop-verifier` agent (read-only) — confirms every "safe to remove" classification actually has supporting evidence (merged, closed, orphaned), not a guess |
| **Human gate** | named directly in the source — *"do not delete uncertain work, discard uncommitted changes, or close someone else's pull request without confirmation."* You review every classification before anything is actually removed |

**Level: L1 (report-only)** — every kit in this library ships this way; no
loop earns L2 until a human has watched one real run succeed
([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). At L1 this loop
never deletes anything regardless — a stronger guarantee than even the
source's own "confirmation for uncertain work only" rule. See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the repo-cleanup-loop skill per skills/loop-task. Inspect local and
remote branches, open PRs, recent commits, and worktrees. For each item,
gather evidence: is the branch merged? is the PR closed or superseded? is the
worktree orphaned? is there uncommitted work that would be lost? Classify
each item: current (in active use), owned (someone's in-progress work, leave
it), safe-to-remove (evidence-backed), or uncertain (needs a human look).
Write repo-cleanup-report.md: one line per flagged item — [classification]
item · evidence · suggested (NOT taken) action. Never suggest discarding
uncommitted changes or closing someone else's PR without flagging it as
needing confirmation first. Update repo-cleanup-loop-state.md. Append one
line to loop-run-log.md. Take NO other action — no deletions, no closures.
Stop after 15 runs, or after 3 consecutive beats with nothing newly flagged.
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
| `repo-cleanup-loop-state.md` | **write** (sole owner) |
| `repo-cleanup-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| branches / PRs / commits / worktrees (via SCM CLI and git) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the source's own spec, verbatim: valuable work is recovered
  and remaining repository state is intentional — checked against
  "branches, PRs, commits, and worktrees are current, owned, or safely
  removed with evidence." ← *how a good run ends*
- **Limit** — 15 runs or 150k tokens.
- **No progress** — 3 consecutive beats with nothing newly flagged → log and
  stop.

---

*Source: Loop #10, "The repository cleanup loop," from Forward Future's Loop
Library (`https://signals.forwardfuture.com/loop-library/`), original prompt
by **Matthew Berman**: "Inspect local and remote branches, pull requests,
commits, and worktrees. Recover valuable work and clean everything stale
until the repository is current and organized." The source's own explicit
human gate — carried forward unchanged — is: "Do not delete uncertain work,
discard uncommitted changes, or close someone else's pull request without
confirmation." Catalog placement: Part V §15's repo-cleanup entry (A · Repo
maintenance, schedule, weekly, L1, Low). Full attribution:
[resources/sources.md](../../resources/sources.md).*
