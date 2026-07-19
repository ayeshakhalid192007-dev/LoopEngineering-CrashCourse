# Step 4 · In-Session Loops

> The gentlest heartbeat there is: a timer inside a session you're still sitting in.
> Everything about bigger loops is easier to learn right here, where you can watch it all
> happen.

## The hook

You want the test suite checked every five minutes while you write a design doc. You could
set a phone alarm and alt-tab all afternoon like it's 2015. Or you could type one line,
keep writing, and let the session's own pulse do the checking. Same afternoon, one less
job on your plate. That's an in-session loop.

## In-session heartbeats (plain English)

An **in-session loop** runs on a timer *inside* a live agent session. It's the
training-wheels heartbeat, and that's a compliment: you see every beat as it happens, you
can interrupt at any moment, and when the session ends the loop ends with it. Read that
last property as a feature, not a limitation — an in-session loop can never outlive your
attention.

Two flavors matter:

- **Interval loops** — "every N minutes, do X." The beat fires on the clock.
- **Scheduled tasks** — "at these times, do X," managed by the harness's own scheduler
  (create/list/delete them like little cron entries).

That scheduler is a real system with real rules. Learn them before you trust it:

- **Caps** on how many tasks may exist — Claude Code's cron tools cap at **50 tasks**.
- **Expiry** (~3 days), so forgotten timers quietly die on their own.
- **Jitter**, so a crowd of tasks doesn't stampede at the same instant.
- **No catch-up**: a beat missed while the machine slept is *dropped*, never replayed.

Design as if "misses are normal," because they are.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    T("⏱ interval fires<br/>(+ jitter)"):::time --> Q{"session<br/>still open?"}:::limit
    Q -->|no| DEAD(["loop ends with session<br/>(by design)"]):::stop
    Q -->|yes| B("one beat"):::beat --> LOG("log line"):::beat --> T
    MISS("machine asleep?<br/>beat dropped,<br/>never queued"):::limit -.-> T
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef time fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef beat fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    classDef limit fill:#ffe4e6,stroke:#f43f5e,stroke-width:2.5px,color:#9f1239,font-weight:600;
    classDef stop fill:#e2e8f0,stroke:#94a3b8,stroke-width:2.5px,color:#334155,font-weight:600;
```

## The mechanics in each tool

Here's how each tool starts an in-session beat, plus the scheduler limits that ride along:

```claude
# Claude Code — live docs: https://docs.claude.com/en/docs/claude-code
> /loop 5m Run the test suite. Report new failures only.   # interval loop
# Scheduled tasks: the Cron tools (CronCreate / CronList / CronDelete)
#   caps: ~50 tasks · ~3-day expiry · jitter · missed beats are NOT replayed
# Kill switch for all of it: the CLAUDE_CODE_DISABLE_CRON env var
```

```opencode
# OpenCode — live docs: https://opencode.ai/docs
# No built-in /loop — the shell IS the timer:
while sleep 300; do
  opencode run "Run the test suite. Report new failures only."
done
# For a persistent session to attach beats to, see `opencode serve` /
# attaching to a running server in the live docs.
```

> [!NOTE]
> **Going deeper:** in-session loops are the training ground for levels of autonomy — this
> repo's own rule "L1 report-only first" (see [`LOOP.md`](../../LOOP.md)) exists precisely
> because an in-session loop is the cheapest place to *watch* a loop earn your trust. The
> day the session has to end but the loop must not, you've outgrown this heartbeat — that's
> [Step 6](06-unattended-schedules.md).

## Check yourself

**Q: Your laptop lid was closed from 12:00–13:00. Your 15-minute in-session loop was
supposed to fire four times in that window. How many beats run at 13:01, and why is that
the *right* answer?**

<details><summary>Answer</summary>

**At most one** — the next scheduled beat. The four missed beats are dropped, not queued.
Catch-up would mean four stale beats stampeding at once against a world that has already
moved on. A loop should always act on *now*. Build each beat to observe current state, and
a missed beat costs you nothing.

</details>

## Try With AI

Start a report-only interval loop in a throwaway repo: "every 2 minutes, count the TODO
comments in `src/` and append the number with a timestamp to `todo-count.log`." Let it run
five beats while you do something else entirely. Then read the log. You've just run your
first L1 loop — and that log *is* its spine.

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Loop died at lunch | Session closed — in-session loops don't outlive it | Expected; promote to a schedule (Step 6) if it must survive you |
| Tasks silently stopped appearing | Scheduler cap (~50) or expiry (~3 days) hit | List tasks, prune dead ones; treat expiry as a feature |
| Beats bunch up / drift off the minute | Jitter — by design, to avoid stampedes | Don't build beats that assume exact times; read state, act on now |
| "It missed a beat and never made it up" | No catch-up, dropped-not-queued | Make each beat idempotent over current state, not over history |

---

*Glossary terms used on this page:* **heartbeat**, **beat**, **L1 (report-only)**,
**idempotent** — see the [glossary](../02-foundations/glossary.md).

*Sources:* in-session heartbeats — `/loop`, the cron tools, caps, and jitter — come from
Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)) and
*Scheduled Tasks: The Loop Skill & Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
