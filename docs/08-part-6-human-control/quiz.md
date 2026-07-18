# Part 6 Quiz · Human Control

> Five questions on the job that can't be automated. The bar is 4 of 5 — though this is the part
> worth aiming for 5 of 5.

## Question 1

"Our loops have been green for a quarter — let's auto-merge and stop reviewing." Name the two
rules this breaks and the failure it invites ([Step 14](14-staying-the-engineer.md)).

<details><summary>Show answer</summary>

It's **AI gravity** (a capability expansion justified by a streak instead of a decision) and it
strips away the **human gate** that keeps comprehension debt payable. The failure it invites:
the first confidently-wrong change merges at machine speed into a codebase whose owners stopped
reading it a quarter ago.

</details>

## Question 2

A loop's cap allows it to keep running; its report hasn't changed anyone's behavior in three
weeks. Keep it? ([cost-management](cost-management.md))

<details><summary>Show answer</summary>

No. Caps answer "may it spend?" — only the engineer answers "is it worth it?" A report nobody
acts on carries zero value and compounding cost (tokens *and* your attention). Retire it, or
reshape it until it starts changing decisions.

</details>

## Question 3

CI green, checker PASSing, and users report the feature doesn't work. Which verification layer
was missing, and why couldn't the others catch it ([verification](verification.md))?

<details><summary>Show answer</summary>

Layer 3, the **outcome check** — driving the actual flow end to end. Scripts verify artifacts;
checkers verify shape; "finished but doesn't work" lives only in the running system, which
neither one ever visits. Green ≠ done.

</details>

## Question 4

The Day 1 budget incident (tripwire → stop → human raised caps → finish): walk it through the
three nested loops ([the-three-nested-loops](the-three-nested-loops.md)).

<details><summary>Show answer</summary>

Inner (agent): detected 79%, self-throttled, alerted, and stopped — reported upward, changed
nothing above itself. Middle (engineer): read the alert in context and deliberately raised the
caps. Outer (governance): had already pre-written the rule "budget is human-owned, 80% →
report-only" that made the whole exchange boring. Every arrow pointed inward.

</details>

## Question 5

Define AI gravity, name its tell inside a fleet, and give the antidote.

<details><summary>Show answer</summary>

The pull to hand the system the next decision because it handled the last one. Its tell:
capabilities that grew with no written decision behind them (audit the body against `loop.md`).
The antidote: every expansion is an explicit, recorded human decision — promotion is never a
default.

</details>

---

*Course body complete. Next layers:
[methods](../09-methods/make-your-own-loop.md) ·
[operating handbook](../10-operating/operating-loops.md) ·
[flashcards](flashcards.md)*

*Sources:* this quiz tests Part 6, drawn from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), Addy Osmani's
*Loop Engineering* ([S5](https://addyosmani.com/blog/loop-engineering/)), and Andrew Ng & Andrej
Karpathy's public statements ([S9](https://x.com/karpathy)). Full attribution:
[resources/sources.md](../../resources/sources.md).
