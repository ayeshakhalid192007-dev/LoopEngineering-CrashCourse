# Loop: `<loop-name>`

> One sentence: what this loop does and when it stops. Example: "Runs a link checker
> over `docs/` on a timer and reports anything broken. That's the whole job."

## The six parts

| Part | This loop |
| --- | --- |
| **Heartbeat** | `<in-session interval / conditional run-until-done / schedule / event>` — exact cadence or trigger |
| **Body** | `<what it may DO and TOUCH>` — the paths/tools it can use, and **read-only on everything else** |
| **Spine** | `<loop-name>-state.md` (rename from [`loop-state.md.example`](loop-state.md.example)) — `<what it remembers between beats>` |
| **Stopping condition** | `<a machine-checkable spec — "suite exits 0", "no unchecked boxes">`, never a feeling |
| **Checker** | `<script / read-only LLM / human>` — the cheapest one that catches the failure you fear; **never the maker** |
| **Human gate** | `<where a person decides — review, approve, promote>` |

**Level: L1 (report-only)** — it observes and reports; it does not repair. Writes are
earned one level at a time (see [safety](../../docs/10-operating/safety.md)).

## The prompt

```text
<the loop prompt — intent, not procedure. Point at the skill for the "how".>
Example:
/loop 30m Run the <task> per the loop-task skill. Append findings to
<loop-name>-state.md and one line to loop-run-log.md. Stop when <success spec>,
after <N> runs, or after 3 no-change beats.
```

## Limits

| Guard | Value |
| --- | --- |
| Max runs/day | `<N>` |
| Max tokens/day | `<N>k` |
| Sub-agent spawns | `<0 / N>` |
| Kill switch | `loop-pause-all: on` → exit at start of beat |

Source: [`loop-budget.md`](loop-budget.md).

## Ownership

| Path | This loop's access |
| --- | --- |
| `<loop-name>-state.md` | **write** (sole owner) |
| `loop-run-log.md` | **append-only** |
| `<the paths it reads>` | **read-only** |
| everything else | read-only |

## The three valid stops

- **Success** — `<the success spec from the six-part table>`. ← *how a good run ends*
- **Limit** — `<N>` runs or `<N>k` tokens.
- **No progress** — nothing changed for 3 consecutive beats → log and stop.
