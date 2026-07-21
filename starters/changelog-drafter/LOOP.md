# Loop: `changelog-drafter`

> Drafts changelog entries so they never pile up unwritten. Daily, or right
> before a release tag, it reads every merged PR since the last beat and
> writes one draft line per PR — never commits to `CHANGELOG.md` itself; the
> release manager reads the draft before tagging.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule/tag — daily, or triggered by a release-tag event, whichever comes first |
| **Body** | reads merged PRs via the SCM CLI since the last-processed PR number; **writes only `changelog-draft.md`, `changelog-drafter-state.md`, and the run log** |
| **Spine** | `changelog-drafter-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — the last-processed PR number, so a beat only drafts what's new |
| **Stopping condition** | every merged PR since the last beat has a changelog-draft line — machine-checkable: does every merged PR number since the last mark show up in the draft? |
| **Checker** | a script (every merged PR number accounted for?) plus the `loop-verifier` agent (read-only) grading line quality; **never the maker** |
| **Human gate** | the release manager reads `changelog-draft.md` before tagging — nothing lands in `CHANGELOG.md` until they say so |

**Level: L1 (report-only, drafts-as-file, not commits)** — every kit in this
library ships this way; no loop earns L2 until a human has watched one real
run succeed ([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). The
course's own worked example for this exact task specifies the identical
schedule independently: *"one week of L1 drafts-as-comments before it's ever
allowed to commit."* See [safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the changelog-drafter skill per skills/loop-task. Read every PR merged
since changelog-drafter-state.md's last-processed PR number. Write
changelog-draft.md: one line per PR — PR # and title · what changed ·
suggested changelog category (Added/Changed/Fixed/Removed). Update
changelog-drafter-state.md's last-processed PR number. Append one line to
loop-run-log.md. Take NO other action — never write to CHANGELOG.md itself.
Stop after 10 runs/day, or after 3 consecutive beats stuck on the same
unprocessable PR (escalate it, don't keep retrying).
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 10 |
| Max tokens/day | 80k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). The 10/day limit and the
stuck-on-one-PR escalation rule are both taken directly from the course's own
worked example for this task (see Source below).

## Ownership

| Path | This loop's access |
| --- | --- |
| `changelog-drafter-state.md` | **write** (sole owner) |
| `changelog-draft.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| merged PRs (via SCM CLI) | **read-only** |
| `CHANGELOG.md` | **read-only** (never written by this loop at L1) |
| everything else | read-only |

## The three valid stops

- **Success** — every merged PR since the last beat has a
  `changelog-draft.md` line, and `changelog-drafter-state.md`'s
  last-processed PR number is updated. ← *how a good beat ends* (this loop
  keeps running as long as PRs keep merging; there is no all-done state, only
  quiet stretches)
- **Limit** — 10 runs/day or 80k tokens/day.
- **No progress** — 3 consecutive beats stuck on the same unprocessable PR →
  escalate it in the spine and stop, rather than retrying the same PR
  forever.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course))
via the course's own
["Worked in 90 seconds" A–F example](../../docs/09-methods/make-your-own-loop.md#worked-in-90-seconds) —
*"changelog entries pile up unwritten"* — adapted from that example's
per-merge event trigger to this catalog entry's schedule/tag heartbeat
(§15A); the body, spine, checker, gate, limit (10/day), and stuck-PR
escalation rule are taken directly from the worked example. Full attribution:
[resources/sources.md](../../resources/sources.md).*
