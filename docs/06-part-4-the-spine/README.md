# Part 4 · The Spine

> One step, one organ, one rule: the model forgets, so the files must remember.
> This is the shortest part of the course — and the one whose absence kills the
> most loops.

## The step

| Step | Page | One-line takeaway |
| --- | --- | --- |
| 12 | [State Between Runs](12-state-between-runs.md) | constitution + diary, updated every beat, **committed** — resume, never restart |

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart LR
    B7("beat 7<br/>💥 crash"):::stop --> SP[("committed<br/>spine")]:::file
    SP ==> B8("beat 8<br/>resumes at item 8"):::beat
    NOSP("no spine?"):::limit -.-> B1("beat 1, again,<br/>forever"):::stop
    classDef stop fill:#f1f5f9,stroke:#94a3b8,stroke-width:1.5px,color:#334155;
    classDef file fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#334155;
    classDef beat fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef limit fill:#fff1f2,stroke:#f43f5e,stroke-width:1.5px,color:#9f1239;
```

## Why this part is one page long

Because the discipline is small and absolute. Every loop in this repo carries
it, and you can audit them: each `loops/*/state.md` is a live spine. The Day 1
reconstruction notices document what happens when the rule is skipped. With
heartbeat, body, and spine in hand, you're ready to build the whole animal —
[Part 5](../07-part-5-complete-loop/README.md) builds one loop twice, in two
tools.

## Check your understanding

[Take the Part 4 quiz](quiz.md) · [drill the flashcards](flashcards.md)

*This part belongs to track [T2 · Practitioner](../00-start-here/learning-tracks.md).*

*Sources:* Part 4 draws on Panaversity's *Loop Engineering: A Crash Course* (S1),
Panaversity's *Agentic Coding Crash Course* (S2), and Sydney Runkle's *The Art of Loop
Engineering* (LangChain, S6). Full attribution:
[resources/sources.md](../../resources/sources.md).
