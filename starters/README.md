# `starters/` — install-and-run loop kits

> A loop is a handful of small files: a definition, a spine, a budget, a constitution, a
> skill, and a checker. This folder hands you those files pre-poured, so you start a new
> loop by **filling blanks**, not by staring at an empty directory.

## Start here: one command

You do not need this repository to use a kit. From the root of the project you want the
loop to watch:

```text
npx @loop-engineering/loop-kit list         # browse all 20 kits
npx @loop-engineering/loop-kit ci-sweeper   # install one
npx @loop-engineering/loop-kit new my-loop  # start from the blank template
```

The kit lands in `loops/<name>/`, with the Claude Code skill and checker placed under
your project's `.claude/` where the tool can find them. Node 18+ is the only
prerequisite; nothing is cloned and nothing is installed globally. What downloads is the
kits and the CLI — about 90 kB — not the course. Add `--dry-run` to see every path
first, or `--tool claude` / `--tool opencode` to install one tool's files.

## The canonical kit: `_template/`

[`_template/`](_template/README.md) is the skeleton every other kit is stamped from —
the same files, with every decision left as an `<ANGLE-BRACKET>` blank. `npx
@loop-engineering/loop-kit new <loop-name>` installs it with your loop's name substituted
throughout. Contributors
adding a kit *to this library* copy it in place instead:

```text
cp -r starters/_template starters/<loop-name>
```

The step-by-step walkthrough (with a worked example and the cross-tool plumbing) is the
methods page **[Scaffold a Loop from the Template](../docs/09-methods/scaffold-from-template.md)**.

For all three routes side by side — install, scaffold, contribute — see
**[Getting Started with a Starter Kit](getting-started.md)**.

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
