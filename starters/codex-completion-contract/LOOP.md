# Loop: `codex-completion-contract`

> For long-running work where partial completion could be mistaken for
> done: defines every required outcome and its evidence *before* acting,
> then after each bounded action marks each requirement proved, weak,
> missing, or contradicted. Completes only when every requirement is
> proved. Budget exhaustion never counts as success — the source's own
> rule, and this course's "green ≠ done" made into a literal audit.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | conditional — run-until-done, on-demand, invoked explicitly for a named Goal |
| **Body** | reads the target work's actual state (code, tests, deploy status — whatever the Goal's requirements name); **writes only `completion-audit.md`, `codex-completion-contract-state.md`, and the run log** |
| **Spine** | `codex-completion-contract-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — the requirement-to-evidence table, status, owner, and next action, per the source's own required fields |
| **Stopping condition** | the source's own, verbatim: *"every Codex Goal requirement has current, adequate proof. The final audit contains no weak, missing, or contradicted required item; otherwise the work remains open, blocked, or exhausted"* |
| **Checker** | the audit itself — each requirement is checked against real evidence (a passing test, a verified deploy, a re-read diff), not asserted |
| **Human gate** | named directly in the source — *"use... only when the user explicitly asks for a Codex Goal or completion audit. Create native Goal state only with approval"* — this loop does not start itself |

**Level: L1 (report-only)** — every kit in this library ships this way; no
loop earns L2 until a human has watched one real run succeed
([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). This is also
the catalog's own permanent target for this loop — an audit loop's job is a
verdict, never a repair. See [safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the codex-completion-contract skill per skills/loop-task, for [the named
Goal — e.g. "land PR #N and verify it in production"]. Only run this when
explicitly asked for a completion audit; ask before creating Goal state.
Before acting, define every required outcome and its evidence — the
requirement-to-evidence contract. After each bounded action, mark every
requirement: proved (real evidence exists), weak (evidence is partial or
stale), missing (no evidence yet), or contradicted (evidence says it
didn't work). Complete the Goal only when all requirements are proved.
Budget exhaustion never counts as success — if the run limit or token cap
is hit first, the Goal is exhausted, not complete, and must be reported as
such. Write completion-audit.md: the requirement-to-evidence table, status,
owner, and next action. Update codex-completion-contract-state.md. Append
one line to loop-run-log.md. Take NO other action. Stop when all
requirements are proved, when blocked (a requirement can't be proved right
now), when stalled (no new evidence for 3 consecutive beats), or when
exhausted (the limit is reached).
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs | 20 |
| Max tokens | 200k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Low cost per the catalog; the
source specified none — its own discipline is the budget-exhaustion rule
below, not a number.

## Ownership

| Path | This loop's access |
| --- | --- |
| `codex-completion-contract-state.md` | **write** (sole owner) |
| `completion-audit.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| the target work's actual state (code, tests, deploy status) | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the source's own spec, verbatim: every requirement has
  current, adequate proof, and the final audit has no weak, missing, or
  contradicted item. ← *how a good run ends*
- **Limit** — 20 runs or 200k tokens — reported as **exhausted**, per the
  source's explicit rule, never as success.
- **No progress** — 3 consecutive beats with no new evidence on any open
  requirement → reported as **stalled**, per the source's own vocabulary.

---

*Source: Loop #28, "The Codex completion-contract loop," from Forward
Future's Loop Library (`https://signals.forwardfuture.com/loop-library/`),
original prompt by **3goblack (@Dis_Trackted)**: "Run $goal-planner-codex
[task] for long-running Codex work where partial work could be mistaken for
done. Landing a PR and verifying production is one example. Before acting,
define every required outcome and its evidence. After each bounded action,
mark requirements proved, weak, missing, or contradicted. Complete the Goal
only when all are proved; otherwise stop as blocked, stalled, or exhausted.
Ask before creating Goal state. Finish with the requirement-to-evidence
table, status, owner, and next action." Used near-verbatim; its "budget
exhaustion never counts as success" rule is this loop's own instance of
CLAUDE.md rule 12, "green ≠ done." Catalog placement: Part V §15's Codex
completion-contract entry (I · Self-improvement / meta, conditional,
on-demand, L1, Low). Full attribution:
[resources/sources.md](../../resources/sources.md).*
