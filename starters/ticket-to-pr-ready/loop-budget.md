# Budget: `ticket-to-pr-ready`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / total | 20 (ticket instances) | drop to report-only at 16 (already report-only — matters once promoted) |
| Tokens / total | 300k | drop to report-only at 240k |
| Sub-agent spawns | 0 | — |

Reproduction attempts per ticket are capped at **2** — the source's own
rule, and the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).
The source specified no other caps; the run/token totals are this library's
addition.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: event-triggered, per-ticket loops
  compete for budget with scheduled loops — pause this one before a loop
  with a fixed cadence, since a delayed ticket response is more visible than
  a delayed sweep.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
