# Budget: `prod-error-sweep`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | 24 | drop to report-only at 19 runs (already report-only — matters once promoted) |
| Tokens / day | 250k | drop to report-only at 200k |
| Sub-agent spawns | 0 | — |

The source specified no caps; these are this library's addition, sized for
Medium cost per the catalog.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: production errors are high-value —
  pause this loop after lower-priority report loops, not before them.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
