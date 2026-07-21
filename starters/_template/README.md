# `_template` — the canonical loop kit (clone-and-fill)

> This is the skeleton every loop in the library is stamped from. Copy the folder, fill
> the `<ANGLE-BRACKET>` placeholders, clear the seven-item minimum, and run it at L1.
> Nothing here is magic — it's [the design checklist](../../docs/09-methods/loop-design-checklist.md),
> pre-poured into files.

## What's in the kit

| File | Role | Fill it using |
| --- | --- | --- |
| `LOOP.md` | the loop's **definition** — six parts, prompt, limits, ownership, three stops | [the A–F method](../../docs/09-methods/make-your-own-loop.md) |
| `loop-state.md.example` | the **spine** — what the loop remembers between beats | rename to `<loop-name>-state.md`, commit before beat 1 |
| `loop-budget.md` | caps: max runs/day, max tokens/day, the 80% tripwire | [cost management](../../docs/08-part-6-human-control/cost-management.md) |
| `loop-constraints.md` | the loop's constitution — what it may never do | [safety](../../docs/10-operating/safety.md) |
| `loop-run-log.md` | the append-only flight recorder — one line per beat | [observability](../../docs/10-operating/observability.md) |
| `.claude/skills/loop-task/SKILL.md` | the **procedure** (Claude Code) | [Step 9 · Skills](../../docs/05-part-3-the-body/09-skills.md) |
| `.claude/agents/loop-verifier.md` | the **read-only checker** (Claude Code) | [Step 11 · Maker–Checker](../../docs/05-part-3-the-body/11-maker-checker.md) |
| `opencode.json.example` · `skills/loop-task.md` | the OpenCode variant of the same two artifacts | the same two steps |

Codex and Grok kits follow the identical shape — a rules file, a skill, a read-only
verifier, and a scheduler — and are a documented porting step, not a redesign.

## Scaffold a loop in six moves

```text
1. npx @loop-engineering/loop-kit new <loop-name>       # kits only — the course stays put
2. read the spine it named for you: <loop-name>-state.md
3. fill every <ANGLE-BRACKET> in LOOP.md                # the six parts + three stops
4. write the procedure into the SKILL.md                # intent in the prompt, steps in the skill
5. commit the spine BEFORE the first beat               # uncommitted state is pre-lost
6. run at L1, watched, for one real cycle               # prove before overnight
```

Move 1 needs Node 18+ and nothing else — no clone, no global install. Contributors
working inside this repo copy the folder in place instead:
`cp -r starters/_template starters/<loop-name>`.

The full walkthrough — with a worked example and the cross-tool plumbing — is
[Scaffold a Loop from the Template](../../docs/09-methods/scaffold-from-template.md).

## The seven-item minimum (clear this before beat 1)

1. Provable success condition
2. Run limit
3. Spine written first, committed
4. Report-only (L1) start
5. Human gate placed
6. One log line per beat
7. Kill switch tested

---

*Attribution: the kit shape is adapted from the `cobusgreyling/loop-engineering` reference
repo ([S7](https://github.com/cobusgreyling/loop-engineering), MIT) and the loop anatomy of
Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*
