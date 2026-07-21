# Cheatsheet · Codex CLI

> Structural reference, not a tutorial — dense, lookup-first. Codex ships fast and its
> flags drift; confirm against
> [the live docs](https://developers.openai.com/codex/cli) when something here feels
> stale.

## Install & entry points

| Command | Does |
| --- | --- |
| `codex` | interactive session in the current directory |
| `codex exec "<prompt>"` | headless, one-shot — the primitive to wrap for a loop |
| `codex --approval-mode <mode>` | set how much the session can do without asking |
| `codex resume` | reattach to a prior session's context |

## Approval modes (Codex's harness layer)

| Mode | What it allows without asking |
| --- | --- |
| **Suggest** | reads only — every edit and command is proposed, never applied, until you approve it. The right default for an unproven loop. |
| **Auto Edit** | file edits apply automatically; shell commands still ask |
| **Full Auto** | edits and sandboxed shell commands both run without per-action approval — network access is off by default even here |

This maps directly onto this course's autonomy ladder: **Suggest ≈ L1**, **Auto Edit ≈
L2**, **Full Auto ≈ L3** — and the same rule applies: earn the next mode with a proven
history, don't start there.

## Config file shapes

| File | Role |
| --- | --- |
| `AGENTS.md` | the shared rules-file convention Codex reads — same file this repo's `AGENTS.md`-reading tools use |
| `~/.codex/config.toml` | user-level defaults — model, approval mode, sandbox policy |
| project-level Codex config (where supported) | overrides the user default per repo |

## The loop primitives

| Mechanism | Shape |
| --- | --- |
| A capped shell wrapper around `codex exec` | conditional/run-until-done, same pattern as OpenCode's `for` loop |
| Cron / CI calling `codex exec` | the unattended-schedule shape |
| GitHub Actions on PR events + `codex exec` | the event-driven shape |

## Sandbox & network

| Directive | Effect |
| --- | --- |
| Sandbox policy | filesystem/network isolation Codex runs commands inside, independent of approval mode |
| Network access | off by default in the sandboxed shell, even at Full Auto — a separate grant from "can edit files" |

## Gotchas

- **Approval mode is a harness setting, not a prompt convention** — same rule as every
  other tool here: don't ask nicely for restraint in the prompt when a mode flag enforces
  it for real.
- Full Auto's sandboxing is about *where* commands run, not *whether* they're reviewed —
  don't mistake "sandboxed" for "safe to skip the L1 proving period."
- `AGENTS.md` conventions are shared across several tools in this space — one well-written
  file often serves Codex and OpenCode both, but always verify each tool's own precedence
  rules when they overlap with a tool-specific config file.

---

*Sources:* Codex CLI mechanics are documented directly by OpenAI; this cheatsheet is
original reference material for this course, framed per the attribution policy's rule
that "tool commands are pointers to live documentation, not authoritative references."
Approval-mode-as-autonomy-ladder mapping is this course's own synthesis, cross-referencing
[safety.md](../../10-operating/safety.md). Live reference:
[developers.openai.com/codex/cli](https://developers.openai.com/codex/cli). Full
attribution: [resources/sources.md](../../../resources/sources.md).
