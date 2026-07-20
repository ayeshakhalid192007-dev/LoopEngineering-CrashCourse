# Budget: `test-coverage-loop`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / total | 40 | drop to report-only at 32 runs (already report-only — matters once promoted) |
| Tokens / total | 400k | drop to report-only at 320k |
| Sub-agent spawns | 0 | — |

Per-beat regions are capped separately at **5**, and per-region retries at
**1, then `exclusion-candidate`** — the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).
The source itself specified no caps; these are this library's addition,
sized for High cost (writing and running candidate tests every beat).

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: this loop is on-demand, not
  scheduled — pause it before any always-on scheduled loop if the fleet is
  burning too fast, since nothing is waiting on it to fire.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
