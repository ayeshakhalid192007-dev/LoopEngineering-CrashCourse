# The Loop Design Checklist

> Print-and-fill companion to [the A–F method](make-your-own-loop.md). If any box
> resists a one-line answer, the design isn't done — the resistance *is* the
> finding.

## Identity

- [ ] **Name:** `___________` (verb-noun, like every loop in this repo's `loops/`)
- [ ] **Job in one sentence:** `___________`
- [ ] **Owner (a named human):** `___________` — no owner, no run
- [ ] **Shape** (circle one): ends → conditional · repeats → schedule / event · once → **stop, don't build a loop**

## The six parts

- [ ] **Heartbeat:** exact cadence / condition / event: `___________`
- [ ] **Body:** may touch exactly these paths/tools: `___________` — everything else read-only
- [ ] **Spine:** state file path: `___________` — written and **committed before beat 1**
- [ ] **Stopping condition (as a spec):** `___________` — machine-checkable, no adjectives
- [ ] **Checker:** script / read-only LLM / human: `___________` — never the maker
- [ ] **Human gate:** placed at: `___________`

## The three stops

- [ ] Success = the spec above
- [ ] Limit = max `____` runs/day (would the number embarrass you if hit? good)
- [ ] No progress = 3 unchanged beats → log and stop

## Guardrails

- [ ] Token cap/day: `____` · 80% tripwire → report-only (measured against the cap *as currently written*)
- [ ] Kill switch exists and has been **tested once**: `___________`
- [ ] One run-log line per beat — silent runs are a failure mode
- [ ] Writes are idempotent (safe to retry / double-fire)
- [ ] Blast radius written down: worst realistic bad beat does: `___________`

## Trust plan

- [ ] Starts at **L1 report-only**, watched, on real work
- [ ] Promotion rule: one level per proven level; who decides: `___________`
- [ ] Demotion rule: any incident → drop one level, run the [recovery playbook](../10-operating/recovery-playbook.md)

## The seven-item minimum before the FIRST run

The same list every loop in this repo clears
(cf. [Step 13](../07-part-5-complete-loop/13-build-the-loop-twice.md)):

| # | Item | ✔ |
| - | ---- | - |
| 1 | Provable success condition | ☐ |
| 2 | Run limit | ☐ |
| 3 | Spine written first, committed | ☐ |
| 4 | Report-only (L1) start | ☐ |
| 5 | Human gate placed | ☐ |
| 6 | One log line per beat | ☐ |
| 7 | Kill switch tested | ☐ |

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart LR
    CL("checklist<br/>all boxes"):::step --> Q{"any box<br/>resisted?"}:::limit
    Q -->|yes| FIX("that resistance is<br/>the design flaw — fix it"):::warn
    FIX --> CL
    Q -->|no| RUN(["cleared to run<br/>at L1"]):::win
    classDef step fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef limit fill:#fff1f2,stroke:#f43f5e,stroke-width:1.5px,color:#9f1239;
    classDef warn fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
    classDef win fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
```

*Live examples of filled-in designs: every `loop.md` under
[`loops/`](../../loops/README.md) is this checklist, answered for real.*

*Sources:* the checklist condenses the minimum-safe practice of Panaversity's *Loop
Engineering: A Crash Course* (S1) and the `cobusgreyling/loop-engineering` reference
repo (MIT, S7). Full attribution: [resources/sources.md](../../resources/sources.md).
