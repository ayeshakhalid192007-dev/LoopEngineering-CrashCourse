![The four heartbeats a loop can start with — in-session, conditional, scheduled, event-driven — ranging from you-hold-it to it-runs-without-you; each firing is called a beat](../../assets/part-2-heartbeat.svg)

# Part 2 · The Heartbeat

> Four ways a loop decides *when to beat* — from a timer you can watch tick, to the world
> itself reaching over and pulling the trigger. Read this part as a menu, not a ladder:
> real fleets mix all four.

## The steps

| Step | Page | Heartbeat | One-line takeaway |
| --- | --- | --- | --- |
| 04 | [In-Session Loops](04-in-session-loops.md) | interval, inside a session | training wheels: watchable, interruptible, dies with the session |
| 05 | [Conditional — Run Until Done](05-conditional-run-until-done.md) | the goal itself | everything hangs on three stops: success, limit, no-progress |
| 06 | [Unattended Schedules](06-unattended-schedules.md) | cron, nobody watching | four parts (prompt·repos·connectors·trigger); guardrails first |
| 07 | [Event-Driven](07-event-driven.md) | the world | dropped-not-queued; always pair with a reconciliation sweep |

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    subgraph MENU ["the heartbeat menu"]
      direction TB
      I("⏱ interval<br/>step 04"):::hb
      C("🎯 conditional<br/>step 05"):::hb
      S("⏰ schedule<br/>step 06"):::hb
      E("⚡ event<br/>step 07"):::hb
    end
    MENU --> PICK(["pick per job —<br/>methods/pattern-picker"]):::next
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef hb fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef next fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    style MENU fill:#fffbf5,stroke:#fcd34d,stroke-width:1.5px,color:#92400e;
```

## The thread through all four

Two rules keep coming back on every page, because they hold for every heartbeat there is:

- **Missed beats are dropped, not queued** — so design beats that act on *now*, not on a
  backlog of moments that have already passed.
- **The heartbeat only decides *when*.** What a beat may touch (body), what it remembers
  (spine), and when it all ends (stops) are the other four organs —
  [Part 3](../05-part-3-the-body/README.md) picks up the body.

## Check your understanding

[Take the Part 2 quiz](quiz.md) · [drill the flashcards](flashcards.md)

*This part belongs to track [T2 · Practitioner](../00-start-here/learning-tracks.md).*

*Sources:* Part 2 draws on Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
*Spec-Driven Development*
([S3](https://agentfactory.panaversity.org/docs/spec-driven-development-crash-course)),
*Scheduled Tasks: The Loop Skill & Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)), and the
`cobusgreyling/loop-engineering` reference repo
([S7](https://github.com/cobusgreyling/loop-engineering), MIT). Full attribution:
[resources/sources.md](../../resources/sources.md).
