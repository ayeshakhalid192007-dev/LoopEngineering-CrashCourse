# Budget: `daily-triage`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | 1 | drop to report-only at 0.8 runs (i.e. never re-run same-day) |
| Tokens / day | 15k | drop to report-only at 12k |
| Sub-agent spawns | 0 | — |

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in whatever
  repo it's copied into. As stamped for this library it does not share a fleet total.
- Priority when the fleet is over budget: report-only loops (like this one) pause
  after any write-capable loop in the same fleet, since a missed triage report costs
  a coffee-time read, not correctness.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
