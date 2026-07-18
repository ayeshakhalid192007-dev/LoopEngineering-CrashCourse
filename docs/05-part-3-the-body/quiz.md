# Part 3 Quiz · The Body

> Five questions on isolation, taught moves, hands, and honest grading. The bar for moving on
> is 4 of 5.

## Question 1

Two makers wrote into one repo all day, without a worktree, and never collided. What made
that safe — and what one change would have made a worktree mandatory
([Step 8](08-worktrees.md))?

<details><summary>Show answer</summary>

Their files were **owned disjointly**, enforced by rule — neither maker could touch the
other's paths, so a shared tree had nothing to collide over. The instant both need the *same
file*, path ownership can't slice it in two: worktree, merged only when green.

</details>

## Question 2

Your loop prompt has swollen to 600 words of blow-by-blow procedure. Name the fix and its two
payoffs ([Step 9](09-skills.md)).

<details><summary>Show answer</summary>

Move the procedure into a **skill** (a `SKILL.md` with a when-to-use description); the prompt
falls back to intent. Payoffs: consistency (every beat runs the same recorded move) and
maintainability (correct the procedure once, and every later beat inherits the fix).

</details>

## Question 3

Recite the three connector rules, and for each, the disaster it heads off
([Step 10](10-connectors-mcp.md)).

<details><summary>Show answer</summary>

**Few, focused tools** — stops a confused beat from grabbing a `delete_*` that never should
have been exposed. **Idempotent writes** — stops retries and double-fires from posting
twice. **Actionable errors** — stops 3 am stalls on opaque failures the loop can't route
around.

</details>

## Question 4

A fused maker-checker "self-reviews before committing" and has passed 100% for a month. Why
is that statistic a red flag rather than a gold star ([Step 11](11-maker-checker.md))?

<details><summary>Show answer</summary>

A self-grader only ever measures how much it agrees with itself: the blind spot that ships a
bug is the same one approving the review. 100% means defects are being co-signed, not caught.
Health actually looks like a *separate* checker now and then logging `items_found > 0,
actions_taken: 0`.

</details>

## Question 5

Rank these checkers by cost, and say when the cheapest is also the *best*: a read-only LLM
with a rubric · a human reviewer · a script.

<details><summary>Show answer</summary>

Script < read-only LLM < human. The script wins outright whenever the check is a *fact*
(links resolve, tests pass, schema validates) — free, opinionless, unarguable. Keep the LLM
for judgment calls and the human for whatever truly needs someone accountable.

</details>

---

*Next: [Part 4 · The Spine](../06-part-4-the-spine/README.md) · [flashcards](flashcards.md)*

*Sources:* this quiz tests Part 3, drawn from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
