# Budget: `<loop-name>`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | `<N>` | drop to report-only at `<0.8×N>` |
| Tokens / day | `<N>k` | drop to report-only at `<0.8×N>k` |
| Sub-agent spawns | `<0 / N>` | — |

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: `<N>k` — at 100%, **every** loop pauses.
- Priority when the fleet is over budget: `<which loop pauses first>` (lowest-value maker first).

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| `<YYYY-MM-DD>` | `<n>` | `≈<n>k` | `<e.g. tripwire fired at 79%, human raised caps>` |
