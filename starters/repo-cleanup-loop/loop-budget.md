# Budget: `repo-cleanup-loop`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / total | 15 | drop to report-only at 12 runs |
| Tokens / total | 150k | drop to report-only at 120k |
| Sub-agent spawns | 0 | — |

The source specified no caps; these are this library's addition, sized for
Low cost per the catalog.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: this loop is Low cost and low
  urgency — pause it before higher-priority security or correctness loops.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
