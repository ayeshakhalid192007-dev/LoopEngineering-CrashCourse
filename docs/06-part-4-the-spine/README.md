![The spine, memory between runs: the model forgets but the repo does not — each run reads the spine first, does the work, updates the spine last. No spine, no loop](../../assets/part-4-the-spine.svg)

# Part 4 · The Spine

> One step, one organ, one unbending rule: the model forgets, so the files have to
> remember. This is the briefest part of the whole course — and the one whose absence
> quietly kills more loops than anything else.

## The step

| Step | Page | One-line takeaway |
| --- | --- | --- |
| 12 | [State Between Runs](12-state-between-runs.md) | constitution + diary, updated every beat, **committed** — resume, never restart |

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    B7("beat 7<br/>💥 crash"):::stop --> SP[("committed<br/>spine")]:::file
    SP ==> B8("beat 8<br/>resumes at item 8"):::beat
    NOSP("no spine?"):::limit -.-> B1("beat 1, again,<br/>forever"):::stop
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef stop fill:#e2e8f0,stroke:#94a3b8,stroke-width:2.5px,color:#334155,font-weight:600;
    classDef file fill:#f1f5f9,stroke:#64748b,stroke-width:2.5px,color:#334155,font-weight:600;
    classDef beat fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    classDef limit fill:#ffe4e6,stroke:#f43f5e,stroke-width:2.5px,color:#9f1239,font-weight:600;
```

## Why this part fits on one page

Because the discipline itself is tiny and non-negotiable. Every loop in this repo lives by
it, and you can check their homework: each `loops/*/state.md` is a spine you can open right
now. The Day 1 reconstruction notices are the cautionary half — they record, in the loops'
own words, what happens when the rule gets skipped. With heartbeat, body, and spine all in
hand, you're finally equipped to assemble the whole creature —
[Part 5](../07-part-5-complete-loop/README.md) builds one loop twice, once in each tool.

## Check your understanding

[Take the Part 4 quiz](quiz.md) · [drill the flashcards](flashcards.md)

*This part belongs to track [T2 · Practitioner](../00-start-here/learning-tracks.md).*

*Sources:* Part 4 draws on Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)),
*Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)), and Sydney
Runkle's *The Art of Loop Engineering*
([S6](https://www.langchain.com/blog/the-art-of-loop-engineering)). Full attribution:
[resources/sources.md](../../resources/sources.md).
