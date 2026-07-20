# `daily-triage` — the morning-triage loop

> Reads every issue, PR, and CI run that arrived overnight, ranks the genuinely urgent
> above the safely-ignorable, and leaves a five-line report next to your coffee. It
> writes nothing else and acts on nothing.

**Category:** A · Repo maintenance · **Heartbeat:** schedule (weekdays 07:00) ·
**Level:** L1 (report-only) · **Cost:** Low

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops.
2. daily-triage-state.md is your spine — already committed with empty last-seen marks.
3. Claude Code: point a Routine or `claude -p` cron at .claude/skills/loop-task/SKILL.md.
   OpenCode: rename opencode.json.example → opencode.json, add the AGENTS.md line,
   wire skills/loop-task.md into a cron + wrapper script (see the file for the wrapper).
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the daily-triage skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent (.claude/agents/loop-verifier.md).
   PASS → arm the schedule. FAIL → fix the skill, never the report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`daily-triage-state.md`](daily-triage-state.md) | the spine — last-seen marks per issues/PRs/CI, so a beat never re-triages what it already reported |
| [`loop-budget.md`](loop-budget.md) | caps: 1 run/day, 15k tokens/day, 80% tripwire |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — report-only, no external writes |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer that grades `triage-report.md`'s format |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — `triage-report.md` exists, ≤5 lines, ranked, template-matched
- [x] Run limit — 1/day
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — writes only `triage-report.md` + spine + log
- [x] Human gate placed — you read the report; nothing acts until you do
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is the same loop built live in
[Part 5 · Step 13 — Build the Morning-Triage Loop](../../docs/07-part-5-complete-loop/13-build-the-loop-twice.md),
with the Claude Code build in [13a](../../docs/07-part-5-complete-loop/13a-claude-code-walkthrough.md)
and the OpenCode build in [13b](../../docs/07-part-5-complete-loop/13b-opencode-walkthrough.md). The
skill text and reviewer rubric in this kit are taken verbatim from that build.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*
