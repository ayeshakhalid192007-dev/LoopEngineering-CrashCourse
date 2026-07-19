# Project State — Loop Engineering Crash Course (the project-level spine)

> Owned by the human. Tracks overall progress across the 4-day plan. Per-loop state
> lives in each loop's own file — loops write there, never here.

Current phase: **Day 2 complete — Day 3 not started** (next plan:
`days-plans/day3-plan.md`)
Last updated: 2026-07-18 (Day 2 checkpoint declared: human merged PR #3 to `main`)

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'15px','lineColor':'#475569','edgeLabelBackground':'#f8fafc'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    D1(["Day 1<br/>foundation + tracks<br/>+ prerequisites"]):::done --> D2(["Day 2<br/>14 steps<br/>+ assessments"]):::done
    D2 --> D3(["Day 3<br/>loop library + labs<br/>+ certification"]):::next
    D3 --> D4(["Day 4<br/>website + polish<br/>+ ship"]):::todo
    linkStyle default stroke:#475569,stroke-width:2px;
    classDef done fill:#ccfbf1,stroke:#14b8a6,stroke-width:2.5px,color:#115e59,font-weight:600;
    classDef next fill:#fef3c7,stroke:#f59e0b,stroke-width:2.5px,color:#92400e,font-weight:600;
    classDef todo fill:#e2e8f0,stroke:#94a3b8,stroke-width:2.5px,color:#334155,font-weight:600;
```

## Day progress

- [x] Day 1 — Repo foundation + tracks + prerequisites — **checkpoint declared
      2026-07-16** after human review of README + foundations pages against
      `shared/goal.md`. Built by the loops in `loops/day1/` (page-writer success stop
      20/20 runs; checker: all findings resolved; link-check: clean final pass).
- [x] Day 2 — Full 14-step course + assessments — **checkpoint declared 2026-07-18**
      (human merged PR #3, merge `afec879`; both CI gates green on `main`). All three
      loops hit success stops: step-writer 36/36 pages (14 steps + 13a/13b +
      companions + 6 READMEs + 4 methods + 7 operating), template-checker 36/36 PASS
      (lint 0, diagrams compile, links clean), quiz-writer 6 quizzes + 5 flashcard
      sets. Post-fleet polish in the same PR: docs folders numbered in reading order
      (`00-start-here/` … `10-operating/`), `docs/README.md` contents page, and
      per-page *Sources:* footers (S1–S9) on all 40 course pages.
- [ ] Day 3 — Loop library + labs + advanced tier + certification
- [ ] Day 4 — Website + polish + ship

## Post-checkpoint content changes

- **2026-07-16 17:41Z — diagram polish.** All **11** foundation and prerequisite mermaid
  diagrams were restyled (GitHub-safe `classDef` colour-coding + a shared `%%init%%`
  theme; **styling only — no prose changed**). Re-verified by the `checker` and
  `link-check` loops (Beat 2 in each spine): markdown lint **0 errors**, **11/11**
  diagrams compile to SVG, **116** relative links resolve, §10 template intact on every
  page. Change set **merged to `main` on 2026-07-16 via PR #2** (merge commit
  `94326f5`), together with the `loops-day1/` → `loops/day1/` move; both CI gates green.
- **2026-07-17 — repo-wide diagram pass.** The same shared `%%init%%` theme extended
  beyond `docs/`: mermaid diagrams added to `README.md`, `LOOP.md`, `STATE.md`,
  `CONTRIBUTING.md`, `shared/goal.md`, `loop-plan.md`, `loops/` (README + all three
  Day 1 `loop.md` files), and all four `days-plans/` files.

## Per-loop spines (Day 1)

| Loop | State file |
| ------ | ----------- |
| page-writer | `loops/day1/page-writer/state.md` |
| checker | `loops/day1/checker/state.md` |
| link-check | `loops/day1/link-check/state.md` |

## Per-loop spines (Day 2)

| Loop | State file |
| ------ | ----------- |
| step-writer | `loops/day2/step-writer/state.md` |
| template-checker | `loops/day2/template-checker/state.md` |
| quiz-writer | `loops/day2/quiz-writer/state.md` |

## High Priority (waiting on human)

- Kick off Day 3 (loop library + labs + advanced tier + certification): review
  `days-plans/day3-plan.md` and set up/start the Day 3 loops.

## Watch List

## Recent Noise (ignored)
