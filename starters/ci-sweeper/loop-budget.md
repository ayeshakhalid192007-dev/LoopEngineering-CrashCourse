# Budget: `ci-sweeper`

> Read at the **start of every beat**. At 80% of any cap the loop drops to report-only
> and alerts; at 100% it stops. Caps are set *before* the first run — a loop without a
> cap is a blank check with a heartbeat.

## Caps

| Cap | Value | Tripwire (80%) |
| --- | --- | --- |
| Runs / day | 40 | drop to report-only at 32 runs (this loop is already report-only at L1 — the tripwire matters once it's promoted) |
| Tokens / day | 300k | drop to report-only at 240k |
| Sub-agent spawns | 0 | — |

**Once promoted to L2** (see `LOOP.md` → Promotion to L2), fix attempts get a
separate, harder cap: **15/day total, 1 retry per failure** — the doom-loop
bound from [infinite-loops.md, scenario 1](../../docs/10-operating/infinite-loops.md).
A loop that stays under the token budget but keeps retrying the same failure
is still a doom loop; raise the token cap in this file when promoting, and add
the 15/1 fix-attempt cap alongside it.

## Fleet total (if this loop runs alongside others)

- Fleet token ceiling: this kit is a standalone starter — set its own cap in
  whatever repo it's copied into. As stamped for this library it does not
  share a fleet total.
- Priority when the fleet is over budget: `ci-sweeper` pauses **last** — the
  catalog's own priority order is `ci-sweeper > pr-babysitter >
  dependency-sweeper > post-merge-cleanup > daily-triage` ("red main blocks
  everything").

## Kill switch

- `loop-pause-all: off`  ← flip to `on` to halt every loop at the start of its next beat.

## Spend log

| Date | Runs | Tokens (est.) | Note |
| --- | --- | --- | --- |
| — | 0 | ≈0k | not yet run |
