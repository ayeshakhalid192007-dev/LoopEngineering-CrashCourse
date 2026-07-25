# Foundations

> The vocabulary and mental models the rest of the course leans on. Read these once and the
> six parts of a loop stop being jargon.

**Loop engineering is the practice of designing the system that prompts an AI agent** — its
trigger, instructions, guardrails, verification, state, and logging — rather than prompting it
by hand. This section defines that system before you build one.

| Page | What it covers |
|---|---|
| [Concepts](concepts.md) | The core ideas, in the order they build on each other |
| [Glossary](glossary.md) | Every term the course uses, defined once |
| [The four layers](the-four-layers.md) | Harness, loop, agent, and model — and what lives where |
| [Mental models](mental-models.md) | How to reason about a loop you cannot watch run |
| [Primitives](primitives.md) | The building blocks a loop composes |
| [Primitives matrix](primitives-matrix.md) | Which primitive to reach for, side by side |

## The six parts of a loop

Every production loop declares all six. A loop missing one of these is the loop that surprises
you at 3am.

- **Heartbeat** — the trigger that starts a beat: in-session, conditional, scheduled, or event-driven.
- **Body** — the capabilities it may use: files, tools, skills, connectors (MCP).
- **Spine** — durable state between runs. With a spine an interrupted loop *resumes*; without one it *restarts*.
- **Stopping condition** — a machine-checkable definition of done: success, limit, or no-progress.
- **Checker** — the separate reviewer of the output. A loop never grades its own work.
- **Human gate** — the placed decision a person must make before anything ships.

---

Next: [Part 1 — The Shift](../03-part-1-the-shift/README.md) · Back to the
[course](../../README.md).
