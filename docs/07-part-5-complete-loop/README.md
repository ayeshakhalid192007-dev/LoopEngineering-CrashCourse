# Part 5 · A Complete Loop, Twice

> The capstone of the build track: every organ from Parts 1–4 assembled into one
> production loop — then assembled *again* in a second tool, to separate the shape
> from the plumbing.

## The steps

| Step | Page | One-line takeaway |
| --- | --- | --- |
| 13 | [Build the Morning-Triage Loop](13-build-the-loop-twice.md) | the design: six parts filled in + the 7-item minimum-safe checklist |
| 13a | [Claude Code walkthrough](13a-claude-code-walkthrough.md) | skill · reviewer agent · Routine/cron · permissions · one real morning |
| 13b | [OpenCode walkthrough](13b-opencode-walkthrough.md) | same skill, same rubric — cron + wrapper script as visible lumber |

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart LR
    D("13 · one design<br/>six parts, one checklist"):::step --> A("13a · Claude Code<br/>platform plumbing"):::tool
    D --> B("13b · OpenCode<br/>visible lumber"):::tool
    A & B --> L(["the lesson:<br/>shape is durable,<br/>plumbing is swappable"]):::win
    classDef step fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef tool fill:#f5f3ff,stroke:#8b5cf6,stroke-width:1.5px,color:#5b21b6;
    classDef win fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
```

## Why twice?

Because after the second build you can answer the only portability question that
matters: *which parts would survive a tool change?* (All six organs, the checklist,
the L1 discipline.) *Which parts wouldn't?* (Every command you typed.) Memorize the
first list; look up the second — that's the lasting-vs-mechanical rule this course
repeats on purpose.

## Check your understanding

[Take the Part 5 quiz](quiz.md) — *(this part has no flashcards: the exercise IS
the two builds).*

Then on to the last part: [Part 6 · Human Control](../08-part-6-human-control/README.md).

*This part belongs to track [T3 · Engineer](../00-start-here/learning-tracks.md).*

*Sources:* Part 5 draws on Panaversity's *Loop Engineering: A Crash Course* (S1). Full
attribution: [resources/sources.md](../../resources/sources.md).
