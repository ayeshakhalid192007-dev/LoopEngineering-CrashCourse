# Budget: `changelog-drafter`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | 10 | drop to report-only at 8 runs (already report-only — this matters if promoted) |
| Tokens / day | 80k | drop to report-only at 64k |
| Sub-agent spawns | 0 | — |

The 10 runs/day cap is taken directly from the course's own worked example
for this exact task
([make-your-own-loop.md, "Worked in 90 seconds"](../../docs/09-methods/make-your-own-loop.md#worked-in-90-seconds)).

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: `changelog-drafter` is Low cost and
  low urgency (drafts, never commits) — pause it before any higher-cost
  action loop if the fleet is burning too fast.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
