# Budget: `docs-sweep`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | 10 | drop to report-only at 8 runs (already report-only — matters once promoted) |
| Tokens / day | 200k | drop to report-only at 160k |
| Sub-agent spawns | 0 | — |

Medium cost reflects reading the full codebase against its docs each beat —
the original source loop specified no caps at all; these are this library's
addition.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: `docs-sweep` is Medium cost and low
  urgency (docs drift rarely blocks anyone) — pause it before higher-cost
  action loops if the fleet is burning too fast.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
