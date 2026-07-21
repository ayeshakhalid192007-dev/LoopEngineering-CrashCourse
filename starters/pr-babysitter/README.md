# `pr-babysitter` — the PR-status polling loop

> Polls every open PR on a fast schedule and flags what needs a human: merge
> conflicts, red CI, stale no-review PRs, threads awaiting a response. It never
> comments, nudges, or merges — a wrong beat costs a re-read, not an unrecallable
> action on a shared system.

**Category:** B · PR & review · **Heartbeat:** schedule (every 10m, business
hours) · **Level:** L1 (report-only) · **Cost:** High

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops.
2. pr-babysitter-state.md is your spine — already committed with an empty
   per-PR status table.
3. Claude Code: point a Routine or `claude -p` cron (every 10m) at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename opencode.json.example →
   opencode.json, add the AGENTS.md line, wire skills/loop-task.md into a cron
   + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the pr-babysitter skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent (.claude/agents/loop-verifier.md).
   PASS → arm the schedule. FAIL → fix the skill, never the report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`pr-babysitter-state.md`](pr-babysitter-state.md) | the spine — per-PR last-seen status, so a beat only reports what changed |
| [`loop-budget.md`](loop-budget.md) | caps: 60 runs/day, 350k tokens/day, 80% tripwire |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — report-only, no comments/merges |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer that grades `pr-status-report.md`'s format |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — `pr-status-report.md` exists, ranked, template-matched, every open PR considered
- [x] Run limit — 60/day (10-minute cadence, business hours)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — writes only `pr-status-report.md` + spine + log
- [x] Human gate placed — you read the report; nothing acts until you do
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is the scheduled twin of the "PR-review loop" case study in
[Part 2 · Step 7 — Event-Driven Loops](../../docs/04-part-2-heartbeat/07-event-driven.md):
that page's check-yourself question is literally about a PR-review loop that silently
skipped PRs during a burst, because events are **dropped, not queued**. The fix the page
prescribes — a slow scheduled **reconciliation sweep** asking "any open PRs without a
review from me?" — is this loop's entire job, run standalone instead of paired with an
event-driven `pr-reviewer`. The heartbeat, level, and cost are set by the Part V §15B
catalog entry.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*
