# Loop: `template-checker` (Day 2)

> The **grader** of the Day 2 fleet — Day 1's `checker` pattern with a sharper rubric.
> It verifies every finished page against the §10 template, PASS/FAIL per page, and is
> structurally incapable of fixing anything.

## The six parts

| Part                   | This loop                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Heartbeat**          | Schedule — specified at **20m**. See the cadence note below before trusting that number.                     |
| **Body**               | **Read-only on `docs/`.** May write its own `state.md` and append to `shared/loop-run-log.md`. That is all.  |
| **Spine**              | [`state.md`](state.md) — PASS/FAIL per page, one line saying what is missing.                                |
| **Stopping condition** | Every checked-off page has a PASS verdict and no FAIL is open.                                               |
| **Checker**            | Itself — it *is* the checker. Its verdicts are graded by the human at the checkpoint gate.                   |
| **Human gate**         | The human spot-reads one page per part; FAILed pages go back on the `step-writer` list via the human.        |

**Level: L1 (report-only)** — permanent, by design. No path to L2.

## The prompt

Taken verbatim from [`days-plans/day2-plan.md`](../../../days-plans/day2-plan.md):

```text
/loop 20m For each newly finished page in STATE.md, verify it has ALL of:
hook, explanation, mermaid block, both code tabs, quiz question,
exercise, troubleshooting box. Mark PASS/FAIL per page in
review-notes.md with one line saying what is missing. Read-only — never fix.
```

Two Day 1 lessons applied:

1. **Findings go somewhere durable.** Day 1's `review-notes.md` was never committed and
   the findings are lost forever. This loop writes verdicts into its own committed
   [`state.md`](state.md).
2. **Question the cadence.** Day 1's checker was specified at 10m but reality wanted
   "once, at the end" — it logged exactly one useful beat. The 20m spec here is treated
   as a *ceiling*; batching reviews per finished part is a valid reading.

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    SW("step-writer<br/>the maker"):::maker -->|writes| DOCS[("docs/*-part-*<br/>methods · operating")]:::file
    TC("template-checker<br/>the grader"):::check -.->|reads only| DOCS
    TC -->|"PASS / FAIL<br/>+ what's missing"| ST[("own state.md<br/>(committed!)")]:::file
    ST -.-> H(["🧑 Human — FAILs go<br/>back on the maker's list"]):::human
    H -.-> SW
    classDef maker fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef check fill:#effcf9,stroke:#14b8a6,stroke-width:1.5px,color:#115e59;
    classDef file fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#334155;
    classDef human fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
```

## The rubric (one row per §10 section)

| # | Must be present               | How it's detected                          |
| - | ----------------------------- | ------------------------------------------ |
| 1 | Hook                          | a concrete-scenario opening section        |
| 2 | Plain-English explanation     | body prose between hook and diagram        |
| 3 | Mermaid diagram               | at least one mermaid fence                 |
| 4 | Dual-tool code tabs           | a claude fence **and** an opencode fence   |
| 5 | Going-deeper callout          | a `> [!NOTE]` **Going deeper** block       |
| 6 | Check yourself                | question + `<details>` reveal              |
| 7 | Try With AI                   | a hands-on exercise section                |
| 8 | When it goes wrong            | symptom → cause → fix table                |
| 9 | Glossary popovers             | the glossary-terms footer line             |

Index pages (`README.md`), `09-methods/`, and `10-operating/` pages are **structural pages**,
not concept pages — they are graded on: purpose stated, working links, at least one
diagram or table, no broken template imports. (Same reading Day 1's checker applied to
`glossary.md`.)

### The tone rubric (added for the step-writer's pass 2, 2026-07-18)

Pages rewritten in the step-writer's pass 2 are additionally graded against the
**tone checklist** at the bottom of
[`shared/style-guide.md`](../../../shared/style-guide.md): sentence and paragraph
caps, em-dash density, hook length, framed code blocks, credited quotes, imperative
exercises, mechanism-mapped analogies. One FAIL line names the rule broken and the
section it was broken in. The style guide's "what does NOT change" list is part of
this rubric — a rewrite that drops a §10 section FAILs regardless of tone. Tone
rules apply to the prose of structural pages too; the §10 section rubric does not.

Three diff-based checks (provable with `git diff` against the pass-1 version):

1. Every **pre-existing mermaid fence** is byte-identical. A redrawn or restyled
   diagram is a FAIL.
2. The ***Sources:* footer and glossary line** are byte-identical on every page.
   A dropped or reworded reference is a FAIL.
3. **At most one NEW mermaid diagram** was added, and only where it explains a
   flow, contrast, or timeline the prose walks through; it must use the house
   init header and have a framing sentence above it. A second added diagram, or
   a decorative one, is a FAIL.

### The pass-3 rubric (banners + starter commands, 2026-07-19)

The step-writer's pass 3 is mechanical, so it is graded by presence and diff, not
by the §10 concept rubric:

1. **Banners gone.** `grep -rn 'assets/banner' docs/` returns nothing. For each of
   the 11 landing pages listed in the step-writer's `state.md`, the diff shows
   **only** the leading banner image line and its trailing blank line removed — any
   other changed line on those pages is a FAIL.
2. **Starter file present and correct.** `starters/getting-started.md` exists with a
   `## Manual setup` section and a `## Starter commands` section. The manual `cp -r`
   flow is preserved; the four S7 `npx` commands appear verbatim; the S7 attribution
   footer is present. A missing section or command is a FAIL.
3. **Link added.** `starters/README.md` links `getting-started.md`, and its existing
   `cp -r` line is unchanged.
4. **Tone.** Group B prose is graded against the style-guide tone checklist. Flashy
   or informal wording is a FAIL with the offending line named.

## Limits

| Guard            | Value                                        |
| ---------------- | -------------------------------------------- |
| Max runs/day     | 12                                           |
| Max tokens/day   | 150k                                         |
| Sub-agent spawns | 0                                            |
| Kill switch      | `loop-pause-all: on` → exit at start of beat |

Source: [`shared/loop-budget.md`](../../../shared/loop-budget.md).

## Ownership

| Path                                                                 | This loop's access         |
| -------------------------------------------------------------------- | -------------------------- |
| `loops/day2/template-checker/state.md`                               | **write** (sole owner)     |
| `shared/loop-run-log.md`                                             | **append-only**            |
| `docs/`                                                              | **read-only** — never edit |
| every other loop's `state.md`                                        | read-only                  |

## The three valid stops

- **Success** — every finished page reviewed, zero open FAILs.
- **Limit** — 12 runs or 150k tokens.
- **No progress** — nothing new to review for 3 consecutive beats.
