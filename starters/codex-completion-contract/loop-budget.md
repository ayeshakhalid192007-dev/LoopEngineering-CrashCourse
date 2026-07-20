# Budget: `codex-completion-contract`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / total | 20 | drop to report-only at 16 runs (already report-only — matters once promoted) |
| Tokens / total | 200k | drop to report-only at 160k |
| Sub-agent spawns | 0 | — |

The source specified no numeric caps — its own discipline is qualitative:
**hitting this cap is an "exhausted" exit, never a "complete" one.** The
run/token totals are this library's addition, sized for Low cost per the
catalog.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: this is an on-demand audit loop,
  not a scheduled one — it only runs when explicitly invoked, so it doesn't
  compete for standing fleet budget the way scheduled loops do.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
