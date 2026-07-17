# Part 6 · Human Control

> The course ends where accountability lives: with you. Four pages on the job that
> can't be automated — paying for, verifying, and understanding what your loops do,
> inside a structure that keeps every decision human.

## The steps

| Step | Page | One-line takeaway |
| --- | --- | --- |
| 14 | [Staying the Engineer](14-staying-the-engineer.md) | cost + verification + comprehension; prove before overnight; resist AI gravity |
| — | [Cost Management](cost-management.md) | caps before first run; the 80% tripwire; budgets stop runaway cost, you stop pointless cost |
| — | [Verification](verification.md) | green ≠ done: scripts → checker → outcome check → human spot-read |
| — | [The Three Nested Loops](the-three-nested-loops.md) | agent < engineer < governance; every arrow points inward |

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart LR
    S14("14 · staying the<br/>engineer"):::step --> C("cost<br/>management"):::pillar
    S14 --> V("verification"):::pillar
    S14 --> N("three nested<br/>loops"):::pillar
    C & V & N --> DONE(["🎓 course body complete —<br/>methods & operating next"]):::win
    classDef step fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef pillar fill:#f5f3ff,stroke:#8b5cf6,stroke-width:1.5px,color:#5b21b6;
    classDef win fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
```

## Where to next

The 14 steps taught the *shape*; two layers turn it into daily practice: the
[methods pages](../methods/make-your-own-loop.md) (design your own loop, A–F) and
the [operating handbook](../operating/operating-loops.md) (running fleets without
surprises). Both belong to this part's track.

## Check your understanding

[Take the Part 6 quiz](quiz.md) · [drill the flashcards](flashcards.md)

*This part belongs to track [T3 · Engineer](../learning-tracks.md).*
