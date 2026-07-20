# `changelog-drafter` — the merge-to-draft loop

> Drafts changelog entries so they never pile up unwritten. Daily, or right
> before a release tag, it reads every merged PR since the last beat and
> writes one draft line per PR — it never touches `CHANGELOG.md` itself; the
> release manager reads the draft before tagging.

**Category:** C · Release · **Heartbeat:** schedule/tag (daily or on a
release-tag event) · **Level:** L1 (report-only — drafts, never commits) ·
**Cost:** Low

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops.
2. changelog-drafter-state.md is your spine — already committed with an
   empty last-processed-PR mark.
3. Claude Code: point a daily Routine (or a release-tag event trigger) at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the changelog-drafter skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent — it checks every merged
   PR number since the mark shows up in the draft. PASS → arm the schedule.
   FAIL → fix the skill, never the draft.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`changelog-drafter-state.md`](changelog-drafter-state.md) | the spine — last-processed PR number, escalated unprocessable PRs |
| [`loop-budget.md`](loop-budget.md) | caps: 10 runs/day, 80k tokens/day, 80% tripwire |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never writes `CHANGELOG.md`, escalates instead of retrying |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — checks every merged PR is covered |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, schedule/tag heartbeat |

## Loop Ready checklist

- [x] Provable success condition — every merged PR since the last mark has a draft line
- [x] Run limit — 10/day
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — drafts to a file, never commits to `CHANGELOG.md`
- [x] Human gate placed — the release manager reads the draft before tagging
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is a direct application of the course's own
["Worked in 90 seconds" A–F example](../../docs/09-methods/make-your-own-loop.md#worked-in-90-seconds),
which uses this exact task — *"changelog entries pile up unwritten"* — to
demonstrate the six-move method end to end. The body (`CHANGELOG.md`-adjacent
only), spine (last-processed PR number), checker (a script: does every merged
PR number show up?), gate (the release manager, before tagging), the 10/day
limit, and the stuck-PR escalation rule are all taken directly from that
worked example. This kit adapts its event-per-merge trigger to the catalog's
own schedule/tag heartbeat (§15A) — the same design, a different clock.

---

*Source: Panaversity's *Loop Engineering: A Crash Course*
([S1](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)). Full
attribution: [resources/sources.md](../../resources/sources.md).*
