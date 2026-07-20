# Loop: `pr-babysitter`

> Polls every open PR on a fast schedule and flags what needs a human: merge
> conflicts, red CI, stale no-review PRs, threads awaiting a response. It never
> comments, nudges, or merges — it reports, so a wrong beat costs a re-read, not
> an unrecallable action on a shared system.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — every 10 minutes, business hours (inside the 5–15m band) |
| **Body** | reads all open PRs via the SCM CLI (review state, CI status, mergeability, staleness); **writes only `pr-status-report.md`, `pr-babysitter-state.md`, and the run log** |
| **Spine** | `pr-babysitter-state.md` (renamed from [`loop-state.md.example`](loop-state.md.example)) — per-PR last-seen status, so a beat only reports what *changed* since the last poll |
| **Stopping condition** | per-beat: `pr-status-report.md` written, ranked, matching the template — this loop never "finishes" (as long as PRs exist, it keeps polling) |
| **Checker** | the `loop-verifier` agent (read-only) — grades the report's format; this loop is itself the **reconciliation sweep** (Step 7) for anything a future event-driven `pr-reviewer` might drop |
| **Human gate** | you read the report and decide which flags to act on; nothing acts until you do |

**Level: L1 (report-only)** — it observes and reports; it does not repair. Writes are
earned one level at a time (see [safety](../../docs/10-operating/safety.md)).

## The prompt

```text
Run the pr-babysitter skill per skills/loop-task. Read every open PR via the SCM
CLI: review state, CI status, mergeability, and days since last activity. Rank:
merge-conflict > CI-red > blocking-review-requested > stale-no-review (>2 business
days) > awaiting-changes > rest. Write pr-status-report.md: one line per flagged
PR — [rank] PR # and title · why it matters · suggested (NOT taken) action.
Update pr-babysitter-state.md's per-PR last-seen status. Append one line to
loop-run-log.md. Take NO other action — no comments, no re-runs, no merges. Stop
after 60 runs/day, or after 3 consecutive beats with no status change across all
open PRs.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 60 |
| Max tokens/day | 350k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `pr-babysitter-state.md` | **write** (sole owner) |
| `pr-status-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| open PRs (via SCM CLI: review state, CI, mergeability) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — each beat: `pr-status-report.md` exists, ranked, template-matched,
  and `pr-babysitter-state.md`'s per-PR marks are updated. ← *how a good beat ends*
  (this loop keeps running as long as the repo has open PRs; there is no
  all-done state, only quiet ones)
- **Limit** — 60 runs/day or 350k tokens/day.
- **No progress** — no status change across all open PRs for 3 consecutive beats
  → log and stop (nothing to babysit right now).

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
Step 7 — Event-Driven Loops (the PR-review / reconciliation-sweep case study) and
Part V §15B's `pr-babysitter` catalog entry. Full attribution:
[resources/sources.md](../../resources/sources.md).*
