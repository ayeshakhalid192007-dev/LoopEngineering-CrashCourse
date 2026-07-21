# Loop: `dependency-sweeper`

> Keeps the repository's dependencies current without breaking the build. A
> nightly schedule wraps a run-until-done body: each beat works the outdated-
> package list to empty (every package has a tested update ready, or a
> `blocked` entry) or to its per-beat limit, whichever comes first.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — nightly at 02:00, wrapping a **conditional run-until-done body** (scheduled outside, conditional inside; version churn is a per-day phenomenon, not per-minute) |
| **Body** | reads manifests + lockfiles; tests candidate updates in an isolated, throwaway worktree; **writes only `dependency-report.md`, `dependency-sweeper-state.md`, and the run log** — no PR is opened at L1 |
| **Spine** | `dependency-sweeper-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — per-package status, retry counts, and a `blocked` register |
| **Stopping condition** | a beat is complete when every outdated production dependency has either **(a)** a report entry noting the update passed the full suite in the scratch worktree, or **(b)** a `blocked` entry (version, failing check, retry count) |
| **Checker** | the full test suite (run inside the scratch worktree, must exit 0) plus a read-only `loop-verifier` that confirms the report's claims match what actually ran |
| **Human gate** | you read the report and decide which updates to apply for real; nothing is opened, pushed, or merged until you do |

**Level: L1 (report-only) week 1 → L2 (opens real PRs) permanent, once promoted.**
Every kit in this library ships L1 first, no exception
([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4) — this loop's own
worked-example design source states the same schedule independently: *"Week
1 — L1, report-only... Week 2 — L2, assisted... this is the loop's permanent
operating level. L3 is explicitly out of scope."* The scratch-worktree test
run at L1 is invisible outside the loop's own sandbox — nothing is pushed,
opened, or left behind — so it stays within report-only's blast radius. See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the dependency-sweeper skill per skills/loop-task. Read the manifest and
lockfiles for outdated production dependencies not yet in
dependency-sweeper-state.md's per-package register. For each (up to 10 per
beat): in a fresh, throwaway worktree, apply the candidate update and run the
full test suite. If green, write a dependency-report.md entry recommending it
(package, version, suite result) — do NOT open a PR. If red, retry once in a
clean worktree; still red → write a `blocked` entry (version, failing check,
retry count) and do not retry again until the version changes upstream.
Update dependency-sweeper-state.md. Append one line to loop-run-log.md. Skip
packages already in the report or blocked register. Stop after 10 update
attempts/beat, 45 runs/day, or after 3 consecutive beats with an unchanged
package list.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 45 (nightly schedule; the cap covers a run-until-done body's internal beats) |
| Max tokens/day | 300k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Per-beat update attempts are
capped at **10**; per-package retry at **1**, then `blocked` — the doom-loop
bound from [infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `dependency-sweeper-state.md` | **write** (sole owner) |
| `dependency-report.md` | **write** (sole owner) |
| a throwaway test worktree | **write** (isolated, discarded after the beat) |
| `loop-run-log.md` | **append-only** |
| manifests / lockfiles (via SCM CLI) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — every outdated production dependency has a
  `dependency-report.md` entry (tested-and-recommended) or a `blocked`
  register entry, and `dependency-sweeper-state.md`'s per-package marks are
  updated. ← *how a good beat ends* (this loop keeps running as long as new
  versions keep arriving; there is no all-done state, only quiet nights)
- **Limit** — 10 update attempts/beat, 45 runs/day, or 300k tokens/day.
- **No progress** — 3 consecutive beats with an unchanged outdated-package
  list → log and stop. A package that fails its retry is **not** "no
  progress" — it is `blocked`, a recorded outcome, not a stall.

## Promotion to L2 (earned, permanent — not shipped)

Once a human has watched one real L1 week and the reports have been
consistently correct, this loop can be promoted to what its worked-example
source calls its **permanent operating level**:

| Part (L2) | Promoted behavior |
| --- | --- |
| Body | for a report entry a human wants applied, the loop opens a real PR from the same worktree it already tested in — never pushes to `main` directly |
| Checker | unchanged: full suite + diff-scope verifier confirming the PR touches only manifest/lockfile paths (an update that "fixed" a failing test by editing it is exactly the failure this catches) |
| Human gate | every PR is still merged by a person — this is the loop's **permanent** ceiling; L3 (auto-merge) is explicitly out of scope, a decision about the repository's risk tolerance, not this loop's competence |
| Discovery guard | the loop ignores its own open PRs during discovery, so it never re-processes work it already produced |

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course))
via the course's own
[worked example — Designing the Dependency-Update Loop](../../docs/09-methods/worked-example-dependency-sweeper.md),
which applies the A–F method to this exact catalog entry end to end (six
parts, stopping-condition-as-spec, the three stops, the L1→L2 promotion
schedule) — the richest single source of any kit in this catalog. Full
attribution: [resources/sources.md](../../resources/sources.md).*
