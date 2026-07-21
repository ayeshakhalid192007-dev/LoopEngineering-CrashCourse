# Cheatsheet · OpenCode

> Structural reference, not a tutorial — dense, lookup-first. Commands and flags drift
> with releases; confirm against [the live docs](https://opencode.ai/docs) when something
> here feels stale.

## Install & entry points

| Command | Does |
| --- | --- |
| `opencode` | interactive TUI session in the current directory |
| `opencode run "<prompt>"` | headless, one-shot — the primitive every loop wrapper is built from |
| `opencode serve --attach` | run OpenCode as a long-lived server another process can attach to — the mechanism behind cloud-style unattended runs |
| `opencode github install` | wires an event-driven trigger to a GitHub repo (PR/push events) |

## Config file shapes

| File | Role |
| --- | --- |
| `AGENTS.md` | the rules file — this tool's equivalent of `CLAUDE.md`; context layer |
| `opencode.json` | harness config — permission rules, model defaults, tool allow/deny |
| `opencode.json.example` | this repo's checked-in template for kit permission shapes |
| attached files (`@file`, or `--file`) | one-shot context injection, no persistent rules-file needed for small tasks |

## The loop primitives

Unlike Claude Code, OpenCode has no built-in `/loop` scheduler — the heartbeat lives
**outside** the tool, one layer up, which is a useful lesson in itself (the loop layer is
yours to build, whichever primitives the harness gives you):

| Mechanism | Shape |
| --- | --- |
| A capped shell `for`/`while` loop | `for i in $(seq 1 N); do opencode run "..."; done` — the conditional/run-until-done shape |
| A shell timer (`sleep` between iterations) | approximates a schedule heartbeat |
| Cron / GitHub Actions calling `opencode run` | the unattended-schedule shape, hosted outside the tool entirely |
| `opencode github install` + Actions on `pull_request` | the event-driven shape |

## Permissions & harness guarantees

| Directive | Effect |
| --- | --- |
| `permissions` block in `opencode.json` | allow/deny per tool, per path — same enforcement role as Claude Code's `settings.json` |
| Model/tool restriction per invocation | scope a specific `opencode run` to a narrower toolset than the interactive session default |

## Gotchas

- Because the heartbeat is external, **the cap lives in your wrapper script**, not the
  tool — a `for i in $(seq 1 N)` loop with no cap check inside each run *is* the doom-loop
  risk from [infinite-loops.md](../../10-operating/infinite-loops.md); always gate the
  loop, not just the count.
- `AGENTS.md` carries the same "request, not guarantee" caveat as `CLAUDE.md` — permission
  rules in `opencode.json` are the actual harness layer.
- `opencode serve --attach` sessions persist state across attaches — treat the *file*
  spine as the source of truth regardless, the same discipline as every other tool here.

---

*Sources:* OpenCode mechanics from Panaversity's *Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)) and
*Scheduled Tasks: The Loop Skill & Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)); live
reference: [opencode.ai/docs](https://opencode.ai/docs). Full attribution:
[resources/sources.md](../../../resources/sources.md).
