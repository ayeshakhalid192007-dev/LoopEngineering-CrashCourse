# Cheatsheet · Windsurf

> Structural reference, not a tutorial — dense, lookup-first. Windsurf is IDE-first, like
> Cursor; confirm against [the live docs](https://docs.windsurf.com/) when something here
> feels stale.

## Entry points

| Surface | Does |
| --- | --- |
| Windsurf IDE — Cascade | the in-editor agentic session; reads the workspace, proposes and applies multi-file changes |
| Cascade's terminal integration | runs shell commands as part of a Cascade turn, subject to the same approval settings as file edits |

## Config file shapes

| File | Role |
| --- | --- |
| `.windsurfrules` (workspace) or global rules in settings | the rules file — context layer, same role as `CLAUDE.md`/`AGENTS.md` |
| MCP config (IDE settings) | connector declarations, where supported |

## The loop primitives

Windsurf has no first-class unattended-schedule primitive at the time of writing — the
heartbeat, if you build one, lives entirely outside the IDE:

| Mechanism | Shape |
| --- | --- |
| Cascade session, driven interactively | not a loop by itself — this is the "prompting" side of [Step 1](../../03-part-1-the-shift/01-from-prompting-to-looping.md) unless you wrap it |
| CI/cron calling an equivalent CLI entry point (where offered) | the unattended-schedule shape, hosted outside the IDE |
| A capped, externally-driven wrapper | conditional/run-until-done, same pattern as the other IDE-first tool in this matrix |

## Permissions & harness guarantees

| Directive | Effect |
| --- | --- |
| Cascade's write/run approval mode | whether file edits and terminal commands apply automatically or wait for a click — the IDE's version of the autonomy ladder |
| Turbo/auto-run settings (naming varies by release) | broadens what Cascade can do without per-action confirmation — treat any "auto" toggle exactly like an L2/L3 promotion decision, not a convenience default |

## Gotchas

- `.windsurfrules` is context, not enforcement — the same "request vs. guarantee" caveat
  as every rules file in this cheatsheet series; real guarantees need an approval-mode or
  permission setting behind them.
- Because there's no built-in unattended scheduler, the temptation is to leave an
  "auto-run everything" toggle on and treat the IDE session itself as unattended — resist
  it; an open IDE session with auto-run on is functionally an L3 loop with no spine, no
  cap, and no log, which is exactly the shape [safety.md](../../10-operating/safety.md)
  warns against.
- Verify current MCP and scheduling support before designing around it — this is one of
  the faster-moving tools in the matrix.

---

*Sources:* this cheatsheet is original reference material for this course, written per
the attribution policy's rule that tool mechanics are framed as pointers to live
documentation rather than authoritative references. Live reference:
[docs.windsurf.com](https://docs.windsurf.com/). Cross-referenced against this course's
tool-agnostic rules in [safety.md](../../10-operating/safety.md). Full attribution:
[resources/sources.md](../../../resources/sources.md).
