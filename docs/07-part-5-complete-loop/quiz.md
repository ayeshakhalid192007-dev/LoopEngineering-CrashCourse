# Part 5 Quiz · A Complete Loop, Twice

> Five questions on the triage build. (No flashcards for this part — the exercise *is* the two
> builds.) The bar for moving on is 4 of 5.

## Question 1

Recite the 7-item minimum-safe checklist that gates the triage loop's first run
([Step 13](13-build-the-loop-twice.md)).

<details><summary>Show answer</summary>

1 provable success condition · 2 run limit · 3 spine written first, committed · 4 report-only
(L1) start · 5 human gate placed · 6 one log line per beat · 7 kill switch tested.

</details>

## Question 2

The loop could label issues while it triages — obvious value — and the design forbids it on
day one. Justify that call.

<details><summary>Show answer</summary>

Labels are writes on a shared system others can see, and trust hasn't been earned yet: L1
first means faulty *judgment* surfaces as a faulty report (cheap) rather than a hundred wrong
labels (public). The clicks you save are tuition; promotion to L2 arrives after the reports
have been boringly correct.

</details>

## Question 3

Both walkthroughs rehearse the beat by hand the night before they arm the schedule. Why is
that non-negotiable ([13a](13a-claude-code-walkthrough.md))?

<details><summary>Show answer</summary>

First runs fail the most, and a 7 am failure is by definition unwatched. One manual rehearsal
of the *identical* beat converts every would-be-unwatched failure into a watched, fixable one.
It's prove-before-unattended, in miniature.

</details>

## Question 4

In 13b, three minimum-safe items live in the bash wrapper rather than the prompt. Which three,
and why there ([13b](13b-opencode-walkthrough.md))?

<details><summary>Show answer</summary>

Kill switch (the pause-file check), run limit (the daily-cap marker), and spine durability
(the unconditional `git commit`). In bash they're harness-layer *guarantees* that hold even on
the model's worst beat; in the prompt they'd be mere requests to the very process they're
supposed to bound.

</details>

## Question 5

Having built the loop twice: name two things that showed up in *both* builds unchanged, and
two that were pure plumbing.

<details><summary>Show answer</summary>

Unchanged (any two): the six-part shape, the skill text, the reviewer rubric, the
L1/rehearsal discipline, the checklist. Plumbing (any two): Routine vs. cron, `/permissions`
vs. `opencode.json` + wrapper, subagent vs. a second run. Durable shape, swappable plumbing —
the lasting-vs-mechanical rule made concrete.

</details>

---

*Next: [Part 6 · Human Control](../08-part-6-human-control/README.md)*

*Sources:* this quiz tests Part 5, drawn from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
