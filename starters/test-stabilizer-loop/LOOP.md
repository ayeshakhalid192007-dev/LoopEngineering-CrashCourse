# Loop: `test-stabilizer-loop`

> Runs the suite N times to catch flakes, roots out the most frequent one —
> shared state, timing, ordering, or an external dependency — and drafts a
> real fix, never a blind sleep or retry. It repeats until N consecutive
> full-suite runs are green, progress stalls, or a human's approval is
> needed — the source's own three-way stop, matching this course's success /
> no-progress / human-gate pattern almost exactly.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | conditional — run-until-done, on-demand |
| **Body** | runs the test suite N times to find flakes; investigates the most frequent one's root cause; drafts a fix in a throwaway worktree and verifies it; **writes only `stabilizer-report.md`, `test-stabilizer-loop-state.md`, and the run log** — no fix is committed at L1 |
| **Spine** | `test-stabilizer-loop-state.md` (renamed from [`loop-state.md.example`](loop-state.md.example)) — per-flake status, root cause, fix attempts, and a `quarantine-candidate` register |
| **Stopping condition** | the source's own, verbatim: *"N consecutive full-suite runs are green under the recorded conditions"* — or progress stalls, or approval is required |
| **Checker** | the suite's own pass/fail streak (script-checkable) plus the `loop-verifier` agent (read-only), which fails any fix that hides an unresolved cause behind a blind sleep or retry |
| **Human gate** | named directly in the source — *"approval is required"* is one of the loop's own three valid exits; you review each fix and each quarantine recommendation before either is applied |

**Level: L1 (report-only, drafts-not-commits)** — every kit in this library
ships this way; no loop earns L2 until a human has watched one real run
succeed ([`kit-state.md`](../../../kit-state.md), CLAUDE.md rule 4). The
source specifies no autonomy level; this library's rule applies regardless.
See [safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the test-stabilizer-loop skill per skills/loop-task. Run the full test
suite N times under the same conditions; list tests whose result changed.
For the most frequent flake: find its root cause (shared state, timing,
ordering, or an external dependency) — never diagnose it as "needs a sleep"
or "needs a retry." Draft a fix in a throwaway worktree; run the fixed test N
times, then the full suite once. Write stabilizer-report.md: the flake, its
root cause, the drafted fix, the verification evidence (N/N green), and, if
the fix doesn't hold or the cause can't be found, a justified
quarantine-candidate entry instead. Update test-stabilizer-loop-state.md.
Append one line to loop-run-log.md. Take NO other action — no fix is
committed, no test is quarantined. Stop when N consecutive full-suite runs
are green, when progress stalls (3 beats, same flake, no new evidence), or
when a beat's findings need your approval to proceed.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs | 30 |
| Max tokens | 500k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). High cost reflects running the
full suite repeatedly (N times per flake, plus verification runs) every
beat. Per-flake fix attempts capped at **1** before `quarantine-candidate` —
the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md),
and exactly what the source's own "never a blind sleep or retry" rule guards
against: masking a flake instead of fixing it is the doom loop wearing a
disguise.

## Ownership

| Path | This loop's access |
| --- | --- |
| `test-stabilizer-loop-state.md` | **write** (sole owner) |
| `stabilizer-report.md` | **write** (sole owner) |
| a throwaway test worktree | **write** (isolated, discarded after the beat) |
| `loop-run-log.md` | **append-only** |
| the test suite | **read-only** (run repeatedly, never edited outside the worktree) |
| everything else | read-only |

## The three valid stops

- **Success** — N consecutive full-suite runs are green under the recorded
  conditions, matching the source's own stopping condition verbatim. ← *how
  a good run ends*
- **Limit** — 30 runs or 500k tokens.
- **No progress / approval required** — the source names both explicitly:
  progress stalls (3 beats, same flake, no new evidence) → log and stop; or
  a beat's findings genuinely need a human decision before the loop can
  continue (e.g., the only fix available changes shared test infrastructure)
  → stop and ask, don't guess.

---

*Source: Loop #6, "The test stabilizer loop," from Forward Future's Loop
Library (`https://signals.forwardfuture.com/loop-library/`), original prompt
by **hungtv27 (@hungtv27)**: "Run [test suite] [N] times under the same
conditions and list tests whose result changes. Fix the most frequent flake
at its root cause—shared state, timing, ordering, or an external
dependency—never with a blind sleep or retry. Run that test [N] times, then
rerun the full suite. Repeat until [N] consecutive full-suite runs pass,
progress stalls, or approval is required. Return each flake, root cause, fix,
evidence, and justified quarantine." Used near-verbatim; this kit's only
change is L1 report-only (drafts, doesn't commit) per this library's rule.
Catalog placement: Part V §15's test-stabilizer entry (J · Testing & QA,
conditional, on-demand, L2 target, High). Full attribution:
[resources/sources.md](../../resources/sources.md).*
