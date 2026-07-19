# Learning Tracks — the T1→T4 map

> Four tracks carry you from *never having built a loop* all the way to *designing and
> governing loop fleets*. And you graduate each one by **building**, never by reading.

## The hook

A colleague corners you: "I finished the intro — am I qualified to put a loop on our
production repo?" The honest answer is never a page count. It's an exit assessment:
*show me the loop you built, its stopping condition, and who checks its work.* Tracks
exist to turn that fuzzy question into a concrete, gradeable one.

## How tracks work (plain English)

Every track is a contract with three clauses. An **entry check** — what you're assumed
to know, verifiable in minutes, not a quiz. A **body of study** — pages plus labs. And
an **exit assessment** — something you build that a rubric can actually grade. The design
has one deliberate property worth pointing out: finish one track's exit, and you have
already satisfied the next track's entry. There is never a gap to fall into.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':70,'padding':12}}}%%
flowchart LR
    T1("<b>T1</b><br/>Foundations"):::t1 -->|"exit: run your first<br/>in-session loop"| T2("<b>T2</b><br/>Practitioner"):::t2
    T2 -->|"exit: a loop with a provable<br/>stop and a separate checker"| T3("<b>T3</b><br/>Engineer"):::t3
    T3 -->|"exit: the same six-part loop<br/>shipped in two tools"| T4("<b>T4</b><br/>Ultra-Pro"):::t4
    T4 -->|capstone| C(["🎖 Loop Ready<br/>certification"]):::cert
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef t1 fill:#dbeafe,stroke:#3b82f6,stroke-width:2.5px,color:#1e40af,font-weight:600;
    classDef t2 fill:#ede9fe,stroke:#8b5cf6,stroke-width:2.5px,color:#5b21b6,font-weight:600;
    classDef t3 fill:#e0e7ff,stroke:#6366f1,stroke-width:2.5px,color:#312e81,font-weight:600;
    classDef t4 fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef cert fill:#d1fae5,stroke:#10b981,stroke-width:2.5px,color:#065f46,font-weight:600;
```

## The four tracks

### T1 · Foundations — *Beginner*

| | |
| --- | --- |
| **Entry check** | You can use an AI coding agent by hand (or are willing to install one now) |
| **You study** | [Prerequisites](../01-prerequisites/environment-setup.md) → [Foundations](../02-foundations/glossary.md) → Part 1 *(Day 2)* |
| **Labs** | Project 1 — the watch loop |
| **Exit assessment** | Explain the prompting→looping shift and the six parts; run your first in-session loop |

### T2 · Practitioner — *Intermediate*

| | |
| --- | --- |
| **Entry check** | You can name the six parts of a loop without looking |
| **You study** | Parts 2–4 (heartbeat, body, spine) + the make-your-own-loop method *(Day 2)* |
| **Labs** | Projects 2–4 |
| **Exit assessment** | A loop with a chosen heartbeat, a provable stopping condition, a maker/checker split, and a spine |

### T3 · Engineer — *Advanced*

| | |
| --- | --- |
| **Entry check** | You've assembled a working loop of your own |
| **You study** | Parts 5–6, the prebuilt loop library, operating & safety *(Days 2–3)* |
| **Labs** | Projects 5–8 |
| **Exit assessment** | The full six-part loop built in **two** tools (Claude Code ↔ OpenCode), operated within a budget |

### T4 · Ultra-Pro — *Expert*

| | |
| --- | --- |
| **Entry check** | You've shipped at least one loop others rely on |
| **You study** | `advanced/`: hill-climbing, loopcraft, multi-loop coordination, enterprise governance *(Day 3)* |
| **Labs** | Fleet drills + the certification capstone |
| **Exit assessment** | The **Loop Ready** capstone: design, justify, and govern a multi-loop system against the rubric |

## Which tools you'll touch

Every track teaches with **Claude Code ↔ OpenCode** shown side by side, and brings in
Codex and Grok only where a mechanic genuinely differs. Before you begin, confirm your
setup answers back:

```claude
claude --version
```

```opencode
opencode --version
```

> [!NOTE]
> **Going deeper:** the tracks map cleanly onto the "lasting vs. mechanical" split. What
> a track *certifies* is the lasting layer — the shapes and the judgment. The mechanical
> layer (this week's flags and commands) is something you look up, never something you
> memorize. The distinction is drawn out in
> [02-foundations/mental-models.md](../02-foundations/mental-models.md).

## Check yourself

**Q: You just finished T2's exit assessment. What is the T3 entry check — and do you
already pass it?**

<details><summary>Answer</summary>

The T3 entry check is "you've assembled a working loop of your own" — which is *exactly*
what T2's exit assessment made you build. That is the whole design at work: every exit
quietly satisfies the next entry, so you never hit a placement gap.

</details>

## Try With AI

Paste your current track's **exit assessment** into your agent and ask: "Draft the
smallest plan to get me there in one week, using only this repo's pages and labs." Now do
the interesting part — grade *its plan* against the track table above. Did it quietly
drop the labs? (Reading never graduates a track. Building does.)

## When it goes wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Stuck mid-track, pages feel abstract | You skipped the labs | Do the track's first lab before reading any further |
| Passed the exit, but production loops still scare you | Exit was done in a toy repo only | Re-run the assessment on a real (but low-stakes) repo |
| Teammates all claim different tracks | Self-assessment drift | Treat the entry checks as a shared bar — they're verifiable in minutes |

---

*Glossary terms used on this page:* **six parts**, **heartbeat**, **spine**,
**maker/checker**, **Loop Ready** — see [02-foundations/glossary.md](../02-foundations/glossary.md).

*Sources:* the four-track design and entry/exit checks follow the curriculum backbone of
Panaversity's *Loop Engineering: A Crash Course* ([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)).
Full attribution: [resources/sources.md](../../resources/sources.md).
