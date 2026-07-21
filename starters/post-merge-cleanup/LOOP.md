# Loop: `post-merge-cleanup`

> Sweeps for the loose ends a merge leaves behind — a merged branch nobody
> deleted, an issue a PR fixed but never closed, a preview environment with
> no PR left to serve. It reports what it would clean up; it does not delete,
> close, or tear anything down until a human says so.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — every few hours (inside the 1d–6h band); merges are the trigger in spirit, but this is a polling sweep, not an event subscription |
| **Body** | reads merged PRs, branches, linked issues, and preview-environment status via the SCM CLI; **writes only `cleanup-report.md`, `post-merge-cleanup-state.md`, and the run log** |
| **Spine** | `post-merge-cleanup-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — per-item last-seen status, so a beat only reports newly-orphaned items, not the same stale branch every sweep |
| **Stopping condition** | per-beat: `cleanup-report.md` written listing every item newly eligible for cleanup since the last mark — machine-checkable: is the branch's PR actually merged? is the issue actually closed by that merge? |
| **Checker** | the `loop-verifier` agent (read-only) — confirms each flagged item is genuinely orphaned (branch's PR state, issue's linked-PR state) before it's reported, not just guessed |
| **Human gate** | you read the report and delete/close/tear down what you approve; nothing acts until you do |

**Level: L1 (report-only)** — it observes and reports; it does not repair.
Writes are earned one level at a time
([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the post-merge-cleanup skill per skills/loop-task. Read merged PRs,
branches, and linked issues via the SCM CLI since
post-merge-cleanup-state.md's last-seen marks. Flag: merged branches still
present, issues a merge should have closed but didn't, preview/deploy
environments with no open PR pointing at them. Write cleanup-report.md: one
line per item — [kind] item · why it's orphaned · suggested (NOT taken)
action. Update post-merge-cleanup-state.md. Append one line to
loop-run-log.md. Take NO other action — no deletions, no closures. Stop after
20 runs/day, or after 3 consecutive beats with nothing newly orphaned.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 20 |
| Max tokens/day | 60k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `post-merge-cleanup-state.md` | **write** (sole owner) |
| `cleanup-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| merged PRs / branches / linked issues / preview environments (via SCM CLI) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — each beat: `cleanup-report.md` exists, lists every
  newly-orphaned item with a verified reason, and
  `post-merge-cleanup-state.md`'s marks are updated. ← *how a good beat ends*
  (this loop keeps running as long as merges keep happening; there is no
  all-done state, only quiet sweeps)
- **Limit** — 20 runs/day or 60k tokens/day.
- **No progress** — 3 consecutive beats with nothing newly orphaned → log and
  stop.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Part V §15A's `post-merge-cleanup` catalog entry (schedule, 1d–6h, L1, Low)
and the priority-order line naming it directly (§11.3: *"ci-sweeper >
pr-babysitter > dependency-sweeper > post-merge-cleanup > daily-triage"*). The
scheduled-poll, L1-report shape follows the mold Step 13a names explicitly for
reuse: *"swap the skill and the report name and out comes a security
sweeper, a dependency scout, a docs-drift detector"* — here, a cleanup
sweeper. Full attribution: [resources/sources.md](../../resources/sources.md).*
