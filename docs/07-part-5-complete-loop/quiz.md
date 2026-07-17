# Part 5 Quiz · A Complete Loop, Twice

> Five questions on the triage build. (No flashcards for this part — the exercise
> *is* the two builds.) Bar: 4 of 5.

## Question 1

Recite the 7-item minimum-safe checklist that gates the triage loop's first run
([Step 13](13-build-the-loop-twice.md)).

<details><summary>Show answer</summary>

1 provable success condition · 2 run limit · 3 spine written first, committed ·
4 report-only (L1) start · 5 human gate placed · 6 one log line per beat ·
7 kill switch tested.

</details>

## Question 2

The loop could label issues while triaging — obvious value — and the design
forbids it on day one. Justify.

<details><summary>Show answer</summary>

Labels are writes on a shared system others see, and trust hasn't been earned:
L1 first means wrong *judgment* surfaces as a wrong report (cheap), not a hundred
wrong labels (public). The saved clicks are tuition; promotion to L2 comes after
boringly-correct reports.

</details>

## Question 3

Both walkthroughs rehearse the beat manually the night before arming the
schedule. Why is that non-negotiable ([13a](13a-claude-code-walkthrough.md))?

<details><summary>Show answer</summary>

First runs fail most, and a 7 am failure is unwatched by definition. One manual
rehearsal of the *identical* beat converts every would-be-unwatched failure into a
watched, fixable one. Prove-before-unattended, in miniature.

</details>

## Question 4

In 13b, three minimum-safe items live in the bash wrapper rather than the prompt.
Which, and why there ([13b](13b-opencode-walkthrough.md))?

<details><summary>Show answer</summary>

Kill switch (pause-file check), run limit (daily-cap marker), spine durability
(unconditional `git commit`). In bash they're harness-layer *guarantees* that hold
even on the model's worst beat; in the prompt they'd be requests to the process
they're meant to bound.

</details>

## Question 5

After building the loop twice: name two things that appeared in *both* builds
unchanged, and two that were pure plumbing.

<details><summary>Show answer</summary>

Unchanged (any two): the six-part shape, the skill text, the reviewer rubric, the
L1/rehearsal discipline, the checklist. Plumbing (any two): Routine vs. cron,
`/permissions` vs. `opencode.json` + wrapper, subagent vs. second run. Durable
shape, swappable plumbing — the lasting-vs-mechanical rule.

</details>

---

*Next: [Part 6 · Human Control](../08-part-6-human-control/README.md)*
