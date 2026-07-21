# Budget: `clodex-adversarial-review`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Iterations / PR | 5 (`--max-iter 5`, the source's own cap) | drop to report-only-verdict-only at 4 |
| Tokens / PR | 400k | drop to report-only at 320k |
| Sub-agent spawns | 1 (the review stand-in, if not using real `codex`) | — |

The 5-iteration cap and the "never call exhausted approved" rule are both
taken directly from the source; the token cap is this library's addition,
sized for Medium cost per the catalog (each iteration runs a full review
pass plus a fix draft).

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: event-triggered review cycles
  compete with scheduled loops for budget — pause this one before a fixed-
  cadence loop if the fleet is burning too fast, since a delayed review is
  more visible than a delayed sweep.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
