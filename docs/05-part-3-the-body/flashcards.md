# Part 3 Flashcards · The Body

> Ten cards on what a beat is allowed to do and touch. Hide the right column, say the answer
> out loud, then flip to check yourself.

| # | Front | Back |
| - | ----- | ---- |
| 1 | What does "the body" actually govern? | blast radius — the exact standing room, moves, and reach a job needs, and not a scrap more |
| 2 | When do you *need* a worktree? | when files overlap (or a failure must not leak into main) — disjoint ownership can happily share one tree |
| 3 | Describe a worktree in one breath | a second working directory on the same repo: shared history, its own branch and files — isolation, cheaply |
| 4 | What is the cold-start problem? | every beat boots amnesiac; the spine restores *facts*, a skill restores *procedure* |
| 5 | Skill or plugin? | skill = words the model chooses to follow (markdown); plugin = code the harness runs on its own |
| 6 | What makes a skill trigger? | a description that names *when it applies*, phrased in the words a real task would use |
| 7 | The three rules for connectors | few focused tools · idempotent writes · errors that say what to do next |
| 8 | Why prefer "ensure X" to "do X"? | retries and double-fired events mean idempotency is the gap between "once" and "twice" |
| 9 | Maker–checker, distilled | the hand that writes never signs off; the grader is powerless to edit the work |
| 10 | Where does a workflow fit? | it *is* the body of a single beat — deterministic inside; the loop still owns whether and when |

*Drill, then: [Part 3 quiz](quiz.md) · [Part 4](../06-part-4-the-spine/README.md)*

---

*Sources:* these cards test Part 3, drawn from Panaversity's *Loop Engineering: A Crash
Course* ([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
