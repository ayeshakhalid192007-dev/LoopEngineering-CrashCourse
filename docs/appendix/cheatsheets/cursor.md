# Cheatsheet · Cursor

> Structural reference, not a tutorial — dense, lookup-first. Cursor is IDE-first, CLI-
> second — some of this course's loop mechanics map less directly here than onto a
> terminal-native tool. Confirm against
> [the live docs](https://docs.cursor.com/) when something here feels stale.

## Entry points

| Surface | Does |
| --- | --- |
| Cursor IDE — Agent/Composer mode | in-editor agentic session, tightly integrated with the file tree and diff view |
| `cursor-agent` (CLI) | headless invocation outside the IDE — the primitive to wrap for a loop |
| Background Agents | cloud-run agent sessions kicked off from the IDE, closer in shape to this course's Routines than to a local `/loop` |

## Config file shapes

| File | Role |
| --- | --- |
| `.cursor/rules/*.mdc` (or legacy `.cursorrules`) | the rules file — context layer, scoped rules per glob pattern |
| `.cursor/mcp.json` | MCP server declarations |
| workspace settings | model choice, agent permissions, per-project |

## The loop primitives

| Mechanism | Shape |
| --- | --- |
| A capped shell wrapper around `cursor-agent` | conditional/run-until-done, same pattern as the terminal-native tools |
| Background Agents on a schedule/trigger | closest built-in match to a Routine — verify current scheduling support before relying on it |
| CI calling `cursor-agent` headlessly | the unattended-schedule shape |

## Permissions & harness guarantees

| Directive | Effect |
| --- | --- |
| Agent mode's file-write scope | which directories/files the agent may touch without per-edit confirmation |
| Command-execution approval | whether shell commands run automatically or need a click — the IDE's version of the autonomy ladder |
| `.cursor/rules` glob scoping | rules apply only within matched paths — a context-layer tool, not a harness guarantee on its own |

## Gotchas

- `.cursor/rules` files are **context**, exactly like `CLAUDE.md` — a rule that says
  "never touch `legacy/`" there is a request; enforce it via the agent's actual write
  scope/permissions instead.
- Background Agents run **unattended by design** — treat your first one exactly like this
  course treats a first Routine: narrow scope, notifications on, a tested kill switch,
  before you trust it overnight.
- IDE-integrated diff review is a strong *human gate* mechanism — use it deliberately as
  the review step in your loop design, not as an incidental side effect of using the IDE.

---

*Sources:* this cheatsheet is original reference material for this course, written per
the attribution policy's rule that tool mechanics are framed as pointers to live
documentation rather than authoritative references. Live reference:
[docs.cursor.com](https://docs.cursor.com/). Cross-referenced against this course's
tool-agnostic rules in [safety.md](../../10-operating/safety.md). Full attribution:
[resources/sources.md](../../../resources/sources.md).
