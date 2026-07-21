# Cheatsheet · Grok CLI (xAI)

> Structural reference, not a tutorial — dense, lookup-first. This is the newest, fastest-
> moving tool in the matrix; treat every command below as a starting point and confirm
> against [xAI's live docs](https://docs.x.ai/) before relying on it for anything
> unattended.

## Install & entry points

| Command | Does |
| --- | --- |
| `grok` | interactive terminal session in the current directory |
| `grok "<prompt>"` / a one-shot flag | headless invocation — the primitive to wrap for a loop |
| model selection flag | pin a specific Grok model for the session |

## Config file shapes

| File | Role |
| --- | --- |
| a project rules file (check current docs for the exact filename xAI's tooling reads) | context layer — same role as `CLAUDE.md`/`AGENTS.md` |
| MCP server config | connector declarations, where supported |

## The loop primitives

Grok CLI, like OpenCode, leans on external scheduling rather than a built-in `/loop`:

| Mechanism | Shape |
| --- | --- |
| A capped shell wrapper | conditional/run-until-done, identical pattern to the OpenCode cheatsheet |
| Cron / CI invoking the CLI headlessly | the unattended-schedule shape |
| Platform-level agent/task features (where offered) | check current docs — this is the fastest-moving part of the matrix |

## Permissions & harness guarantees

| Directive | Effect |
| --- | --- |
| Tool/action approval settings | gate which actions run without confirmation — verify the current default before your first unattended run |
| Sandboxing (where offered) | isolates shell/file access from the rest of your machine |

Until you've read the current release notes for your installed version, **assume the
conservative default**: treat every action as requiring approval, and earn autonomy the
same way this course teaches for every tool — a proven L1 history first.

## Gotchas

- This is the tool most likely to have a stale cheatsheet the day you read it — verify the
  approval/permission model against the live docs before your first unattended run,
  every time, not just once.
- The same universal rules still apply regardless of what's changed underneath: guarantees
  belong in the harness, not the prompt; a stop condition is a spec, not a feeling; and
  the spine is a file, never the model's memory.

---

*Sources:* this cheatsheet is original reference material for this course, written per
the attribution policy's rule that tool mechanics are framed as pointers to live
documentation rather than authoritative references — mechanics here change weekly. Live
reference: [docs.x.ai](https://docs.x.ai/). Cross-referenced against this course's
tool-agnostic rules in [safety.md](../../10-operating/safety.md) and
[the four layers](../../03-part-1-the-shift/02-the-four-layers.md). Full attribution:
[resources/sources.md](../../../resources/sources.md).
