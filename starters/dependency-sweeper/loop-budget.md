# Budget: `dependency-sweeper`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | 45 | drop to report-only at 36 runs (already report-only at L1 — the tripwire matters once promoted) |
| Tokens / day | 300k | drop to report-only at 240k |
| Sub-agent spawns | 0 | — |

Per-beat update attempts are capped separately at **10**, and per-package
retries at **1, then `blocked`** — the doom-loop bound from
[infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md). A
number this low is deliberate: it caps cost, keeps a future PR batch
reviewable, and turns a pathological night into a small incident instead of
a runaway one.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: the catalog's own priority order is
  `ci-sweeper > pr-babysitter > dependency-sweeper > post-merge-cleanup >
  daily-triage` — pause `dependency-sweeper` before `ci-sweeper` or
  `pr-babysitter`, but after the two Low-cost report loops.

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
