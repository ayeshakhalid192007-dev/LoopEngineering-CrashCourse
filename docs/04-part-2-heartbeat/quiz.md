# Part 2 Quiz · The Heartbeat

> Five questions across the four heartbeats. The bar for moving on is 4 of 5.

## Question 1

Your laptop slept through four scheduled beats of an in-session loop. How many catch-up
beats fire on wake, and why is that the correct design
([Step 4](04-in-session-loops.md))?

<details><summary>Show answer</summary>

Zero — missed beats are **dropped, not queued**. Correct, because a beat should act on
*now*, not replay a stale past; four queued beats would stampede against a world that has
moved on. Design beats to be idempotent over current state and misses cost you nothing.

</details>

## Question 2

Write the three stops for "make the lint pass" as a conditional loop
([Step 5](05-conditional-run-until-done.md)).

<details><summary>Show answer</summary>

Success: `lint exits 0` (provable). Limit: max N runs (say 10) — doom-loop insurance. No
progress: lint error count unchanged for 3 consecutive beats → log and stop. All three are
facts; none are feelings.

</details>

## Question 3

Name the four parts of any unattended routine, and the two guardrails that make "nobody
watching" acceptable ([Step 6](06-unattended-schedules.md)).

<details><summary>Show answer</summary>

Parts: **prompt, repos, connectors, trigger.** Guardrails (any two of): daily run caps; a
restricted branch namespace (e.g. only `claude/`-prefixed pushes, never `main`); starting
L1 report-only until the loop has earned writes over real watched mornings.

</details>

## Question 4

An event-driven PR-review loop silently skipped three PRs during a release-day burst — no
errors anywhere. Diagnose and prescribe ([Step 7](07-event-driven.md)).

<details><summary>Show answer</summary>

The burst exceeded the event cap and overflow events were **dropped, not queued** — no
error because nothing failed; the beats never existed. Prescription: a **reconciliation
sweep** — a slow scheduled loop asking "what did the events miss?" (e.g. "any open PR
without my review?") so silent gaps become caught gaps.

</details>

## Question 5

Match the job to the heartbeat: (a) "empty this 30-item checklist" · (b) "brief me every
morning" · (c) "respond when a release is tagged" · (d) "watch the tests while I refactor
this afternoon."

<details><summary>Show answer</summary>

(a) conditional run-until-done · (b) unattended schedule · (c) event-driven (+
reconciliation sweep) · (d) in-session interval — it *should* die with your session, that's
the feature.

</details>

---

*Next: [Part 3 · The Body](../05-part-3-the-body/README.md) · [flashcards](flashcards.md)*

*Sources:* this quiz tests Part 2, drawn from Panaversity's *Loop Engineering: A Crash
Course* ([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Scheduled Tasks: The Loop Skill & Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
