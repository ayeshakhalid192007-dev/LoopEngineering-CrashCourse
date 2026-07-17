# Part 3 Quiz · The Body

> Five questions on isolation, skills, hands, and honest grading. Bar: 4 of 5.

## Question 1

Two makers write into the same repo all day without a worktree, safely. What made
that possible, and what change would force a worktree
([Step 8](08-worktrees.md))?

<details><summary>Show answer</summary>

**Disjoint file ownership**, enforced by rule — neither maker may touch the
other's files, so a shared tree can't collide. The moment both need the *same
file*, path ownership can't split it: worktree, merge-when-green.

</details>

## Question 2

Your loop prompt has swollen to 600 words of step-by-step procedure. Name the
refactor and its two payoffs ([Step 9](09-skills.md)).

<details><summary>Show answer</summary>

Extract the procedure into a **skill** (`SKILL.md` with a when-to-use
description); the prompt shrinks back to intent. Payoffs: consistency (every beat
follows the same written move) and maintainability (fix the procedure once, every
future beat inherits it).

</details>

## Question 3

State the three connector rules, and for each, the failure it prevents
([Step 10](10-connectors-mcp.md)).

<details><summary>Show answer</summary>

**Few, focused tools** — prevents a confused beat reaching for `delete_*` nobody
should have exposed. **Idempotent writes** — prevents retries/double-fires from
double-posting. **Actionable errors** — prevents 3 am stalls on opaque failures
the loop can't route around.

</details>

## Question 4

A merged maker-checker "self-reviews before committing" and has passed 100% for a
month. Why is that statistic evidence against the design
([Step 11](11-maker-checker.md))?

<details><summary>Show answer</summary>

A self-grading maker measures agreement with itself: the blind spot that produces
a bug also produces the approving review. 100% means failures are being co-signed,
not caught. Health looks like a *separate* checker occasionally filing
`items_found > 0, actions_taken: 0`.

</details>

## Question 5

Rank these checkers by cost, and state when the cheapest is also the *best*:
read-only LLM with a rubric · human review · a script.

<details><summary>Show answer</summary>

Script < read-only LLM < human. The script is best whenever the check is a *fact*
(links resolve, tests pass, schema valid) — it costs nothing, has no opinions, and
can't be argued with. Save the LLM for judgment-shaped checks and the human for
what actually needs accountability.

</details>

---

*Next: [Part 4 · The Spine](../part-4-the-spine/README.md) ·
[flashcards](flashcards.md)*
