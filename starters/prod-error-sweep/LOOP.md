# Loop: `prod-error-sweep`

> Reviews production logs for actionable errors, traces one to its root
> cause, drafts and verifies a fix — or, if nothing actionable is present,
> stops without making changes. It never copies credentials, tokens, PII, or
> private payloads out of the logs it reads, into any report, PR, or chat.

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | schedule — every 1–6 hours |
| **Body** | reads production logs and error telemetry; drafts a fix in a throwaway worktree, runs the tests there; **writes only `prod-error-report.md`, `prod-error-sweep-state.md`, and the run log** |
| **Spine** | `prod-error-sweep-state.md` (renamed from [`loop-state.md.example`](../_template/loop-state.md.example)) — per-error status, root cause, fix draft, verification result |
| **Stopping condition** | the source's own, verbatim: *"if no actionable errors are present, stop without making changes"* — otherwise, a beat is complete when the traced error has a report entry with a verified fix |
| **Checker** | the test suite re-run against the drafted fix (script-checkable); the `loop-verifier` agent (read-only) additionally scans the report itself for anything that looks like a credential, token, or payload that should never have left the logs |
| **Human gate** | you read the report and apply the fix yourself (opening the real PR, once promoted); nothing is opened or committed until you do |

**Level: L1 (report-only, drafts-not-opens-PR)** — every kit in this library
ships this way; no loop earns L2 until a human has watched one real run
succeed ([`kit-state.md`](../../kit-state.md), CLAUDE.md rule 4). The
source's own default is to open a PR directly — this library's rule applies
regardless. See [safety](../../docs/10-operating/safety.md).

## The prompt

```text
Run the prod-error-sweep skill per skills/loop-task. Review production logs
for errors since prod-error-sweep-state.md's last-seen mark. If nothing
actionable is present, update the mark and stop without making changes —
that is a complete, successful beat, not a no-op to apologize for. If an
actionable error is present: trace it to its root cause, in a throwaway
worktree draft the smallest credible fix, run the tests, confirm the fix
holds. Write prod-error-report.md: the error, root cause, the drafted fix,
verification result. NEVER copy credentials, tokens, personal information, or
private payloads from the logs into the report, the spine, or anywhere else
— redact or describe them, never quote them. Update
prod-error-sweep-state.md. Append one line to loop-run-log.md. Take NO other
action — never open a PR. Stop after 24 runs/day, or after 3 consecutive
beats with nothing actionable.
```

For the exact skill text and the reviewer rubric, see
[`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) and
[`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md).

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | 24 |
| Max tokens/day | 250k |
| Sub-agent spawns | 0 |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md). Medium cost per the catalog; the
source specified none.

## Ownership

| Path | This loop's access |
| --- | --- |
| `prod-error-sweep-state.md` | **write** (sole owner) |
| `prod-error-report.md` | **write** (sole owner) |
| a throwaway fix worktree | **write** (isolated, discarded after the beat) |
| `loop-run-log.md` | **append-only** |
| production logs / error telemetry | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — the traced error has a report entry with a verified fix, or
  (the source's own explicit case) no actionable errors were present this
  beat and the mark advanced cleanly. ← *how a good beat ends* (this loop
  keeps running as long as production keeps producing errors; there is no
  all-done state, only quiet sweeps)
- **Limit** — 24 runs/day or 250k tokens/day.
- **No progress** — 3 consecutive beats with nothing actionable → log and
  stop (this is different from the source's per-beat "stop without making
  changes," which is a success, not a limit).

---

*Source: Loop #4, "The production error sweep," from Forward Future's Loop
Library (`https://signals.forwardfuture.com/loop-library/`), original prompt
by **Matthew Berman**: "Review our production logs for errors. If you find an
actionable issue, trace it to its root cause, fix it, verify the fix, and
open a pull request. If no actionable errors are present, stop without
making changes." The source's own explicit constraint — carried forward
unchanged into this kit's constraints — is: "Do not copy credentials,
tokens, personal information, or private payloads into prompts, pull
requests, or chat messages." Catalog placement: Part V §15's production-error
entry (L · Monitoring & incident, schedule, 1–6h, L1, Medium). Full
attribution: [resources/sources.md](../../resources/sources.md).*
