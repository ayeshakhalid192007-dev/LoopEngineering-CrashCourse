# Loop: `docs-sweep`

> Reviews the codebase against its own docs and flags where documentation has
> gone stale — a renamed function, a removed flag, a changed default. It
> drafts the fix as a report at L1; the original design opens a PR directly,
> but every kit in this library earns that step, not starts with it.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule/event (push) — daily, or triggered by a push to `main` touching source paths (inside the 1d band) |
| **Body** | reads the codebase and its documentation; **writes only `docs-drift-report.md`, `docs-sweep-state.md`, and the run log** |
| **Spine** | `docs-sweep-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — last-swept commit, so a beat only re-checks what changed since |
| **Stopping condition** | per-beat: every doc page touching code that changed since the last mark has a report entry — drift confirmed or cleared |
| **Checker** | the `loop-verifier` agent (read-only) — confirms each flagged drift is real by diffing the doc's claim against the actual code, not just a stale-looking phrase |
| **Human gate** | you read the report and update the docs (or apply the loop's drafted fix) yourself; nothing is opened or committed until you do |

**Level: L1 (report-only)** — every kit in this library ships this way; no
loop earns L2 until a human has watched one real run succeed
([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). The original
design (see Source below) opens a PR directly — this library's L1-first rule
applies regardless of what the source loop's own default was. See
[safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the docs-sweep skill per skills/loop-task. Review the codebase for
everything that changed since docs-sweep-state.md's last-swept mark. For each
doc page whose claims no longer match the current implementation, write a
docs-drift-report.md entry: doc file and section · what it claims · what the
code actually does now · a suggested (NOT applied) correction. Update
docs-sweep-state.md's last-swept mark. Append one line to loop-run-log.md.
Take NO other action — never edit a doc file, never open a PR. Stop after 10
runs/day, or after 3 consecutive beats with nothing newly stale.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 10 |
| Max tokens/day | 200k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Medium cost reflects reading the
full codebase against its docs each beat.

## Ownership

| Path | This loop's access |
| --- | --- |
| `docs-sweep-state.md` | **write** (sole owner) |
| `docs-drift-report.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| the codebase and its docs | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — each beat: every doc page touching changed code has a report
  entry, and `docs-sweep-state.md`'s last-swept mark is updated. ← *how a
  good beat ends* (this loop keeps running as long as the codebase keeps
  changing; there is no all-done state, only quiet sweeps)
- **Limit** — 10 runs/day or 200k tokens/day.
- **No progress** — 3 consecutive beats with nothing newly stale → log and
  stop.

## Promotion to L2 (earned, not shipped)

Once a human has watched one real L1 cycle succeed, this loop can be
promoted to what the original design does directly: edit the stale docs and
open a reviewable pull request. Even then, the PR is always opened for
review — never merged by the loop itself.

---

*Source: Loop #1, "The docs sweep," from Forward Future's Loop Library
(`https://signals.forwardfuture.com/loop-library/`), original prompt by
**Matthew Berman**: "Whenever a documentation pass is needed, review the
codebase in full and make sure all documentation reflects the current
implementation. Update stale documentation, verify the changes, then open a
pull request." Stopping condition per the source: "Documentation matches the
current implementation," finishing with "a reviewable pull request." Adapted
here to L1 report-only (this library's rule for every kit's first run) with a
heartbeat, spine, checker, and limits added — the source specified none.
Catalog placement: Part V §15's `docs-sweep` entry (E · Documentation,
schedule/event push, 1d, L1, Medium). Full attribution:
[resources/sources.md](../../resources/sources.md).*
