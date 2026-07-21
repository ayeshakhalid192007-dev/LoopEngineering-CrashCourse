# Budget: `loop-harness-verification`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / total | 20 | drop to report-only at 16 runs (already report-only — matters once promoted) |
| Tokens / total | 250k | drop to report-only at 200k |
| Sub-agent spawns | 1 (the second, verifying session) | — |

The source specified only its own retry limit (set per wrapped task, not a
fixed number); the run/token totals are this library's addition, sized for
Low cost per the catalog.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: this is a meta/harness loop
  wrapping other scheduled work — pause it before the task-specific loops it
  might wrap (e.g. `dependency-sweeper`, `docs-sweep`), since the wrapped
  task's own loop is the higher-priority one.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
