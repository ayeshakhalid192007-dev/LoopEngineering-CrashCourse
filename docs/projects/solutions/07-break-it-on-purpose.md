# Solution · Project 7 — Break It on Purpose

> Reference solution. Read [the project](../07-break-it-on-purpose.md) first.

## Worked example

Missing part chosen: **stop condition checked by the model's own opinion** (not a real
checker). Target: the same FastAPI service from Project 2's solution, with a genuinely
broken build (a missing environment variable the app needs at import time).

**Broken run (excerpt of `loop-run-log.md`):**

```text
{"run_id":"...T11:00Z","pattern":"break-it","duration_s":58,"outcome":"attempt 1: added a default value; believes build is now fixed"}
{"run_id":"...T11:02Z","pattern":"break-it","duration_s":6,"outcome":"beat skipped — loop had already declared success and exited"}
```

Independently running `pytest` afterward: **still red** — the default value silenced the
import error but broke three tests that asserted the variable was required. The loop
exited claiming success at 11:00Z; the wall-clock cap (10 minutes) never even had to fire,
because the false "success" made it stop early — which is its own lesson: a broken stop
condition doesn't always look like a runaway loop, sometimes it looks like a *premature,
wrong* one.

**Fixed run** (same task, checker restored — gate on real `pytest` exit code):

```text
{"run_id":"...T11:10Z","pattern":"break-it-fixed","duration_s":64,"outcome":"attempt 1: added default value; checker ran pytest — 3 failed, NOT declaring success"}
{"run_id":"...T11:12Z","pattern":"break-it-fixed","duration_s":71,"outcome":"attempt 2: made variable required with a clear startup error instead of a silent default; checker ran pytest — 340/340 passed"}
```

**One-paragraph note:**

> Missing part: the checker. The broken loop trusted the model's own "should be fixed now"
> and exited on a false positive after one attempt — predicted by
> [failure-modes.md](../../10-operating/failure-modes.md)'s "the loop that grades its own
> homework" entry. Restoring a real `pytest`-exit-code checker caught the false fix on
> attempt 1 and let the loop correctly try again, reaching a genuine green on attempt 2.

## Why this satisfies "done when"

- Both excerpts are real transcripts, not hypothetical — the broken run's false-positive
  exit is visible in the log, and the fixed run's second, better attempt is too.
- The wall-clock safety cap was in place for both runs, even though it wasn't the one
  that fired this time — the safety net doesn't need to trigger to have been necessary.

## Common wrong turns

- Picking "no run limit" as the missing part on a task too small to ever run long enough
  to matter — choose a task with genuine room to misbehave (an ambiguous fix, a flaky
  test) so the missing part is actually load-bearing.
