# Part 6 Flashcards · Human Control

> Ten cards on staying the engineer — the ones you'll still want to know a year from now. Cover
> the right column, answer aloud, flip.

| # | Front | Back |
| - | ----- | ---- |
| 1 | The three things loops are worst at | watching cost · verifying outcomes · holding onto comprehension — which is exactly the human's job description |
| 2 | What does "green ≠ done" mean? | a status only says the loop finished; verification is what says the work is actually right |
| 3 | The four rungs of the verification ladder | scripts → checker loop → outcome check → human spot-read; each rung catches what the one below can't |
| 4 | What triggers the 80% tripwire, and against what? | at 80% of any cap → report-only + alert, measured against the cap *as it reads right now* |
| 5 | Budgets stop which cost? Engineers stop which? | budgets stop *runaway* cost; only the engineer stops *pointless* cost |
| 6 | The three nested loops, fastest to slowest | agent (minutes) → engineer (days) → governance (months) |
| 7 | The one invariant across the nesting | every arrow points inward: outer configures inner; inner only ever reports outward |
| 8 | What does "prove before overnight" require? | a human watches one full real run succeed at the current level before any unattended run — and promotion moves one level at a time |
| 9 | Define AI gravity | the pull to hand over the next decision just because the last one went fine; antidote — every expansion is a written human decision |
| 10 | The demotion rule | any incident → drop one autonomy level automatically; re-earn it with one watched run (recovery playbook step 5) |

*Drill, then: [Part 6 quiz](quiz.md) — and the
[methods layer](../09-methods/make-your-own-loop.md) is waiting.*

---

*Sources:* these cards test Part 6, drawn from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), Addy Osmani's
*Loop Engineering* ([S5](https://addyosmani.com/blog/loop-engineering/)), and Andrew Ng & Andrej
Karpathy's public statements ([S9](https://x.com/karpathy)). Full attribution:
[resources/sources.md](../../resources/sources.md).
