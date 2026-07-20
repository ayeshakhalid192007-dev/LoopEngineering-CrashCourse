# `issue-triage` — the issue-only triage loop

> Reads every new or updated issue since the last beat, ranks it by urgency,
> and leaves a suggested label and priority — never applies either itself.
> `daily-triage`'s five-line-report mold, narrowed to issues alone.

**Category:** D · Issue & intake · **Heartbeat:** schedule (every few hours,
inside the 2h–1d band) · **Level:** L1 (report-only) · **Cost:** Low

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops.
2. issue-triage-state.md is your spine — already committed with empty
   last-seen marks.
3. Claude Code: point a Routine or `claude -p` cron at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the issue-triage skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent. PASS → arm the
   schedule. FAIL → fix the skill, never the report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`issue-triage-state.md`](issue-triage-state.md) | the spine — last-seen issue marks, so a beat never re-triages what it already reported |
| [`loop-budget.md`](loop-budget.md) | caps: 12 runs/day, 60k tokens/day, 80% tripwire |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — report-only, no labels/closures |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer that grades the report's format |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — `issue-triage-report.md` exists, ≤5 lines, ranked, template-matched
- [x] Run limit — 12/day
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — writes only `issue-triage-report.md` + spine + log
- [x] Human gate placed — you apply labels/priority yourself; nothing acts until you do
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

The heartbeat, level, and cost come from the Part V §15D catalog entry.
The shape itself — scheduled poll, last-seen marks in the spine, a ≤5-line
ranked report, a read-only reviewer — is
[`daily-triage`](../daily-triage/README.md)'s mold, applied exactly as
[Step 13a](../../docs/07-part-5-complete-loop/13a-claude-code-walkthrough.md)
invites: *"swap the skill and the report name and out comes a security
sweeper, a dependency scout, a docs-drift detector."* This kit is that reuse,
narrowed from issues+PRs+CI down to issues alone.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*
