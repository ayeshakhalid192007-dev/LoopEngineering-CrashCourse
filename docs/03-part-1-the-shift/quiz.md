# Part 1 Quiz · The Shift

> Five questions, each answer hidden until you commit to one. The bar for moving on is 4
> of 5 without peeking. A wrong answer points you straight at the step to re-read.

## Question 1

You prompt an agent 30 times a day, every day. A colleague insists you're "already doing
loop engineering." Per [Step 1](01-from-prompting-to-looping.md), what one sentence refutes
that?

<details><summary>Show answer</summary>

Looping means the *deciding, remembering, and stopping* are engineered to happen without
you — 30 manual prompts means you are still, personally, the heartbeat, the spine, and the
stop. Volume of prompting is not a system.

</details>

## Question 2

A loop keeps committing directly to `main` despite the prompt saying "always use a branch."
Per [Step 2](02-the-four-layers.md), which layer should hold this rule, and why?

<details><summary>Show answer</summary>

The **harness** (permissions/hooks/branch protection). Prose rules are requests the model
can misread or deprioritize; the harness enforces mechanically and cannot be persuaded.
Guarantees live in the harness — judgment lives in the loop.

</details>

## Question 3

Name the six parts of a loop — and for two of them, the failure that shows up when that
part is missing ([Step 3](03-anatomy-of-a-loop.md)).

<details><summary>Show answer</summary>

Heartbeat, body, spine, stopping condition, checker, human gate. Missing-part failures (any
two): no spine → restart-from-zero; no stop → runs forever; no checker → maker grades itself
and co-signs its own bugs; no gate → work ships with no accountable owner; no body limits →
unscoped blast radius.

</details>

## Question 4

Which of these is a *provable* stopping condition? (a) "stop when the docs read well" ·
(b) "stop when every box in `state.md` is checked" · (c) "stop when you're confident" ·
(d) "stop after doing a good amount"

<details><summary>Show answer</summary>

**(b)** — a fact a machine can verify by reading a file. The other three are feelings
wearing quotation marks; a loop can neither prove them nor be safely left alone with them.

</details>

## Question 5

What do you keep, and what do you hand over, in the shift from prompting to looping?

<details><summary>Show answer</summary>

You hand over the **management** — picking the next unit, dispatching it, remembering
progress, deciding when to stop. You keep **intent and accountability**: what "good" means,
review of what ships, and answering for the result. A loop inherits your typing, never your
judgment.

</details>

---

*Scored under 4? Re-read the step named in the question, then retake. Ready to move on:
[Part 2 · The Heartbeat](../04-part-2-heartbeat/README.md) · [flashcards](flashcards.md)*

*Sources:* this quiz tests Part 1, drawn from Panaversity's *Loop Engineering: A Crash
Course* ([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
Addy Osmani's *Loop Engineering* ([S5](https://addyosmani.com/blog/loop-engineering/)).
Full attribution: [resources/sources.md](../../resources/sources.md).
