# `stale-safe-batch-release` — the current-changes-only release batcher

> Reviews pending PRs, excludes anything stale or unfinished, and combines
> the valid ones into a release batch — built from complete artifacts off
> the latest integrated `main`, never a task worktree or a partial file
> overlay. The 20th and final kit in this library.

**Category:** C · Release · **Heartbeat:** schedule/tag (per release
window) · **Level:** L1 (report-only) · **Cost:** Low

**Source:** Loop #33, "The stale-safe batch release loop," from
[Forward Future's Loop Library](https://signals.forwardfuture.com/loop-library/),
original prompt by **Matthew Berman**.

## Quickstart

```text
1. Read LOOP.md — the six parts, the prompt, the limits, the three stops.
2. stale-safe-batch-release-state.md is your spine — already committed with
   an empty per-PR register.
3. Claude Code: point a Routine at a release-tag event pointed at
   .claude/skills/loop-task/SKILL.md. OpenCode: rename
   opencode.json.example → opencode.json, add the AGENTS.md line, wire
   skills/loop-task.md into a cron/tag-triggered wrapper.
4. Rehearse once, by hand, before the schedule ever fires:
   "Run the stale-safe-batch-release skill now, exactly as the schedule
   would."
5. Grade the rehearsal with the loop-verifier agent — it fails any batch
   that can't prove it traces to main. PASS → arm the schedule. FAIL → fix
   the skill, never ship the batch anyway.
```

## What's in this kit

| File | Role |
| --- | --- |
| [`LOOP.md`](LOOP.md) | the definition — six parts, prompt, limits, ownership, three stops |
| [`stale-safe-batch-release-state.md`](stale-safe-batch-release-state.md) | the spine — per-PR current/stale decisions, artifact source verification |
| [`loop-budget.md`](loop-budget.md) | caps: 15 runs, 150k tokens — added by this library; the source specified none |
| [`loop-constraints.md`](loop-constraints.md) | the constitution — never builds from a worktree/overlay, never actually releases |
| [`loop-run-log.md`](loop-run-log.md) | append-only, one line per beat |
| [`.claude/skills/loop-task/SKILL.md`](.claude/skills/loop-task/SKILL.md) | the procedure (Claude Code) |
| [`.claude/agents/loop-verifier.md`](.claude/agents/loop-verifier.md) | the read-only reviewer — fails any batch that can't prove it traces to `main` |
| [`opencode.json.example`](opencode.json.example) · [`skills/loop-task.md`](skills/loop-task.md) | the OpenCode twin — same skill text, cron/tag heartbeat |

## Loop Ready checklist

- [x] Provable success condition — the source's own spec, verbatim: "only current, complete changes ship in the combined release"
- [x] Run limit — 15 runs (added by this library)
- [x] Spine written first, committed empty
- [x] Report-only (L1) start — composes and reports the batch, never releases it
- [x] Human gate placed — you read the report and perform the actual release yourself
- [x] One log line per beat, no silent runs
- [x] Kill switch — `loop-pause-all` in `loop-budget.md`

## How this relates to the course

This kit is a fitting bookend for the library: every other kit that touches
code uses an isolated worktree to test *safely* — draft a fix, run it,
throw it away
([Step 8 · Worktrees](../../docs/05-part-3-the-body/08-worktrees.md)). This
loop exists to make sure the *final* release artifact never accidentally
comes from one of those isolated sandboxes, or from any partial overlay —
the source's own explicit rule: *"deployment must use complete artifacts
from the latest integrated main."* Worktree isolation protects a beat;
this loop protects the release.

---

*Full attribution: [resources/sources.md](../../resources/sources.md).*
