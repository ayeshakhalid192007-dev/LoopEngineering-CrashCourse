# Budget: `test-stabilizer-loop`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / total | 30 | drop to report-only at 24 runs (already report-only — matters once promoted) |
| Tokens / total | 500k | drop to report-only at 400k |
| Sub-agent spawns | 0 | — |

Per-flake fix attempts are capped at **1** before `quarantine-candidate` —
the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).
High cost reflects running the full suite repeatedly every beat (N times for
detection, N times for the fixed test, once more for the full-suite check).
The source specified no caps; these are this library's addition.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: this loop is on-demand, not
  scheduled — pause it before any always-on scheduled loop if the fleet is
  burning too fast.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
