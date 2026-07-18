# The Pattern Picker

> Answer four questions about the *task*; read off the heartbeat, the level, and the
> checker. Loop design is mostly classification — this page is the classifier.

## The four questions

1. **Does the work end?** A finite list, a green suite, a resolved queue — or does
   it recur as long as the repo lives?
2. **What starts a unit of work?** Time passing · a condition still being false ·
   an external event (PR, message, release)?
3. **How bad is a wrong beat?** A weird report (harmless) · a bad commit
   (revertible) · an external action a stranger sees (unrecallable)?
4. **Can a script judge success?** Exit codes and diffs — or does done-ness need
   judgment?

## The decision tree

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':40,'rankSpacing':45,'padding':10}}}%%
flowchart TD
    Q1{"does the<br/>work end?"}:::q -->|"yes — once"| NONE(["no loop.<br/>just do it"]):::stop
    Q1 -->|"yes — a list/goal"| COND(["conditional<br/>run-until-done<br/>(step 05)"]):::hb
    Q1 -->|"no — recurs"| Q2{"what starts<br/>a unit?"}:::q
    Q2 -->|"the calendar"| SCHED(["schedule<br/>(step 06)"]):::hb
    Q2 -->|"the world"| EV(["event-driven<br/>+ reconciliation sweep<br/>(step 07)"]):::hb
    Q2 -->|"you, watching"| SESS(["in-session interval<br/>(step 04)"]):::hb
    classDef q fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#334155;
    classDef hb fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
    classDef stop fill:#f1f5f9,stroke:#94a3b8,stroke-width:1.5px,color:#334155;
```

Questions 3 and 4 don't change the heartbeat — they set the **level** and the
**checker**:

| Q3 · worst wrong beat | Start at | Human gate |
| --- | --- | --- |
| a report nobody needed | L1, promote normally | samples reports |
| a bad-but-revertible write | L1 longer; L2 with every output read | reads every diff |
| an external, visible action | L1 indefinitely; writes are a governance decision | approves each action class |

| Q4 · can a script judge? | Checker |
| --- | --- |
| yes (links, tests, schema) | **script** — prefer it always |
| partly | script for facts + read-only LLM for shape |
| no (tone, priority, taste) | LLM rubric + human spot-read — and ask if the task is loop-ready at all |

## The picker, run on familiar loops

| Task | Q1 | Q2 | Q3 | Q4 | → Pattern |
| --- | --- | --- | --- | --- | --- |
| "empty this page checklist" | ends | condition | revertible | partly | conditional maker at L2 + LLM checker (this repo's `step-writer`) |
| "keep links honest" | recurs | calendar | harmless | yes | scheduled L1 + script checker (this repo's `link-check` → promoted to CI) |
| "review each PR" | recurs | event | visible | partly | event L1 + reconciliation sweep, comments-only |
| "morning repo triage" | recurs | calendar | harmless | partly | scheduled L1 report ([Step 13](../07-part-5-complete-loop/13-build-the-loop-twice.md)) |

## Two classification mistakes to catch early

- **A workflow mistaken for a loop.** Fixed steps, one pass, deterministic order?
  That's the *body of one beat* ([Step 11](../05-part-3-the-body/11-maker-checker.md)),
  not a loop. Loops decide *whether and when*. Workflows decide *how*.
- **Reaching for the biggest loop.** Unattended-event-driven-with-writes is the
  most powerful pattern and the wrong first answer to almost everything. Pick
  the smallest pattern that does the job. Promotion exists.

*Next:* shape chosen → fill the [design checklist](loop-design-checklist.md).
Unsure the task deserves a loop at all → the
[decision framework](decision-framework.md).

*Sources:* the pattern set follows the seven patterns of the `cobusgreyling/loop-
engineering` reference repo (MIT, S7) and the loop shapes of Panaversity's *Loop
Engineering: A Crash Course* (S1). Full attribution:
[resources/sources.md](../../resources/sources.md).
