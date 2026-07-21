# Loop Budget — Loop Engineering Crash Course (shared across ALL loops)

> One budget for the whole fleet, not per loop. Every loop checks this file at the
> start of every beat (see the `loop-budget` skill and root `LOOP.md`).

## Daily limits — Day 3 fleet (current)

| Loop | Max runs/day | Max tokens/day | Max sub-agent spawns/run |
| ------ | -------------- | ---------------- | -------------------------- |
| kit-stamper | 25 | 900k | 0 |
| audit-loop | 60 | 100k | 0 |
| patterns-page-loop | 25 | 300k | 0 |
| labs-and-advanced-loop | 45 | 750k | 0 |
| link-check *(continues from Day 1)* | 20 | 50k | 0 |
| **Fleet total** | — | **2,100k** | — |

> Today is the most expensive day. If the fleet is burning too fast, pause
> `labs-and-advanced-loop` first — it's the lowest-priority loop per the
> coordination contract in `days-plans/day3-plan.md`.

## Daily limits — Day 2 fleet (retired 2026-07-19)

| Loop | Max runs/day | Max tokens/day | Max sub-agent spawns/run |
| ------ | -------------- | ---------------- | -------------------------- |
| step-writer | 40 | 700k | 0 |
| template-checker | 12 | 150k | 0 |
| quiz-writer | 10 | 150k | 0 |
| **Fleet total** | — | **1,000k** | — |

## Daily limits — Day 1 fleet (retired 2026-07-16)

| Loop | Max runs/day | Max tokens/day | Max sub-agent spawns/run |
| ------ | -------------- | ---------------- | -------------------------- |
| page-writer | 25 | 550k | 0 |
| checker | 30 | 100k | 0 |
| link-check | 20 | 50k | 0 |
| **Fleet total** | — | **700k** | — |

## On budget exceed

1. At 80% of a cap: that loop switches to report-only for the rest of the day.
   **Measure against the cap as it reads *right now*, not the cap at start of day** —
   Day 1's page-writer ran to ≈90% because the 80% line was checked against a stale cap.
2. At 100% of the fleet total: ALL loops pause.
3. Append the event to `shared/loop-run-log.md`.
4. Notify the human (note in the loop's own `state.md` under Escalations).

## Kill switch

- Flag: `loop-pause-all` (set below by the human). If set to `on`, every loop exits
  immediately at the start of its beat.
- Resume only after the human clears the flag.

`loop-pause-all: off`

## Alerts This Period

<!-- Loops append self-throttle events below this line -->
- 2026-07-16: page-writer at ≈79% of its 400k daily token cap after 17/20 runs;
  self-throttled to report-only and stopped. 6 checklist items remain (5 foundations
  pages + Day 2 scaffold). Human: raise caps here and in loops/day1/page-writer/loop.md,
  then restart /loop to finish Day 1.
