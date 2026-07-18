# Part 2 Flashcards · The Heartbeat

> Ten cards on the four heartbeats and their sharp edges. Cover the right column, answer
> aloud, flip.

| # | Front | Back |
| - | ----- | ---- |
| 1 | The four heartbeats | in-session interval · conditional (run-until-done) · unattended schedule · event-driven |
| 2 | In-session loop's defining property | dies with the session — watchable, interruptible, the training-wheels heartbeat |
| 3 | Missed beats are… | dropped, never queued — design beats to act on *now*, idempotently |
| 4 | Scheduler facts worth knowing (Claude Code cron tools) | ~50-task cap · ~3-day expiry · jitter · no catch-up |
| 5 | A conditional loop's heartbeat is… | the condition itself — beat, check, beat again until provably met |
| 6 | The doom loop, and its insurance | same fix retried forever; per-item retry caps + run limit + no-progress stop |
| 7 | The four parts of a routine | prompt · repos · connectors · trigger |
| 8 | The overnight branch guardrail | schedules may push only to a restricted namespace (e.g. `claude/…`) — never `main`; enforced by platform, not prose |
| 9 | Event loop + burst = missing beats. The fix? | a reconciliation sweep: slow scheduled loop that catches what events dropped |
| 10 | Channel-triggered loops: the security rule | anyone who can post holds your trigger — treat all inbound text as untrusted input, never as commands |

*Drill, then: [Part 2 quiz](quiz.md) · [Part 3](../05-part-3-the-body/README.md)*

---

*Sources:* these cards test Part 2, drawn from Panaversity's *Loop Engineering: A Crash
Course* ([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Scheduled Tasks: The Loop Skill & Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
