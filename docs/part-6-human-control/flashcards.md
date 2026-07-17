# Part 6 Flashcards · Human Control

> Ten cards on staying the engineer. These are the ones to still know in a year.

| # | Front | Back |
| - | ----- | ---- |
| 1 | The three things loops are worst at | paying attention to cost · verifying outcomes · keeping comprehension — that's the human job description |
| 2 | Green ≠ done | a status says the loop finished; only verification says the work is right |
| 3 | The verification ladder | scripts → checker loop → outcome check → human spot-read; each catches what the one below can't |
| 4 | The 80% tripwire | at 80% of any cap → report-only + alert; measured against the cap *as currently written* |
| 5 | Budgets stop which cost? Engineers stop which? | budgets stop *runaway* cost; engineers stop *pointless* cost |
| 6 | The three nested loops | agent (minutes) < engineer (days) < governance (months) |
| 7 | The nesting invariant | every arrow points inward: outer configures inner; inner only reports outward |
| 8 | Prove before overnight | a human watches one full real run succeed at the current level before any unattended run — promotion one level at a time |
| 9 | AI gravity | the pull to hand over the next decision because the last one went fine; antidote: expansions are written human decisions |
| 10 | Demotion rule | any incident → drop one autonomy level automatically; re-earn via one watched run (recovery playbook step 5) |

*Drill, then: [Part 6 quiz](quiz.md) — and the
[methods layer](../methods/make-your-own-loop.md) awaits.*
