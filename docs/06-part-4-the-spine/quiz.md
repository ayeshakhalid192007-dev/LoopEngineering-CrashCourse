# Part 4 Quiz · The Spine

> One organ, five questions — because it's the organ whose absence kills the most loops. The
> bar for moving on is 4 of 5.

## Question 1

"Continue from where you left off" is already in the prompt, yet the restarted loop re-ran
beats 1–6 anyway. Why, and what's the structural fix ([Step 12](12-state-between-runs.md))?

<details><summary>Show answer</summary>

"Where you left off" lived in the model's memory, and that memory ended at the crash — beats
are amnesiac. Fix: a **progress file** read at the start of the beat, updated and
**committed** at the end. Resume-vs-restart has to ride on files, never on memory.

</details>

## Question 2

Constitution vs. diary: which file is which, who writes each, and how often does each change?

<details><summary>Show answer</summary>

Constitution = the rules file (`CLAUDE.md`/`AGENTS.md`): written by the human, read every
beat, edited rarely. Diary = the progress file (`state.md`): written by the loop (one owner
per file), updated on every single beat.

</details>

## Question 3

Why is the order *work → verify → update spine → log* load-bearing? What breaks if you update
the spine first?

<details><summary>Show answer</summary>

The spine may only record what is actually *true*. Update it first and an interruption (or a
failed verification) leaves it claiming work that never happened — that's spine drift, the
"spine says done, world disagrees" failure. Work-first means an interruption costs at most a
log line, and the next beat simply redoes one unit.

</details>

## Question 4

This repo's Day 1 spines existed and were faithfully updated — and are partly lost anyway.
What discipline was missing, and what's the moral?

<details><summary>Show answer</summary>

They were **never committed** (gitignored, then lost) — updates without durability. The moral,
straight from the reconstruction notice: *a spine that isn't committed isn't a spine.* Day 2's
loops commit on every beat, which is exactly why their history survived intact.

</details>

## Question 5

Self-learning vs. self-improving loops: define both, and say which one needs a human gate on
every change.

<details><summary>Show answer</summary>

Self-learning: the spine *accumulates* facts and lessons — safe, do it from day one.
Self-improving: the loop *edits its own* prompt/rules/skills (hill-climbing) — powerful, and
every such change goes through human review, because a loop rewriting its own constitution
unreviewed is an unbounded system.

</details>

---

*Next: [Part 5 · A Complete Loop, Twice](../07-part-5-complete-loop/README.md) ·
[flashcards](flashcards.md)*

*Sources:* this quiz tests Part 4, drawn from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
