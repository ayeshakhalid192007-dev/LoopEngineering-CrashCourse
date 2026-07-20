# Loop: `ticket-to-pr-ready`

> Takes a ticket, bug report, or complaint and turns it into a review-ready
> patch: reproduce, prove the root cause, make the smallest credible fix,
> re-verify. If it can't be reproduced after two serious attempts, it says
> so rather than guessing. It never folds unrelated refactors into the
> patch — the source's own scope discipline.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | event — one ticket, one run, per ticket |
| **Body** | reproduces the failure in the smallest representative environment; drafts a fix in a throwaway worktree; re-runs the original reproduction plus regression tests; **writes only `ticket-report.md`, `ticket-to-pr-ready-state.md`, and the run log** |
| **Spine** | `ticket-to-pr-ready-state.md` (renamed from [`loop-state.md.example`](loop-state.md.example)) — per-ticket reproduction evidence, root cause, fix draft, verification result, attempt count |
| **Stopping condition** | the source's own, verbatim: *"the issue reproduces before the fix, no longer reproduces afterward, and relevant regression checks pass"* |
| **Checker** | the before/after reproduction itself (script-checkable: does the original repro still fail before the fix and pass after?) plus the `loop-verifier` agent (read-only), which fails any patch that touches files unrelated to the fix |
| **Human gate** | the source's own review-ready checkpoint — you read the report (cause, changed files, before/after proof, risks) and open the real PR yourself, or promote the loop |

**Level: L1 (report-only, drafts-not-opens-PR)** — every kit in this
library ships this way; no loop earns L2 until a human has watched one real
run succeed ([`kit-state.md`](../../../kit-state.md), CLAUDE.md rule 4). See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the ticket-to-pr-ready skill per skills/loop-task. Take the triggering
ticket, bug report, or complaint. Reproduce the failure in the smallest
representative environment. If it doesn't reproduce after two serious
attempts, say so in the report and stop — do not guess at a fix for a bug
you can't see. Once reproduced: prove the root cause, and in a throwaway
worktree make the smallest credible fix — never fold in an unrelated
refactor, even a tempting one. Rerun the original reproduction (must now
pass) plus relevant regression tests (must still pass). Write
ticket-report.md: cause, changed files, before-and-after proof, risks, and a
pull-request summary. Update ticket-to-pr-ready-state.md. Append one line to
loop-run-log.md. Take NO other action — never open a PR. Stop when the
report is complete (fixed or honestly not-reproduced), or after 2
reproduction attempts fail.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs | 20 (per-ticket instances; this loop stops after 1 ticket's report per invocation) |
| Max tokens | 300k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Reproduction attempts are capped
at **2**, per the source's own rule — the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md),
already built into the original design.

## Ownership

| Path | This loop's access |
| --- | --- |
| `ticket-to-pr-ready-state.md` | **write** (sole owner) |
| `ticket-report.md` | **write** (sole owner) |
| a throwaway fix worktree | **write** (isolated, discarded after the beat) |
| `loop-run-log.md` | **append-only** |
| the codebase, the triggering ticket | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the source's own spec, verbatim: the issue reproduces
  before the fix, no longer reproduces afterward, and relevant regression
  checks pass. A report of "could not reproduce after two attempts" is
  **also** a valid, honest success — not a failure to force through. ← *how
  a good run ends*
- **Limit** — 20 runs (ticket instances) or 300k tokens.
- **No progress** — 2 reproduction attempts failed → the source's own stop,
  not a third attempt.

---

*Source: Loop #16, "The ticket-to-PR-ready loop," from Forward Future's Loop
Library (`https://signals.forwardfuture.com/loop-library/`), original prompt
by **Hiten Shah**: "Take a ticket, bug report, failing behavior, or customer
complaint and turn it into a review-ready patch. Reproduce the failure in
the smallest representative environment, prove the root cause, make the
smallest credible fix, and rerun the original reproduction plus relevant
regression tests. If the issue cannot be reproduced after two serious
attempts, say so. Do not fold unrelated refactors into the patch. Finish with
the cause, changed files, before-and-after proof, risks, and pull-request
summary." Used near-verbatim; the "do not fold unrelated refactors" rule
matches this repo's own `loop-constraints.md` ("never refactor unrelated
code — one fix per run") almost word for word. Catalog placement: Part V
§15's ticket-to-PR entry (D→B · Issue intake → PR, event, per ticket, L2
target, High). Full attribution:
[resources/sources.md](../../resources/sources.md).*
