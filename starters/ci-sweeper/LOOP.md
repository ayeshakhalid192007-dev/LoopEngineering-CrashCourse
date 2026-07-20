# Loop: `ci-sweeper`

> Watches `main`'s CI and, the moment something goes red, classifies the
> failure and reports it — a flaky test gets noted, a real break gets a
> drafted (not applied) minimal-fix recommendation. It starts read-only, like
> every kit in this library; the worktree-fix-and-PR behavior below is what it
> **earns** once a human has watched one real L1 cycle succeed.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule/event — a CI-completion event fires a beat immediately; a 10-minute scheduled sweep is the reconciliation pass for anything the event dropped (inside the 5–15m band) |
| **Body** | reads CI run logs and `main`'s status; **writes only `ci-sweeper-report.md`, `ci-sweeper-state.md`, and the run log** |
| **Spine** | `ci-sweeper-state.md` (renamed from [`loop-state.md.example`](loop-state.md.example)) — per-failure status, classification, and retry count once promoted |
| **Stopping condition** | a beat is complete when the triggering failure has a report entry: classification, why it matters, suggested (NOT applied) fix |
| **Checker** | the `loop-verifier` agent (read-only) — grades the report's classification and format; **never the maker** |
| **Human gate** | you read the report and decide whether to apply the suggested fix — and, separately, whether this loop has earned promotion to L2 |

**Level: L1 (report-only)** — every kit in this library ships this way; no loop
earns L2 until a human has watched one real run succeed
([`kit-state.md`](../../../kit-state.md), CLAUDE.md rule 4). The catalog rates
this loop's *target* level L2 and **Very high** cost because a red `main`
blocks everyone — that urgency is why it's first in the fleet's priority
order, not a reason to skip the L1 proving step. See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the ci-sweeper skill per skills/loop-task. On a CI-completion event for main
(or the 10-minute reconciliation sweep), read the failing run's logs. Classify:
flaky (timeout, runner error, transient network — no code change needed) or real
(reproducible failure). Write ci-sweeper-report.md: one line per failure —
[classification] check name · why it matters · suggested (NOT applied) fix.
Update ci-sweeper-state.md. Append one line to loop-run-log.md. Take NO other
action — no worktree writes, no PRs, no pushes. Stop after 40 runs/day, or
after 3 consecutive beats with no new failure on main.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 40 |
| Max tokens/day | 300k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `ci-sweeper-state.md` | **write** (sole owner) |
| `ci-sweeper-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| CI run logs / `main` status (via SCM CLI) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — each beat: `ci-sweeper-report.md` has an entry for the
  triggering failure — classified, ranked, with a suggested-not-applied fix —
  and `ci-sweeper-state.md`'s per-failure marks are updated. ← *how a good
  beat ends* (this loop keeps running as long as `main` can go red; there is
  no all-done state, only quiet ones)
- **Limit** — 40 runs/day or 300k tokens/day.
- **No progress** — 3 consecutive beats with no new failure on `main` → log a
  quiet no-change beat and stop.

## Promotion to L2 (earned, not shipped)

Once a human has watched one real L1 cycle and the reports have been
consistently correct, this loop can be promoted to the design the **Very
high**-cost catalog entry actually targets: fixing real failures for real,
in an isolated worktree, as an opened PR — never a direct push to `main`, and
never merged by the loop itself.

| Part (L2) | Promoted behavior |
| --- | --- |
| Body | for a real failure: fresh worktree, minimal fix, run the full suite; if green, open a fix PR |
| Retry bound | **at most 1 retry** per failure, in a clean worktree; still red → write a `blocked` entry (failing check, retry count) and stop — the doom-loop bound from [infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md) |
| Checker | the full test suite (must exit 0, re-run by the verifier, not trusted) plus a diff-scope check — the fix must touch only what the failure needed, and **never** weaken, skip, or delete a test to reach green |
| Human gate | every fix PR is still merged by a person — this gate is permanent, not something L2 removes (see the [dependency-sweeper worked example](../../docs/09-methods/worked-example-dependency-sweeper.md), which sets this precedent for the loop family) |
| Discovery guard | skip the loop's own open PRs — reprocessing your own output is the ping-pong pattern, not progress |

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Part V §15A's `ci-sweeper` catalog entry (schedule/event, 5–15m, L2 target,
Very high, "red main blocks everything" — the fleet's top priority) and the
"doom loop" retry-cap bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md). The
L2 worktree-isolation + maker–checker design follows the
[dependency-sweeper worked example](../../docs/09-methods/worked-example-dependency-sweeper.md),
the closest fully-designed sibling in this catalog. Full attribution:
[resources/sources.md](../../resources/sources.md).*
