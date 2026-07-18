# Loop: `step-writer` (Day 2)

> The **maker** of the Day 2 fleet — Day 1's `page-writer` pattern reused on a bigger
> checklist. It writes the whole conceptual course body (step pages, part indexes,
> methods, operating handbook), one page per beat, and stops when the checklist is
> empty. It is the only Day 2 loop with permission to write its slice of `docs/`.

> **Current mission: pass 2 — the tone rewrite (2026-07-18).** Pass 1 wrote all 36
> pages and stopped on success. The human's tone study found the pass-1 prose denser
> and more aphoristic than the source voice (Agent Factory S1–S4, the
> `cobusgreyling/loop-engineering` repo S7). Pass 2 rewrites every page to match
> [`shared/style-guide.md`](../../../shared/style-guide.md) — same pages, same §10
> structure, same facts; only the voice changes. Read the style guide at the start
> of every beat.

## The six parts

| Part                   | This loop                                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Heartbeat**          | Conditional — *run-until-done*. Self-paced: the next beat starts as soon as the last one finishes.                                       |
| **Body**               | May write `docs/*-part-*` (except `quiz.md`/`flashcards.md`), `docs/09-methods/`, `docs/10-operating/`. Own `state.md`. Run-log appends. |
| **Spine**              | [`state.md`](state.md) — the pass-2 rewrite checklist plus what was finished. Updated every beat.                                        |
| **Stopping condition** | Every box in the pass-2 checklist is checked AND each page keeps all §10 sections AND passes the style-guide tone checklist. Machine-checkable. |
| **Checker**            | The [`template-checker`](../template-checker/loop.md) loop. **This loop never grades its own pages.**                                    |
| **Human gate**         | The human spot-reads one page per part and declares the Day 2 checkpoint. This loop never declares day-level done.                       |

**Level: L2 (assisted)** — inherited from Day 1: the pattern earned L2 by running a full
Day 1 at L1→L2 with a human watching (rule 4 of `CLAUDE.md`); the human explicitly
started this Day 2 run.

## The prompt

Pass 2 (current — supersedes the pass-1 prompt below):

```text
/loop Read loops/day2/step-writer/state.md and shared/style-guide.md.
Take the FIRST unchecked page in the pass-2 tone-rewrite checklist.
Rewrite its prose to match the style guide's rules. Keep every §10
section. Keep every EXISTING mermaid diagram, the code tabs, the
glossary line, and the Sources footer byte-identical — change tone,
not facts, and never touch references. Where a picture would explain
faster than the prose (a flow, a contrast, a timeline), you MAY add
ONE new mermaid diagram per the style guide's diagram rules — most
pages need none. Check the page off, log one line in
shared/loop-run-log.md. Stop when every page is checked.
```

Pass 1 (completed 2026-07-17, kept for the record — taken verbatim from
[`days-plans/day2-plan.md`](../../../days-plans/day2-plan.md)):

```text
/loop Read STATE.md. Take the FIRST unchecked step page. Write it using
the 9-part page template in loop-plan.md §10, pulling content from the
roadmap in §11. Check it off, log one line in loop-run-log.md.
Stop when all step pages are checked.
```

Day 2's refinement over Day 1: the stop is not just "boxes checked" but "boxes checked
**and** each page contains all §10 sections" — the stop got *more* provable, not less.
Pass 2 tightens it again: the page must also pass the tone checklist at the bottom of
[`shared/style-guide.md`](../../../shared/style-guide.md), graded by the
`template-checker`, never by this loop.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':50,'padding':10}}}%%
flowchart TD
    S("Beat starts"):::time --> SPINE("Read the spine<br/>state.md"):::beat
    SPINE --> BUDGET{"Budget OK?<br/>pause off?"}:::limit
    BUDGET -->|no| EXIT(["Exit now"]):::stop
    BUDGET -->|yes| DONE{"Any box<br/>unchecked?"}:::limit
    DONE -->|no| WIN(["✅ Success stop —<br/>all pages, §10 intact,<br/>tone checklist passed"]):::win
    DONE -->|yes| WORK("Rewrite ONE page<br/>per the style guide"):::beat
    WORK --> UPD("Update spine"):::beat --> LOG("One log line"):::beat --> S
    classDef time fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
    classDef beat fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef limit fill:#fff1f2,stroke:#f43f5e,stroke-width:1.5px,color:#9f1239;
    classDef stop fill:#f1f5f9,stroke:#94a3b8,stroke-width:1.5px,color:#334155;
    classDef win fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
```

## Limits (the guardrails)

| Guard            | Value                                        | Source                                                    |
| ---------------- | -------------------------------------------- | --------------------------------------------------------- |
| Max runs/day     | 40                                           | [`shared/loop-budget.md`](../../../shared/loop-budget.md) |
| Max tokens/day   | 700k                                         | same                                                      |
| Sub-agent spawns | 0                                            | same                                                      |
| Self-throttle    | at 80% of the **current** cap → report-only  | budget rule 1 — the Day 1 bug, fixed                      |
| Kill switch      | `loop-pause-all: on` → exit at start of beat | budget kill switch                                        |

> Day 1's spine recorded a real bug: after the human raised the caps, the 80% line kept
> measuring against the *old* cap and the loop ran to ≈90%. Day 2's rule is explicit:
> **re-read the cap from `shared/loop-budget.md` at the start of every beat.**

## Ownership

| Path                                                                 | This loop's access     |
| -------------------------------------------------------------------- | ---------------------- |
| `docs/*-part-*` step pages + `README.md` (NOT quiz/flashcards)       | **write** (sole owner) |
| `docs/09-methods/`, `docs/10-operating/`                             | **write** (sole owner) |
| `loops/day2/step-writer/state.md`                                    | **write** (sole owner) |
| `shared/loop-run-log.md`                                             | **append-only**        |
| `docs/*-part-*/quiz.md` + `flashcards.md` (`quiz-writer` owns)       | read-only              |
| every other `state.md`                                               | read-only              |
| `shared/style-guide.md` (read at the start of every beat)            | read-only              |
| `LOOP.md`, `CLAUDE.md`, `loop-plan.md`, `shared/goal.md`, `STATE.md` | read-only              |

## The three valid stops

- **Success** — every pass-2 box checked, all §10 sections still present per page,
  tone checklist passed (per the `template-checker`'s verdicts).
- **Limit** — 40 runs or 700k tokens.
- **No progress** — nothing changed for 3 consecutive beats.

"Feels done" is not a stop.
