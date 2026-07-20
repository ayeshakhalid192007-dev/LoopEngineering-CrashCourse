# Budget: `pr-babysitter`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | 60 | drop to report-only at 48 runs |
| Tokens / day | 350k | drop to report-only at 280k |
| Sub-agent spawns | 0 | — |

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not share
  a fleet total.
- Priority when the fleet is over budget: `pr-babysitter` is High cost by design
  (fast, frequent polling) — pause it before any Low-cost report loop (like
  `daily-triage`) if the fleet is burning too fast, since its 10-minute cadence
  is the most expensive habit in the fleet.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
