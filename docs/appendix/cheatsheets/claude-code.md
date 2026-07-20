# Cheatsheet · Claude Code

> Structural reference, not a tutorial — dense, lookup-first. Commands and flags drift
> with releases; treat this as a starting point and confirm against
> [the live docs](https://docs.claude.com/en/docs/claude-code) when something here feels
> stale. This is the mechanical-layer half of the course; the lasting layer (the six
> parts, the four layers) doesn't change even when these commands do.

## Install & entry points

| Command | Does |
| --- | --- |
| `claude` | interactive session in the current directory |
| `claude -p "<prompt>"` | headless, one-shot — the shape every schedule/cron wrapper uses |
| `claude --resume` | reattach to the most recent session |
| `claude --model <name>` | pin a model for the session |
| `claude mcp add <name> ...` | register an MCP server |

## Config file shapes

| File | Role |
| --- | --- |
| `CLAUDE.md` | the rules file — context layer; read every session, mandatory in this repo |
| `.claude/settings.json` | project harness config — permissions, hooks; **committed, shared** |
| `.claude/settings.local.json` | personal overrides — gitignored |
| `.claude/commands/*.md` | custom slash commands |
| `.claude/skills/<name>/SKILL.md` | a skill — see [Step 9](../../05-part-3-the-body/09-skills.md) |
| `.claude/agents/*.md` | subagent definitions (tools, model, prompt) |
| `.mcp.json` | project-scoped MCP server declarations |

## The loop primitives

| Mechanism | Shape |
| --- | --- |
| `/loop <interval> <prompt>` | in-session heartbeat; interval syntax like `5m`, `1h` |
| `/loop <prompt>` (no interval) | self-paced, run-until-done — the conditional shape |
| `CronCreate` / `CronList` / `CronDelete` | scheduled-task tools behind Routines; **50-task cap**, 3-day expiry, jitter applied, **no catch-up** on a missed fire |
| `CLAUDE_CODE_DISABLE_CRON` | env var to hard-disable scheduling — the kill switch's harness layer |
| `--worktree` / `isolation: worktree` | run a task in an isolated `git worktree` |

## Permissions & harness guarantees

| Directive | Effect |
| --- | --- |
| `/permissions` | interactive permission editor for the session |
| `permissions.allow` / `permissions.deny` in `settings.json` | the enforced list — this is where "never touch `main`" or "never read `.env*`" actually lives, not in `CLAUDE.md` prose |
| Hooks (`PreToolUse`, `PostToolUse`, etc.) | shell commands the harness runs around tool calls — the lowest-level guarantee short of denying the tool outright |

## Sub-agents & MCP

| Concept | Shape |
| --- | --- |
| Agent tool | spawns a sub-agent with its own tool subset, model, and context — used for research/parallel work, never as a call *between* two independently-scheduled loops |
| MCP servers | connectors for external systems; declared in `.mcp.json` or via `claude mcp add`; keep the tool count small and each write idempotent ([Step 10](../../05-part-3-the-body/10-connectors-mcp.md)) |

## Gotchas

- `CLAUDE.md` is a **request**, not a guarantee — anything safety-critical belongs in
  `settings.json` permissions or a hook, per [safety.md](../../10-operating/safety.md).
- The 50-task cron cap and 3-day expiry are silent unless you check them — a Routine that
  "stopped working" is often just expired, not broken.
- `--resume` reattaches to session *memory*, not your spine — the spine is still the file
  you wrote, not the transcript.

---

*Sources:* Claude Code mechanics — `/loop`, `Cron*` tools, permissions, hooks, skills,
subagents, MCP — from Panaversity's *Agentic Coding Crash Course*
([S2](https://agentfactory.panaversity.org/docs/agentic-coding-crash-course)) and
*Scheduled Tasks: The Loop Skill & Cron Tools*
([S4](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)); live
reference: [docs.claude.com/en/docs/claude-code](https://docs.claude.com/en/docs/claude-code).
Full attribution: [resources/sources.md](../../../resources/sources.md).
