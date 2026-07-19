# Anti-Patterns

> [Failure modes](failure-modes.md) are how running loops break. Anti-patterns are how loops get
> *designed* broken in the first place — the mistakes this catalog exists to catch at the
> whiteboard, where they cost you a conversation instead of an incident.

## Design anti-patterns

| Anti-pattern | Why it feels right | Why it's wrong | Instead |
| --- | --- | --- | --- |
| **No spending limit** | "it's just a small loop" | small × unattended × daily compounds | caps + tripwire before beat 1 |
| **No stuck-check** | "it'll finish eventually" | doom loops burn budget invisibly ([the eight infinite-loop scenarios](infinite-loops.md)) | no-progress stop, 3 beats |
| **Maker grades itself** | "self-review saves a loop" | blind spots co-sign their own bugs | separate checker, cheapest kind that works |
| **Vague stopping condition** | "we'll know it when we see it" | the loop won't; it manufactures plausible progress | stop written as a machine-checkable spec |
| **Prompting-instead-of-looping maintenance** | each fix is "just one prompt" | you become the heartbeat; nothing accumulates | third repetition → build the loop |
| **Fat prompt / bloated rules file** | more instructions = more control | context degrades; instructions collide | intent in the prompt, procedure in skills, constitution short |
| **Too many overlapping tools** | "give it everything, it'll pick" | every extra tool is a loaded option for a confused beat | few, focused tools ([Step 10](../05-part-3-the-body/10-connectors-mcp.md)) |
| **Non-idempotent writes** | happy path works fine | retries/double-fires duplicate actions | "ensure X" beats "do X"; key on ids |
| **Silent error handling** | clean logs look good | failures become no-ops nobody sees | errors are loud, actionable, logged |
| **Reaching for the biggest loop** | the impressive demo | maximum autonomy before minimum trust | smallest pattern that does the job; promote later |
| **A workflow mistaken for a loop** | it repeats steps, doesn't it? | fixed one-pass sequences need no heartbeat | script it; a workflow is one beat's body |
| **Too-strict constitution** | more rules = safer | the loop escalates everything, does nothing | rules earn their place; prune what never fires |

## Operational anti-patterns (design-time seeds of runtime failures)

| Anti-pattern | It becomes | Catalog entry |
| --- | --- | --- |
| state kept in the model's memory | restart-from-zero | [no spine](failure-modes.md) |
| trusting statuses over outcomes | broken product, green board | [green ≠ done](failure-modes.md) |
| secrets reachable from the loop's body | exfiltration risk | [safety](safety.md) — deny-listed paths |
| events assumed queued | silent gaps in bursts | [dropped-not-queued](../04-part-2-heartbeat/07-event-driven.md) |
| unrestricted branch pushes | 3 am writes to `main` | [safety](safety.md) — branch guardrails |

## Human anti-patterns

The expensive ones — they show up last and cost the most:

- **Cognitive surrender.** "The loop probably knows better," fired off as a reflex. The loop is
  never the authority on itself. The instruments are.
- **Comprehension debt as a lifestyle.** Shipping faster than anyone understands, indefinitely —
  right up until the first "why?" that nobody in the room can answer.
- **Intent debt as a lifestyle.** Specs left vague because tightening them is genuine work. And
  the loop collects on every vague word, at scale.
- **AI gravity.** Each success tugs the next decision toward the system — scope creep with no
  decider in sight. The antidote: capability changes are *written* decisions.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    D("design<br/>anti-pattern"):::warn -->|"survives the<br/>whiteboard"| O("operational<br/>failure mode"):::bad
    O -->|"survives the<br/>instruments"| H("human<br/>anti-pattern"):::worse
    CATCH1(["cheapest catch:<br/>this page, at design"]):::win -.-> D
    CATCH2(["still cheap:<br/>observability"]):::ok -.-> O
    CATCH3(["most expensive:<br/>culture change"]):::stop -.-> H
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef warn fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef bad fill:#ffe4e6,stroke:#f43f5e,stroke-width:2.5px,color:#9f1239,font-weight:600;
    classDef worse fill:#ede9fe,stroke:#8b5cf6,stroke-width:2.5px,color:#5b21b6,font-weight:600;
    classDef win fill:#ccfbf1,stroke:#14b8a6,stroke-width:2.5px,color:#115e59,font-weight:600;
    classDef ok fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    classDef stop fill:#e2e8f0,stroke:#94a3b8,stroke-width:2.5px,color:#334155,font-weight:600;
```

*Use it at the whiteboard: walk any new `loop.md` down the design table — every row you can't
rule out in a sentence is homework to finish before the
[design checklist](../09-methods/loop-design-checklist.md) gets its checkmarks.*

*Sources:* the anti-pattern catalog is drawn from the `cobusgreyling/loop-engineering` reference
repo ([S7](https://github.com/cobusgreyling/loop-engineering), MIT) and the essays of Addy
Osmani's *Loop Engineering* ([S5](https://addyosmani.com/blog/loop-engineering/)) and Sydney
Runkle's *The Art of Loop Engineering*
([S6](https://www.langchain.com/blog/the-art-of-loop-engineering)). Full attribution:
[resources/sources.md](../../resources/sources.md).
