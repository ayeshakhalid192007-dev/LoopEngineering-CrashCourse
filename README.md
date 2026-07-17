<!-- HERO-START -->

# Loop Engineering Crash Course

**Learn to build AI agent loops: autonomous systems with a heartbeat, a spine,
a checker, and a provable stop.**

By the end you will have designed, built, and safely operated real loops in two
different tools — starting from a single in-session loop and finishing with a
certified multi-loop fleet. Free, open source, readable entirely on GitHub.

<!-- HERO-END -->

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Course](https://img.shields.io/badge/course-14%20steps%20%C2%B7%204%20tracks-blue.svg)](docs/start-here.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Built with loops](https://img.shields.io/badge/built%20with-its%20own%20loops-8A2BE2.svg)](LOOP.md)

Loop Engineering is the emerging practice of **designing the system that prompts AI
agents**, rather than prompting them by hand. This repo packages the whole discipline —
concepts, mechanics, a library of ready-to-run loops, practice labs, and safety
guidance — as a complete, GitHub-browsable course. The same `docs/` content also powers
the course website (single source of truth — the two never diverge).

> **Dogfooding note:** this course about loops is *built by loops*. The rulebook is in
> [`LOOP.md`](LOOP.md), the spine in [`STATE.md`](STATE.md), and every run is logged in
> [`shared/loop-run-log.md`](shared/loop-run-log.md).

## Start here

**New? Take the 60-second router:** → [`docs/start-here.md`](docs/start-here.md)

It places you on one of four tracks:

| Track | You are… | You'll learn to… |
| ------- | ---------- | ------------------ |
| **T1 · Foundations** | using an AI agent by hand (or not yet) | explain the shift and run your first in-session loop |
| **T2 · Practitioner** | fluent in the six parts of a loop | choose a heartbeat, write a provable stop, split maker/checker |
| **T3 · Engineer** | able to assemble a loop | build the full six-part loop in two tools and operate it safely |
| **T4 · Ultra-Pro** | shipping loops already | hill-climbing loops, fleets, governance at team scale |

Full map with entry checks and exit assessments:
[`docs/learning-tracks.md`](docs/learning-tracks.md)

## Your journey through the course

```mermaid
%%{init: {'theme':'base','themeVariables':{'fontFamily':'ui-sans-serif, system-ui, sans-serif','fontSize':'14px','lineColor':'#94a3b8'},'flowchart':{'curve':'basis','nodeSpacing':45,'rankSpacing':55,'padding':12}}}%%
flowchart LR
    R("60-second router<br/>start-here"):::route --> P("Prerequisites<br/>setup + 2 primers"):::prep
    P --> F("Foundations<br/>6 pages"):::prep
    F --> S("The 14 steps<br/>Parts 1–6"):::core
    S --> M("Methods +<br/>operating handbook"):::core
    M --> L("Loop library<br/>+ graded labs"):::adv
    L --> C(["🏅 Loop Ready<br/>certification"]):::cert
    classDef route fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#334155;
    classDef prep fill:#eef6ff,stroke:#3b82f6,stroke-width:1.5px,color:#1e40af;
    classDef core fill:#eef2ff,stroke:#6366f1,stroke-width:1.5px,color:#312e81;
    classDef adv fill:#f5f3ff,stroke:#8b5cf6,stroke-width:1.5px,color:#5b21b6;
    classDef cert fill:#fef9ec,stroke:#f59e0b,stroke-width:1.5px,color:#92400e;
```

## Quickstart

1. **Set up your agent** — [`docs/prerequisites/environment-setup.md`](docs/prerequisites/environment-setup.md)
   (Claude Code, OpenCode, Codex, or Grok; every lesson shows at least Claude Code ↔ OpenCode).
2. **Speed-run the primers** — [`agentic-coding-primer.md`](docs/prerequisites/agentic-coding-primer.md)
   and [`spec-driven-primer.md`](docs/prerequisites/spec-driven-primer.md).
3. **Ground yourself in the foundations** — start with
   [`mental-models.md`](docs/00-foundations/mental-models.md), keep the
   [`glossary.md`](docs/00-foundations/glossary.md) open in a tab.
4. **Begin the 14 steps** (Part 1 opens Day 2 — see the roadmap below).

## The course at a glance

**Foundations (read first):**
[glossary](docs/00-foundations/glossary.md) ·
[mental models](docs/00-foundations/mental-models.md) ·
[concepts](docs/00-foundations/concepts.md) ·
[the four layers](docs/00-foundations/the-four-layers.md) ·
[primitives](docs/00-foundations/primitives.md) ·
[primitives matrix](docs/00-foundations/primitives-matrix.md)

**The 14-step roadmap** *(content lands over the next days — links activate as parts ship)*:

| Part | Steps | What you learn |
| ------ | ------- | ---------------- |
| 1 · The Shift | 01–03 | prompting → looping, the four layers, anatomy of a loop |
| 2 · The Heartbeat | 04–07 | in-session, run-until-done, schedules, event-driven |
| 3 · The Body | 08–11 | worktrees, skills, connectors/MCP, maker ≠ checker |
| 4 · The Spine | 12 | durable state between runs |
| 5 · A Complete Loop | 13 | build the same loop twice (Claude Code & OpenCode) |
| 6 · Human Control | 14 | staying the engineer: cost, verification, nested loops |

Then: methods for designing your own loop, the operating handbook (safety, failure
modes, recovery), the prebuilt loop library, graded labs, and the **Loop Ready**
certification capstone.

## What's in the repo

| Folder | What it holds |
| -------- | --------------- |
| `docs/` | the course — single source of truth for GitHub *and* the website |
| `loops/` | [the loops that build this course](loops/README.md) — real prompts, real spines |
| `patterns/` | the seven core loop patterns *(Day 2+)* |
| `starters/` | clone-and-run starter kits *(Day 3)* |
| `skills/`, `templates/`, `examples/`, `stories/` | reusable parts and case studies *(Day 2+)* |
| `resources/` | [source attribution](resources/sources.md) for all nine primary sources |
| `web/` | the Next.js course website *(Day 4)* |

## Contributing & credits

Contributions welcome — see [`CONTRIBUTING.md`](CONTRIBUTING.md). This course adapts
MIT-licensed material and public writing with full attribution in
[`resources/sources.md`](resources/sources.md). Licensed [MIT](LICENSE).
