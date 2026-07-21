# Loop: `loop-harness-verification`

> A general-purpose harness for scheduled repo work (CI triage, issue
> grooming, dependency updates, docs sync — swap in whatever task this
> instance wraps): one session stages a patch or outbox message in an
> isolated worktree, a genuinely separate second session verifies it against
> explicit criteria, and it ships only after a pass. This is Step 11's
> maker–checker split, described independently by an external source — and
> it's the exact shape every `loop-verifier` agent in this library already
> follows.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — per scheduled run of whatever task this instance wraps |
| **Body** | in an isolated worktree, stages a patch or outbox message for the wrapped task; **writes only `harness-report.md`, `loop-harness-verification-state.md`, and the run log** — nothing is ever delivered outside this loop's own report at L1 |
| **Spine** | `loop-harness-verification-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — source revision, staged output, verifier result, delivery status, and the next scheduled run, per the source's own required fields |
| **Stopping condition** | the source's own, verbatim: *"ship only after a pass; otherwise preserve the findings and retry only within the limit"* |
| **Checker** | **a second, genuinely separate session** — the source's own design, verbatim: *"one Claude session stage a patch... and a second Claude session verify it against explicit criteria."* This is exactly the `loop-verifier` pattern this entire library already uses for every kit, independently arrived at by an external source |
| **Human gate** | you read the harness report — staged output, verifier verdict, delivery status — and deliver (or apply) it yourself; nothing is delivered until you do |

**Level: L1 (report-only, stages-not-delivers)** — every kit in this
library ships this way; no loop earns L2 until a human has watched one real
run succeed ([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). See
[safety](../../docs/10-operating/safety.md) and
[Step 11 · Maker–Checker](../../docs/05-part-3-the-body/11-maker-checker.md).

## The prompt

```text
Run the loop-harness-verification skill per skills/loop-task, wrapping
[the specific scheduled task this instance covers — CI triage, issue
grooming, a dependency update, a docs sync]. Set a retry limit. In an
isolated worktree, one session stages a patch or outbox message for the
task. A second, genuinely separate session verifies it against explicit
criteria (the same rubric the loop-verifier agent uses). If it passes,
write harness-report.md recommending delivery — never deliver it yourself.
If it fails, preserve the findings in loop-harness-verification-state.md and
retry, only within the limit. Write harness-report.md: source revision,
staged output, verifier result, delivery status, and the next scheduled run.
Append one line to loop-run-log.md. Take NO other action. Stop after a
pass, after the retry limit is reached, or after 3 consecutive failed
verifications with no new findings.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs | 20 |
| Max tokens | 250k |
| Sub-agent spawns | 1 (the second, verifying session) |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Low cost per the catalog; the
source specified none beyond its own retry limit.

## Ownership

| Path | This loop's access |
| --- | --- |
| `loop-harness-verification-state.md` | **write** (sole owner) |
| `harness-report.md` | **write** (sole owner) |
| an isolated staging worktree | **write** (per beat, discarded or preserved per findings) |
| `loop-run-log.md` | **append-only** |
| the wrapped task's inputs | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the source's own spec, verbatim: shipped (here, reported as
  ready-to-ship) only after a pass. ← *how a good run ends*
- **Limit** — 20 runs, 250k tokens, or the source's own retry limit for a
  single staged output.
- **No progress** — 3 consecutive failed verifications with no new findings
  → preserve the findings and stop, per the source's own "preserve the
  findings and retry only within the limit."

---

*Source: Loop #17, "Loop Harness Second-Agent Verification Workflow" / "The
Loop Harness verification loop," from Forward Future's Loop Library
(`https://signals.forwardfuture.com/loop-library/`), original prompt by
**Istasha**: "Use Loop Harness for scheduled repository work such as CI
triage, issue grooming, dependency updates, or docs sync. Set [retry limit],
then start an isolated git worktree. Let one Claude session stage a patch or
outbox message and a second Claude session verify it against explicit
criteria. Ship only after a pass; otherwise preserve the findings and retry
only within the limit. Finish with the source revision, staged output,
verifier result, delivery status, and next run." Catalog placement: Part V
§15's Loop Harness entry (I · Self-improvement / meta, schedule, per
scheduled run, L1, Low). Full attribution:
[resources/sources.md](../../resources/sources.md).*
