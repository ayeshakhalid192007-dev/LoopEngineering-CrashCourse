# Scaffold a Loop from the Template

> [The A–F method](make-your-own-loop.md) tells you *what* to decide; [the design
> checklist](loop-design-checklist.md) is the blank form. This page is the shortcut between
> them: a ready-made kit you copy and fill, so a new loop starts as a folder of blanks to
> complete rather than an empty directory to invent.

## The idea

Every loop is the same short list of small files — a definition, a spine, a budget, a
constitution, a skill, and a read-only checker. Writing them from scratch each time is how
loops get born missing an organ. So the repo ships a canonical kit,
[`starters/_template/`](../../starters/_template/README.md), with every file pre-poured and
every decision marked as an `<ANGLE-BRACKET>` blank. Copy it, fill the blanks, and the
seven-item minimum is most of the way done for you.

> [!NOTE]
> This is the **manual** scaffold — you copy and fill by hand, which keeps you reading every
> line you commit. The reference repo automates the same skeleton with a one-line
> `loop-init` CLI; the eventual repo equivalent (`scripts/new-loop-scaffold.mjs`) stamps
> this exact template. The files it emits are the ones you're filling here.

## Scaffold in six moves

```text
1. cp -r starters/_template starters/<loop-name>        # clone the kit
2. mv .../loop-state.md.example  <loop-name>-state.md   # your spine, renamed
3. fill every <ANGLE-BRACKET> in LOOP.md                # the six parts + three stops
4. write the procedure into the SKILL.md                # intent in the prompt, steps in the skill
5. git add + commit the spine BEFORE the first beat     # uncommitted state is pre-lost
6. run at L1, watched, for one real cycle               # prove before overnight
```

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':42,'rankSpacing':48,'padding':10}}}%%
flowchart LR
    T[("starters/_template<br/>the blank kit")]:::file --> CP("cp → starters/<loop-name>"):::step
    CP --> FILL("fill the <blanks><br/>LOOP.md · SKILL.md · budget"):::step
    FILL --> COMMIT("commit the spine<br/>before beat 1"):::gate
    COMMIT --> RUN(["run at L1, watched —<br/>one real cycle"]):::win
    classDef file fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#334155;
    classDef step fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef gate fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
    classDef win fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
```

## What each file in the kit is for

| File | You fill it with | Guided by |
| --- | --- | --- |
| `LOOP.md` | the six parts, the prompt, limits, ownership, the three stops | [A–F method](make-your-own-loop.md) |
| `<loop-name>-state.md` | the spine — checklist, run history, findings, lessons | [Step 12 · Spine](../06-part-4-the-spine/12-state-between-runs.md) |
| `loop-budget.md` | caps + the 80% tripwire | [Cost management](../08-part-6-human-control/cost-management.md) |
| `loop-constraints.md` | the constitution — nevers and always | [Safety](../10-operating/safety.md) |
| `loop-run-log.md` | the append-only line format | [Observability](../10-operating/observability.md) |
| `.claude/skills/loop-task/SKILL.md` · `skills/loop-task.md` | the procedure (Claude Code · OpenCode) | [Step 9 · Skills](../05-part-3-the-body/09-skills.md) |
| `.claude/agents/loop-verifier.md` | the read-only checker + its rubric | [Step 11 · Maker–Checker](../05-part-3-the-body/11-maker-checker.md) |
| `opencode.json.example` | write-narrow permissions (OpenCode) | [Safety](../10-operating/safety.md) |

## Worked in 60 seconds — a `link-sentinel` loop

*Copy:* `cp -r starters/_template starters/link-sentinel`. *Fill `LOOP.md`:* heartbeat =
schedule, every 30m; body = runs a link checker, **read-only on `docs/`**; spine =
`link-sentinel-state.md`; stop = "a pass over `docs/` with zero broken links"; checker = a
**script** (a link either resolves or it doesn't — the strongest checker there is); gate =
a human reads the findings. *Fill the skill:* the three-line link-check procedure. *Commit*
the spine. *Run at L1.* That's a complete production loop — and it's exactly the shape of
this repo's own [`link-check`](../../loops/day1/link-check/loop.md), which was later
promoted into CI.

## Before the first run

Walk the copied kit against the seven-item minimum — the same list every loop in this repo
clears (and the same one in [the design checklist](loop-design-checklist.md)):

1. Provable success condition
2. Run limit
3. Spine written first, committed
4. Report-only (L1) start
5. Human gate placed
6. One log line per beat
7. Kill switch tested

Any blank you can't fill in a sentence isn't a formatting gap — it's a design decision you
haven't made yet. Make it before beat 1.

*Next:* not sure this task even deserves a loop? → the [decision framework](decision-framework.md).
Unsure which heartbeat fits? → the [pattern picker](pattern-picker.md). Want to see the kit
built live in two tools? → [Part 5 · A Complete Loop](../07-part-5-complete-loop/13-build-the-loop-twice.md).

*Sources:* the starter-kit model and the `loop-init` scaffold shape are adapted from the
`cobusgreyling/loop-engineering` reference repo
([S7](https://github.com/cobusgreyling/loop-engineering), MIT); the loop anatomy the kit
encodes is from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).
