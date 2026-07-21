# Final Exam

> A scored assessment covering the whole course — Parts 1–6, the loop library, the
> practice projects, and the T4 advanced tier. Pass by demonstrating you can *name and
> apply* the shapes, not recite the pages. Open-book: every question links back to the
> page that teaches it, because looking things up is the mechanical layer working exactly
> as intended.

## How this is scored

| Section | Questions | Points | Pass bar |
| --- | --- | --- | --- |
| Part 1 — The Shift | 3 | 15 | — |
| Part 2 — The Heartbeat | 4 | 20 | — |
| Part 3 — The Body | 4 | 20 | — |
| Part 4 — The Spine | 2 | 10 | — |
| Part 5 & 6 — Complete Loop, Human Control | 3 | 15 | — |
| The prebuilt library & operating discipline | 3 | 10 | — |
| T4 advanced tier | 2 | 10 | — |
| **Total** | **21** | **100** | **75 to pass** |

A question is graded correct only if the answer names the *mechanism*, not just the
vocabulary — "a checker" isn't a full answer to "why didn't the loop notice its own
mistake"; "a separate checker, because the maker never grades its own work" is.

## Section 1 — The Shift (15 pts)

1. **(5 pts)** Name the two things that stay with the human even after a task is fully
   looped, per [Step 1](../03-part-1-the-shift/01-from-prompting-to-looping.md).
2. **(5 pts)** A bug persists no matter how the prompt is reworded. Using
   [the four layers](../03-part-1-the-shift/02-the-four-layers.md), explain which layer is
   actually failing and why re-prompting can't fix it.
3. **(5 pts)** State the six parts of a loop, in order, from
   [Anatomy of a Loop](../03-part-1-the-shift/03-anatomy-of-a-loop.md).

## Section 2 — The Heartbeat (20 pts)

4. **(5 pts)** Give one task that fits a schedule heartbeat and one that fits conditional/
   run-until-done, and justify the choice for each — per the A-of-A–F "the way it ends
   picks the heartbeat" rule.
5. **(5 pts)** Name the three valid stops for a conditional loop.
6. **(5 pts)** What happens to an event that arrives after an event-driven loop's per-hour
   cap is already hit — and what mechanism catches it later?
7. **(5 pts)** Name two things a Routine's creation form asks for that a local `/loop` does
   not need to answer at all.

## Section 3 — The Body (20 pts)

8. **(5 pts)** Why does a fix loop run inside a worktree instead of the main checkout?
9. **(5 pts)** What problem does a `SKILL.md` solve that a longer inline prompt does not?
10. **(5 pts)** State the three connector rules for MCP tools from
    [Step 10](../05-part-3-the-body/10-connectors-mcp.md).
11. **(5 pts)** Explain, in one sentence, why the maker is never allowed to also be the
    checker.

## Section 4 — The Spine (10 pts)

12. **(5 pts)** What's the difference in role between the rules file and the progress
    file?
13. **(5 pts)** A loop crashes mid-beat. Explain what's lost and what survives, assuming
    the spine discipline from [Step 12](../06-part-4-the-spine/12-state-between-runs.md)
    was followed correctly.

## Section 5 — A Complete Loop & Human Control (15 pts)

14. **(5 pts)** Name the seven-item minimum-safe checklist a loop clears before its first
    run.
15. **(5 pts)** What does "green ≠ done" mean, concretely, in terms of what a checkmark
    can and can't prove?
16. **(5 pts)** Name the three nested loops from Part 6 and what each one's "arrow"
    points toward.

## Section 6 — The Prebuilt Library & Operating Discipline (10 pts)

17. **(4 pts)** Name the four clauses of the multi-loop coordination contract.
18. **(3 pts)** What's the difference between a doom loop and a ping-pong failure?
19. **(3 pts)** Name the three layers of a tested kill switch.

## Section 7 — T4 Advanced Tier (10 pts)

20. **(5 pts)** Explain the difference between self-learning and self-improving, and why
    only one of them is safe by default — per [hill-climbing.md](../advanced/hill-climbing.md).
21. **(5 pts)** Name the three governance records from
    [governance.md](../advanced/governance.md) and the question each one answers.

## Scoring your own attempt

Answer every question in writing before checking any page. Grade honestly against the
point values above — this exam is self-administered but not self-gradeable in the sense
that matters: pair it with the [capstone-rubric](capstone-rubric.md) for your Project 8
build, since a written score alone doesn't prove you can *build* what you can describe.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| High score, but the capstone loop still lacks a real checker | Exam tests recall, not application | Treat a passing exam as necessary, not sufficient — the capstone is where it's proven |
| Answers use the right vocabulary but no mechanism | Studied the terms, not the reasoning | Re-read the "When it goes wrong" table on the relevant step page — it's built from exactly this failure mode |

---

*Sources:* every question is drawn directly from this course's own pages, which draw on
Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) as the
backbone, plus S2–S9 per the specific step cited above. Full attribution:
[resources/sources.md](../../resources/sources.md).
