# `post-merge-cleanup` — the loose-ends sweeper

> Sweeps for what a merge leaves behind — a merged branch nobody deleted, an
> issue a PR fixed but never closed, a preview environment with no PR left to
> serve. Reports what it would clean up; never deletes, closes, or tears
> anything down until a human says so.

**Category:** A · Repo maintenance · **Heartbeat:** schedule (every few
hours, inside the 1d–6h band) · **Level:** L1 (report-only) · **Cost:** Low

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops.
2. post-merge-cleanup-state.md is your spine — already committed with empty
   last-seen marks.
3. Claude Code: point a Routine or `claude -p` cron at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the post-merge-cleanup skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent — it confirms each
   flagged item is genuinely orphaned. PASS → arm the schedule. FAIL → fix
   the skill, never the report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`post-merge-cleanup-state.md`](post-merge-cleanup-state.md) | the spine — per-item last-seen marks across branches/issues/environments |
| [`loop-budget.md`](loop-budget.md) | caps: 20 runs/day, 60k tokens/day, 80% tripwire |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never deletes, closes, or tears down |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — confirms each flagged item is genuinely orphaned |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — `cleanup-report.md` lists every newly-orphaned item with a verified reason
- [x] Run limit — 20/day
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — writes only the report + spine + log
- [x] Human gate placed — you approve every deletion, closure, or teardown
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

The heartbeat, level, and cost come from the Part V §15A catalog entry, which
also names this loop directly in the fleet's own priority order — *"ci-sweeper
> pr-babysitter > dependency-sweeper > post-merge-cleanup > daily-triage."*
This kit's shape (scheduled poll, per-item last-seen marks, a five-line
report, a read-only reviewer, a human gate) is the same mold
[Step 13a](../../docs/07-part-5-complete-loop/13a-claude-code-walkthrough.md)
names explicitly for reuse: *"swap the skill and the report name and out
comes a security sweeper, a dependency scout, a docs-drift detector"* — here,
a post-merge cleanup sweeper.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*
