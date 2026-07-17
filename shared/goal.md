# Goal — Day 1: Repo Foundation + Tracks + Prerequisites

> Shared by all Day 1 loops. Read-only for loops; only the human edits this file.
> Source: `loop-plan.md` §25 (Day 1) and `days-plans/day1-plan.md`.

## The goal

By the end of Day 1 the repository exists as a real, GitHub-browsable project with its
full skeleton and its entry layer completely written — everything a learner needs
**before** the 14 steps begin.

## The four outcomes

1. **The repo stands up as a project** — MIT `LICENSE`, complete `README.md` (hero,
   badges, nav, quickstart, start-here router), `resources/sources.md` (all 9 sources),
   `CONTRIBUTING.md`, `SECURITY.md`, `CODEOWNERS`, `CITATION.cff`, populated `.github/`.
2. **The repo dogfoods its own discipline** — real (not placeholder) `AGENTS.md`,
   `CLAUDE.md`, `LOOP.md`, `STATE.md`, `loop-budget.md`, `loop-constraints.md`,
   `loop-run-log.md`.
3. **The entry layer of the course is written** — `docs/start-here.md`,
   `docs/learning-tracks.md`, all 3 `docs/prerequisites/` pages, all 6
   `docs/00-foundations/` pages, each following the §10 page template.
4. **The toolchain is ready for Day 2** — skills pulled and verified; empty scaffold for
   `docs/part-1`…`part-6`, `patterns/`, `starters/_template/`, `skills/`, `templates/`,
   `examples/`, `stories/`, `assets/`, `scripts/`.

## How the outcomes become "done"

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart LR
    O1("1 · Repo stands up<br/>as a project"):::outcome --> DOD{"Definition<br/>of done<br/>all boxes"}:::dod
    O2("2 · Dogfooding files<br/>are real"):::outcome --> DOD
    O3("3 · Entry layer<br/>written, §10 template"):::outcome --> DOD
    O4("4 · Toolchain ready<br/>for Day 2"):::outcome --> DOD
    DOD --> GATE(["🧑 Human gate —<br/>review README +<br/>foundations pages"]):::human
    GATE --> CP(["✅ Day 1 checkpoint<br/>declared"]):::win
    classDef outcome fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef dod fill:#f5f3ff,stroke:#8b5cf6,stroke-width:1.5px,color:#5b21b6;
    classDef human fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
    classDef win fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
```

## Definition of done (the provable stopping condition)

- [ ] Repo browsable on GitHub with **no broken relative links**
- [ ] Tracks map, prerequisites, and foundations pages complete and readable
- [ ] Every entry-layer page follows the §10 template
- [ ] Dogfooding files contain real content
- [ ] A stranger landing on `README.md` can navigate to `start-here.md` and begin
- [ ] Human has reviewed `README.md` and the foundations pages (human gate)

## Today's human jobs

- Write the `README.md` hero yourself (the face of the project)
- Read the checker loop's findings every hour or two
- Commit at the checkpoint
