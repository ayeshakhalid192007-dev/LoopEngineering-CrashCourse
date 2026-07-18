# `starters/` — clone-and-run loop kits

> A loop is a handful of small files: a definition, a spine, a budget, a constitution, a
> skill, and a checker. This folder hands you those files pre-poured, so you start a new
> loop by **filling blanks**, not by staring at an empty directory.

## Start here: `_template/`

[`_template/`](_template/README.md) is the canonical kit — the skeleton every other kit is
stamped from. Copy it, fill the `<ANGLE-BRACKET>` placeholders, and you have a real loop.

```text
cp -r starters/_template starters/<loop-name>
```

The step-by-step walkthrough (with a worked example and the cross-tool plumbing) is the
methods page **[Scaffold a Loop from the Template](../docs/09-methods/scaffold-from-template.md)**.

## What a kit contains

```text
<loop-name>/
├── README.md                 quickstart + Loop Ready notes
├── LOOP.md                   the definition — six parts, prompt, limits, ownership, stops
├── <loop-name>-state.md      the spine (from loop-state.md.example)
├── loop-budget.md            caps + the 80% tripwire
├── loop-constraints.md       the constitution (guarantees belong in the harness)
├── loop-run-log.md           append-only, one line per beat
├── .claude/                  Claude Code: skills/loop-task/SKILL.md · agents/loop-verifier.md
└── opencode.json.example     OpenCode: permissions + skills/loop-task.md
```

Codex and Grok kits share the identical shape (rules file · skill · read-only verifier ·
scheduler) and are a documented porting step. Every kit, whatever its tool coverage, is
validated against the same seven-item minimum before its first run.

## How this relates to the course

These are the same files the course teaches you to design by hand:

- [The A–F method](../docs/09-methods/make-your-own-loop.md) — how to fill `LOOP.md`.
- [The design checklist](../docs/09-methods/loop-design-checklist.md) — the blanks, as a checklist.
- [Part 5 · A Complete Loop](../docs/07-part-5-complete-loop/13-build-the-loop-twice.md) — the same kit, built live in two tools.

And the loops that actually built this course — real, filled-in kits — live one folder over
in [`loops/`](../loops/README.md).

---

*Attribution: the starter-kit model is adapted from the `cobusgreyling/loop-engineering`
reference repo ([S7](https://github.com/cobusgreyling/loop-engineering), MIT); the loop
anatomy from Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../resources/sources.md).*
