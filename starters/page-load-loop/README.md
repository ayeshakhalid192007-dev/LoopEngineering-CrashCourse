# `page-load-loop` — the sub-50ms optimizer

> Optimizes for speed until every page loads under 50ms. Each beat re-runs
> the same repeatable benchmark, drafts an optimization for the slowest
> route, and confirms no regression before reporting it. Requires a human
> setup step (routes, warm-up, baseline) before the first beat can run.

**Category:** N · Performance · **Heartbeat:** schedule (weekly, per
catalog; source's own cadence is "after each significant change") ·
**Level:** L1 (report-only, drafts-not-applies) · **Cost:** Medium

**Source:** Loop #12, "The sub-50 ms page-load loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Matthew Berman**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops,
   and the source's verbatim prompt.
2. REQUIRED FIRST: fill in page-load-loop-state.md's "Fixed test conditions"
   section (routes, warm-up behavior, baseline capture) — the source names
   this as mandatory setup before any beat runs. Commit it before beat 1.
3. Claude Code: point a weekly Routine at .claude/skills/loop-task/SKILL.md.
   OpenCode: rename opencode.json.example → opencode.json, add the
   AGENTS.md line, wire skills/loop-task.md into a cron + wrapper script.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the page-load-loop skill now, exactly as the schedule would."
5. Grade the rehearsal with the loop-verifier agent — it re-runs the
   benchmark and checks for regressions on every other route, not just the
   targeted one. PASS → arm the schedule. FAIL → fix the skill, never the
   report.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`page-load-loop-state.md`](page-load-loop-state.md) | the spine — **required setup fields**, per-route load-time history |
| [`loop-budget.md`](loop-budget.md) | caps: 20 runs, 250k tokens — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never runs without setup, never applies an optimization |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — re-runs the benchmark and checks for regressions |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron + wrapper heartbeat |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec, verbatim: "every page loads in under 50 ms"
- [x] Run limit — 20 runs (added by this library)
- [x] Spine written first, committed empty — **plus the source's own required setup fields**
- [x] Report-only (L1) start — drafts optimizations in a throwaway worktree, applies nothing
- [x] Human gate placed — the source's own pre-loop setup step, plus review of every drafted change
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit uses Forward Future's Loop #12 nearly unmodified — its stopping
condition ("every page loads in under 50 ms") and checker ("the same
benchmark and confirm there are no regressions") are used verbatim. The
source's own required human gate — defining the metric, routes, test
environment, warm-up behavior, and baseline **before** any agent cycle runs
— is exactly this course's "spine written first, committed" discipline
([the seven-item minimum](../_template/README.md#the-seven-item-minimum-clear-this-before-beat-1)),
applied to a real external design rather than restated abstractly.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*
