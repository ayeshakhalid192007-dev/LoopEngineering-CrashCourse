# Budget: `spec-dev-review`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Rounds / ticket | 5 | drop to report-only-with-blocker at round 4 |
| Tokens / ticket | 300k | drop to report-only at 240k |
| Sub-agent spawns | 1 (the independent review) | — |

The source names "the round cap" without a specific number; this library
sets it at 5, matching the doom-loop / maker–checker-standoff bound from
[infinite-loops.md, scenario 8](../../docs/10-operating/infinite-loops.md#8--the-makerchecker-standoff).

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: this is an on-demand, per-ticket
  loop — it doesn't compete for standing fleet budget the way scheduled
  loops do.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
